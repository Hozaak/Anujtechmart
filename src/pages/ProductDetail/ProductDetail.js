import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/products';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import './ProductDetail.css'; // We will create this CSS file next

const ProductDetail = () => {
    // Get the product ID from the URL parameter
    const { id } = useParams(); 
    const { addItem } = useCart();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    // Fetch product details on component mount or ID change
    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setProduct(null);
                setError("Product not found or failed to load details.");
            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // Calculate percentage discount
    const discountPercent = product && product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    // Helper to format price to Indian Rupees (INR)
    const formatPrice = (p) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(p);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        // Ensure quantity is at least 1 and not more than available stock
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!product || quantity < 1) return;

        addItem(product, quantity);
        setMessage(`${quantity} x ${product.name} added to cart!`);
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return <div className="error-message product-not-found"><h2>404</h2><p>{error}</p></div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-content card">
                
                {/* Image Section */}
                <div className="product-image-area">
                    <img 
                        src={`/${product.image}`} 
                        alt={product.name} 
                        className="main-product-image" 
                    />
                    {discountPercent > 0 && (
                        <span className="discount-tag">{discountPercent}% OFF</span>
                    )}
                </div>

                {/* Details and Action Section */}
                <div className="product-details-area">
                    <h1 className="product-title">{product.name}</h1>
                    
                    <div className="product-rating-trust">
                        <span className="rating-badge">⭐ {product.rating}</span>
                        <span className="stock-info">
                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="price-box">
                        <p className="current-price-detail">
                            {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <p className="original-price-detail">
                                M.R.P.: <del>{formatPrice(product.originalPrice)}</del>
                            </p>
                        )}
                        <p className="offer-highlight">{product.offer}</p>
                    </div>
                    
                    <hr className="detail-divider" />
                    
                    {/* Description (Trust Factor) */}
                    <h3 className="section-heading">Description:</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <hr className="detail-divider" />

                    {/* Quantity and Add to Cart Action */}
                    <div className="action-section">
                        <label htmlFor="quantity" className="quantity-label">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            min="1"
                            max={product.stock > 0 ? product.stock : 1}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                        
                        <button 
                            onClick={handleAddToCart} 
                            className="btn-primary add-to-cart-btn-lg"
                            disabled={product.stock === 0}
                        >
                            {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                        </button>
                    </div>
                    
                    {message && <p className="success-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
