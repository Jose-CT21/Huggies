import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProductSidebar from '../components/ProductSidebar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import { useProductFilters } from '../hooks/useProductFilters';
import { Baby, ThumbsUp, ThumbsDown } from 'lucide-react';
import Swal from 'sweetalert2';
import { formatPrice } from '../utils/formatPrice';
import { getSkinTypeLabel } from '../utils/labels';
import { showProductModal } from '../utils/productModal';
import './Products.css';

const Products = () => {
    const { childrenData, updateChildrenData, activeChildIndex, setActiveChildIndex, isAuthenticated } = useAuth();
    const { addToCart, toggleCart, cartItemsCount } = useCart();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const activeChild = childrenData && childrenData.length > 0 ? childrenData[activeChildIndex] : null;

    const {
        filters,
        setFilters,
        activeFilterCount,
        currentTypeHasSizes,
        availableSizes,
        products,
        recommendedProducts,
        handleFilterChange
    } = useProductFilters(activeChild);

    const [prevChildName, setPrevChildName] = useState(null);
    const [feedbackProducts, setFeedbackProducts] = useState(null);

    // Adjust state during render if child name changes to avoid useEffect cascading renders
    const childName = activeChild?.name || null;
    if (childName !== prevChildName) {
        setPrevChildName(childName);
        const stored = childName ? localStorage.getItem(`huggies_feedback_products_${childName}`) : null;
        setFeedbackProducts(stored);
    }

    const handleFeedbackProducts = (val) => {
        if (!activeChild) return;
        setFeedbackProducts(val);
        localStorage.setItem(`huggies_feedback_products_${activeChild.name}`, val);
        Swal.fire({
            title: '¡Gracias por tu opinión!',
            text: 'Nos ayuda a mejorar las recomendaciones.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    };

    const handleProductClick = (product) => showProductModal(product, addToCart);

    return (
        <div className="products-page">
            <div className="container">
                <div className="products-header">
                    <h1>Catálogo de Productos Huggies</h1>
                    <p>Encuentra el producto ideal para cada etapa de tu bebé.</p>
                    {isAuthenticated && (
                        <button className="products-rewards-chip" onClick={() => navigate('/recompensas')}>
                            ⭐ Mis Rewards
                        </button>
                    )}
                </div>

                {/* Floating filter toggle button */}
                <button
                    className="filter-fab"
                    id="filter-fab-btn"
                    onClick={() => setIsFilterOpen(true)}
                    aria-label="Abrir filtros"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="8" y1="12" x2="20" y2="12" />
                        <line x1="12" y1="18" x2="20" y2="18" />
                    </svg>
                    Filtros
                    {activeFilterCount > 0 && (
                        <span className="filter-fab-badge">{activeFilterCount}</span>
                    )}
                </button>

                <div className="products-layout">
                    <ProductSidebar
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                        filters={filters}
                        setFilters={setFilters}
                        handleFilterChange={handleFilterChange}
                        currentTypeHasSizes={currentTypeHasSizes}
                        availableSizes={availableSizes}
                    />

                    {/* Products Grid */}
                    <main className="products-main">
                        {/* 1. Recommended Section */}
                        {recommendedProducts.length > 0 && (
                            <div className="recommended-products-section animate-slide-up">
                                <div className="rec-section-header">
                                    <div className="rec-section-title-area">
                                        <span className="rec-section-badge">Recomendados para ti</span>
                                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            Productos sugeridos para <strong>{activeChild.name}</strong> 
                                            <Baby size={28} color="#ea580c" />
                                        </h2>
                                        <p>Basado en su talla (<strong>{activeChild.diaperSize}</strong>) y su piel (<strong>{getSkinTypeLabel(activeChild.skinType)}</strong>)</p>
                                        
                                        {childrenData && childrenData.length > 1 && (
                                            <div className="baby-selector-container" style={{ marginTop: '16px', marginBottom: '8px' }}>
                                                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Ver recomendaciones para:</p>
                                                <div className="baby-selector" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                                    {childrenData.map((child, idx) => (
                                                        <button 
                                                            key={idx}
                                                            onClick={() => setActiveChildIndex(idx)}
                                                            style={{
                                                                padding: '6px 14px',
                                                                borderRadius: '20px',
                                                                border: '1px solid #0288D1',
                                                                background: activeChildIndex === idx ? '#0288D1' : '#fff',
                                                                color: activeChildIndex === idx ? '#fff' : '#0288D1',
                                                                fontSize: '0.85rem',
                                                                cursor: 'pointer',
                                                                whiteSpace: 'nowrap',
                                                                fontWeight: activeChildIndex === idx ? 'bold' : 'normal',
                                                                textTransform: 'capitalize'
                                                            }}
                                                        >
                                                            {child.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="recommended-products-grid">
                                    {recommendedProducts.map(product => (
                                        <Card key={`rec-${product.id}`} className="product-card rec-product-card-highlight">
                                            <div className="product-image">
                                                <img src={product.image} alt={product.name} />
                                                <div className="product-badges">
                                                    <div className="rec-card-badge">★ Recomendado</div>
                                                </div>
                                                {product.discountPrice && (
                                                    <div className="product-badges-bottom">
                                                        <div className="discount-badge">Oferta</div>
                                                    </div>
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
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
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
                                            <span>✨ ¡Gracias! Tu opinión nos ayuda a perfeccionar las sugerencias para {activeChild.name}. ❤️</span>
                                        </div>
                                    ) : (
                                        <div className="recommended-feedback-prompt">
                                            <span>¿Te resultaron útiles estas sugerencias para tu bebé?</span>
                                            <div className="feedback-btn-group">
                                                <button className="feedback-sub-btn yes-btn" onClick={() => handleFeedbackProducts('useful')}>
                                                    Sí <ThumbsUp size={16} />
                                                </button>
                                                <button className="feedback-sub-btn no-btn" onClick={() => handleFeedbackProducts('not_useful')}>
                                                    No <ThumbsDown size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 2. Promo banner for guest users */}
                        {(!activeChild || activeChild.skipped) && (
                            <div className="recommended-products-promo animate-slide-up">
                                <div className="promo-text">
                                    <span className="promo-badge">Personaliza tu compra</span>
                                    <h3>¿Quieres ver productos sugeridos para tu bebé?</h3>
                                    <p>Cuéntanos un poco sobre su etapa y talla para destacar los productos ideales para su piel.</p>
                                </div>
                                <Button variant="primary" size="small" onClick={() => { updateChildrenData([]); navigate('/'); }}>
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
                                                <div className="product-badges-bottom">
                                                    <div className="discount-badge">Oferta</div>
                                                </div>
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

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
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

            {/* Cart FAB — visible on mobile since cart was removed from BottomNav */}
            <button
                className="products-cart-fab"
                onClick={toggleCart}
                aria-label="Abrir carrito"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartItemsCount > 0 && (
                    <span className="products-cart-fab__badge">{cartItemsCount}</span>
                )}
            </button>
        </div>
    );
};

export default Products;
