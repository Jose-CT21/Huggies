import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { huggiesCatalog, productSizes, productTypes, sizelessTypes } from '../data/huggiesCatalog';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Products.css';

const MySwal = withReactContent(Swal);

/**
 * Formatea un precio en colones costarricenses.
 * @param {number} amount - Monto a formatear
 * @returns {string} Precio formateado (e.g., "₡5,950")
 */
const formatPrice = (amount) => {
    return `₡${amount.toLocaleString('es-CR')}`;
};

const Products = () => {
    const navigate = useNavigate();
    const { childData, updateChildData } = useAuth();
    const { addToCart } = useCart();
    
    const [filters, setFilters] = useState({
        type: 'Todos',
        size: 'Todos',
        search: ''
    });

    const [feedbackProducts, setFeedbackProducts] = useState(null);

    // Load feedback on mount or when child changes
    useEffect(() => {
        if (childData && childData.name) {
            const stored = localStorage.getItem(`huggies_feedback_products_${childData.name}`);
            if (stored) setFeedbackProducts(stored);
            else setFeedbackProducts(null);
        }
    }, [childData]);

    const handleFeedbackProducts = (val) => {
        if (!childData) return;
        setFeedbackProducts(val);
        localStorage.setItem(`huggies_feedback_products_${childData.name}`, val);
    };

    // Determine if the current type selection supports sizes
    const currentTypeHasSizes = filters.type === 'Todos' || !sizelessTypes.includes(filters.type);

    // Calculate available sizes based on selected type
    const availableSizes = useMemo(() => {
        if (!currentTypeHasSizes) return [];
        
        if (filters.type === 'Todos') return productSizes;

        // Get unique sizes for the selected type
        const sizesForType = [...new Set(
            huggiesCatalog
                .filter(p => p.type === filters.type && p.size !== null)
                .map(p => p.size)
        )];

        // Maintain canonical order from productSizes
        return productSizes.filter(s => sizesForType.includes(s));
    }, [filters.type, currentTypeHasSizes]);

    // Reset size filter when switching to a sizeless type
    useEffect(() => {
        if (!currentTypeHasSizes && filters.size !== 'Todos') {
            setFilters(prev => ({ ...prev, size: 'Todos' }));
        }
    }, [filters.type, currentTypeHasSizes, filters.size]);

    // Filter products based on current filters
    const products = useMemo(() => {
        let result = huggiesCatalog;

        if (filters.type !== 'Todos') {
            result = result.filter(p => p.type === filters.type);
        }

        if (filters.size !== 'Todos') {
            // When a size is selected, show products matching that size
            // PLUS sizeless products (toallitas, cuidado) when viewing "Todos"
            result = result.filter(p => 
                p.size === filters.size || (filters.type === 'Todos' && p.size === null)
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.type.toLowerCase().includes(searchTerm)
            );
        }

        return result;
    }, [filters]);

    // Calculate recommended products
    const recommendedProducts = useMemo(() => {
        if (!childData || childData.skipped) return [];
        const { diaperSize, skinType, ageInMonths } = childData;
        return huggiesCatalog.filter(product => {
            if (skinType === 'sensitive' || skinType === 'atopic') {
                return (
                    (product.size === diaperSize && product.name.includes('Supreme')) ||
                    (product.type === 'Toallitas' && product.name.includes('Supreme'))
                );
            }
            if (ageInMonths && ageInMonths >= 12 && product.type === 'Pants') {
                return true;
            }
            return product.size === diaperSize || (product.type === 'Toallitas' && product.size === null);
        }).slice(0, 4);
    }, [childData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Genera las tags de un producto para mostrar en el modal de detalle.
     * Omite talla y peso para productos sin talla (toallitas, cuidado).
     */
    const buildProductTags = (product) => {
        const tags = [`<span style="background: rgba(2, 136, 209, 0.1); color: #0288D1; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${product.type}</span>`];

        if (product.size) {
            tags.push(`<span style="background: rgba(107, 114, 128, 0.1); color: #4B5563; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">Talla ${product.size}</span>`);
        }

        if (product.weightRange) {
            tags.push(`<span style="background: rgba(107, 114, 128, 0.1); color: #4B5563; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${product.weightRange}</span>`);
        }

        return tags.join('');
    };

    const handleProductClick = (product) => {
        MySwal.fire({
            title: `<h3 style="margin:0; font-size: 1.5rem; color: #1F2937;">${product.name}</h3>`,
            html: `
                <div style="text-align: left; padding: 10px 0;">
                    <div style="text-align: center; margin-bottom: 20px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E5E7EB;">
                        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 200px; object-fit: contain;" />
                    </div>
                    <div style="display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap;">
                        ${buildProductTags(product)}
                    </div>
                    <p style="color: #4B5563; font-size: 0.95rem; line-height: 1.5; margin-bottom: 15px;">${product.longDescription || product.description}</p>
                    ${product.features ? `<ul style="margin-top: 10px; padding-left: 20px; color: #4B5563; font-size: 0.9rem;">${product.features.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}</ul>` : ''}
                    <div style="font-size: 1.4rem; font-weight: 800; color: #1F2937; display: flex; align-items: center; gap: 10px; margin-top: 15px;">
                        ${product.discountPrice ? 
                            `<span style="color: #D32F2F;">${formatPrice(product.discountPrice)}</span>
                             <span style="text-decoration: line-through; color: #9CA3AF; font-size: 1rem; font-weight: 500;">${formatPrice(product.price)}</span>` 
                            : `<span>${formatPrice(product.price)}</span>`}
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Agregar al Carrito',
            cancelButtonText: 'Cerrar',
            confirmButtonColor: '#D32F2F',
            cancelButtonColor: '#9CA3AF',
            customClass: {
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
                popup: 'swal-custom-popup'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                addToCart(product);
                MySwal.fire({
                    title: '¡Agregado!',
                    text: 'El producto se ha añadido a tu carrito.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    return (
        <div className="products-page">
            <div className="container">
                <div className="products-header">
                    <h1>Catálogo de Productos Huggies</h1>
                    <p>Encuentra el producto ideal para cada etapa de tu bebé.</p>
                </div>

                <div className="products-layout">
                    {/* Sidebar Filters */}
                    <aside className="products-sidebar">
                        <div className="filter-section">
                            <h3>Búsqueda</h3>
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar productos..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="search-input"
                                id="filter-search"
                            />
                        </div>

                        <div className="filter-section">
                            <h3>Tipo de Producto</h3>
                            <div className="filter-options">
                                <label className="filter-radio">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Todos"
                                        checked={filters.type === 'Todos'}
                                        onChange={handleFilterChange}
                                    />
                                    <span>Todos</span>
                                </label>
                                {productTypes.map(type => (
                                    <label key={`type-${type}`} className="filter-radio">
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={filters.type === type}
                                            onChange={handleFilterChange}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Size filter — hidden for sizeless product types */}
                        {currentTypeHasSizes && availableSizes.length > 0 && (
                            <div className="filter-section filter-section-animated">
                                <h3>Talla</h3>
                                <div className="filter-options size-grid">
                                    <button
                                        className={`size-btn ${filters.size === 'Todos' ? 'active' : ''}`}
                                        name="size"
                                        value="Todos"
                                        onClick={handleFilterChange}
                                    >
                                        Todas
                                    </button>
                                    {availableSizes.map(size => (
                                        <button
                                            key={`size-${size}`}
                                            className={`size-btn ${filters.size === size ? 'active' : ''}`}
                                            name="size"
                                            value={size}
                                            onClick={handleFilterChange}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button
                            variant="outline"
                            className="clear-filters-btn"
                            onClick={() => setFilters({ type: 'Todos', size: 'Todos', search: '' })}
                        >
                            Limpiar Filtros
                        </Button>
                    </aside>

                    {/* Products Grid */}
                    <main className="products-main">
                        {/* 1. Recommended Section */}
                        {recommendedProducts.length > 0 && (
                            <div className="recommended-products-section animate-slide-up">
                                <div className="rec-section-header">
                                    <div className="rec-section-title-area">
                                        <span className="rec-section-badge">Recomendados para ti</span>
                                        <h2>Productos sugeridos para <strong>{childData.name}</strong> 👶</h2>
                                        <p>Basado en su talla (<strong>{childData.diaperSize}</strong>) y su piel (<strong>{childData.skinType === 'sensitive' ? 'Sensible' : childData.skinType === 'atopic' ? 'Muy Sensible / Atópica' : 'Normal'}</strong>)</p>
                                    </div>
                                </div>
                                <div className="recommended-products-grid">
                                    {recommendedProducts.map(product => (
                                        <Card key={`rec-${product.id}`} className="product-card rec-product-card-highlight">
                                            <div className="product-image">
                                                <img src={product.image} alt={product.name} />
                                                {product.discountPrice && (
                                                    <div className="discount-badge">Oferta</div>
                                                )}
                                                <div className="rec-card-badge">★ Recomendado</div>
                                            </div>
                                            <div className="product-content">
                                                <div className="product-tags">
                                                    <span className="tag type-tag">{product.type}</span>
                                                    {product.size && (
                                                        <span className="tag size-tag">Talla {product.size}</span>
                                                    )}
                                                </div>
                                                <h3 className="product-name">{product.name}</h3>
                                                {product.weightRange && (
                                                    <p className="product-weight">{product.weightRange}</p>
                                                )}
                                                <div className="product-price">
                                                    {product.discountPrice ? (
                                                        <>
                                                            <span className="current-price">{formatPrice(product.discountPrice)}</span>
                                                            <span className="original-price">{formatPrice(product.price)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="current-price">{formatPrice(product.price)}</span>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                                                    <Button variant="outline" className="view-details-btn" onClick={() => handleProductClick(product)} style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }}>
                                                        Ver Detalles
                                                    </Button>
                                                    <Button variant="primary" className="add-to-cart-btn" onClick={() => addToCart(product)} style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }}>
                                                        Agregar
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {/* Feedback Widget */}
                                <div className="recommended-feedback-container">
                                    {feedbackProducts ? (
                                        <div className="recommended-feedback-submitted">
                                            <span>✨ ¡Gracias! Tu opinión nos ayuda a perfeccionar las sugerencias para {childData.name}. ❤️</span>
                                        </div>
                                    ) : (
                                        <div className="recommended-feedback-prompt">
                                            <span>¿Te resultaron útiles estas sugerencias para tu bebé?</span>
                                            <div className="feedback-btn-group">
                                                <button className="feedback-sub-btn yes-btn" onClick={() => handleFeedbackProducts('useful')}>
                                                    Sí 👍
                                                </button>
                                                <button className="feedback-sub-btn no-btn" onClick={() => handleFeedbackProducts('not_useful')}>
                                                    No 👎
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 2. Promo banner for guest users */}
                        {(!childData || childData.skipped) && (
                            <div className="recommended-products-promo animate-slide-up">
                                <div className="promo-text">
                                    <span className="promo-badge">Personaliza tu compra</span>
                                    <h3>¿Quieres ver productos sugeridos para tu bebé?</h3>
                                    <p>Cuéntanos un poco sobre su etapa y talla para destacar los productos ideales para su piel.</p>
                                </div>
                                <Button variant="primary" size="small" onClick={() => { updateChildData(null); navigate('/'); }}>
                                    Registrar mi bebé
                                </Button>
                            </div>
                        )}

                        <div className="products-results-info">
                            <span>Mostrando <strong>{products.length}</strong> productos</span>
                        </div>

                        {products.length > 0 ? (
                            <div className="products-grid">
                                {products.map(product => (
                                    <Card key={product.id} className="product-card">
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                            {product.discountPrice && (
                                                <div className="discount-badge">Oferta</div>
                                            )}
                                        </div>
                                        <div className="product-content">
                                            <div className="product-tags">
                                                <span className="tag type-tag">{product.type}</span>
                                                {product.size && (
                                                    <span className="tag size-tag">Talla {product.size}</span>
                                                )}
                                            </div>
                                            <h3 className="product-name">{product.name}</h3>
                                            {product.weightRange && (
                                                <p className="product-weight">{product.weightRange}</p>
                                            )}
                                            <p className="product-desc">{product.description}</p>

                                            <div className="product-price">
                                                {product.discountPrice ? (
                                                    <>
                                                        <span className="current-price">{formatPrice(product.discountPrice)}</span>
                                                        <span className="original-price">{formatPrice(product.price)}</span>
                                                    </>
                                                ) : (
                                                    <span className="current-price">{formatPrice(product.price)}</span>
                                                )}
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                                                <Button variant="outline" className="view-details-btn" onClick={() => handleProductClick(product)} style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }}>
                                                    Ver Detalles
                                                </Button>
                                                <Button variant="primary" className="add-to-cart-btn" onClick={() => addToCart(product)} style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }}>
                                                    Agregar
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <div className="no-results-icon">🔍</div>
                                <h2>No se encontraron productos</h2>
                                <p>Intenta ajustar tus filtros de búsqueda para ver más resultados.</p>
                                <Button
                                    variant="primary"
                                    onClick={() => setFilters({ type: 'Todos', size: 'Todos', search: '' })}
                                >
                                    Ver todos los productos
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
