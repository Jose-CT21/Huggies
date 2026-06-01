import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { huggiesCatalog } from '../data/huggiesCatalog';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import './ProductDetail.css';

/**
 * Formatea un precio en colones costarricenses.
 * @param {number} amount - Monto a formatear
 * @returns {string} Precio formateado (e.g., "₡5,950")
 */
const formatPrice = (amount) => {
    return `₡${amount.toLocaleString('es-CR')}`;
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const product = huggiesCatalog.find(p => p.id === id);

    if (!product) {
        return (
            <div className="product-detail-not-found">
                <div className="container">
                    <div className="not-found-content">
                        <div className="not-found-icon">🔍</div>
                        <h1>Producto no encontrado</h1>
                        <p>El producto que buscas no existe o ya no está disponible.</p>
                        <Button variant="primary" onClick={() => navigate('/products')}>
                            Ver catálogo
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const displayPrice = product.discountPrice ?? product.price;
    const savings = product.discountPrice ? product.price - product.discountPrice : 0;

    const relatedProducts = huggiesCatalog
        .filter(p => p.id !== product.id && p.type === product.type)
        .slice(0, 3);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Inicio</Link>
                    <span>›</span>
                    <Link to="/products">Productos</Link>
                    <span>›</span>
                    <span>{product.name}{product.size ? ` – Talla ${product.size}` : ''}</span>
                </nav>

                {/* Main product section */}
                <div className="product-detail-main">
                    {/* Image */}
                    <div className="product-detail-image-wrap">
                        {product.discountPrice && (
                            <div className="detail-discount-badge">¡Oferta!</div>
                        )}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-detail-image"
                        />
                    </div>

                    {/* Info */}
                    <div className="product-detail-info">
                        <div className="detail-tags">
                            <span className="tag type-tag">{product.type}</span>
                            {product.size && (
                                <span className="tag size-tag">Talla {product.size}</span>
                            )}
                        </div>

                        <h1 className="detail-title">{product.name}</h1>
                        {product.weightRange && (
                            <p className="detail-weight">Peso del bebé: <strong>{product.weightRange}</strong></p>
                        )}
                        <p className="detail-description">{product.description}</p>

                        {/* Price */}
                        <div className="detail-price-block">
                            <span className="detail-current-price">{formatPrice(displayPrice)}</span>
                            {product.discountPrice && (
                                <>
                                    <span className="detail-original-price">{formatPrice(product.price)}</span>
                                    <span className="detail-savings">Ahorras {formatPrice(savings)}</span>
                                </>
                            )}
                        </div>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <ul className="detail-features">
                                {product.features.map((feat, i) => (
                                    <li key={i}>
                                        <span className="feature-check">✓</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Quantity */}
                        <div className="detail-quantity">
                            <label>Cantidad:</label>
                            <div className="quantity-control">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                    aria-label="Reducir cantidad"
                                >−</button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    aria-label="Aumentar cantidad"
                                >+</button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="detail-actions">
                            <Button
                                variant="primary"
                                className="detail-add-btn"
                                onClick={handleAddToCart}
                            >
                                {added ? '¡Agregado! ✓' : 'Agregar al Carrito'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/products')}
                            >
                                Seguir comprando
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <section className="related-products">
                        <h2>Productos relacionados</h2>
                        <div className="related-grid">
                            {relatedProducts.map(p => (
                                <Link
                                    key={p.id}
                                    to={`/product/${p.id}`}
                                    className="related-card"
                                >
                                    <div className="related-img-wrap">
                                        <img src={p.image} alt={p.name} />
                                    </div>
                                    <div className="related-info">
                                        <p className="related-name">{p.name}</p>
                                        {p.size && (
                                            <p className="related-size">Talla {p.size}</p>
                                        )}
                                        <p className="related-price">
                                            {formatPrice(p.discountPrice ?? p.price)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
