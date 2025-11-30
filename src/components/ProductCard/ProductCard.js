import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css'; // We'll create this CSS file next

const ProductCard = ({ product }) => {
    const { addItem } = useCart();

    const { 
        id, 
        name, 
        price, 
        originalPrice, 
        offer, 
        rating, 
        image 
    } = product;

    // Calculate percentage discount for visual appeal (trust factor)
    const discountPercent = originalPrice 
        ? Math.round(((originalPrice - price) / originalPrice) * 100) 
        : null;

    const handleAddToCart = (e) => {
        e.preventDefault(); // Stop navigation when clicking the button inside the Link
        addItem(product, 1);
        alert(`${name} added to cart!`); 
    };

    // Helper to format price to Indian Rupees (INR)
    const formatPrice = (p) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0, // Keep it clean and minimal
        }).format(p);
    };

    return (
        <div className="product-card card">
            {/* Link wrapper for navigation to the product detail page */}
            <Link to={`/product/${id}`} className="product-link">
                
                {/* Product Image */}
                <div className="product-image-container">
                    <img 
                        src={image} 
                        alt={name} 
                        className="product-image" 
                        // Fallback in case of image load error
                        onError={(e) => { e.target.onError = null; e.target.src = 'assets/placeholder.jpg'; }}
                    />
                    {/* Discount Badge for immediate impact */}
                    {discountPercent > 0 && (
                        <span className="discount-badge">
                            {discountPercent}% OFF
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <h3 className="product-name">{name}</h3>
                    
                    <div className="price-section">
                        {/* Current Price (Primary Focus) */}
                        <span className="current-price">
                            {formatPrice(price)}
                        </span>
                        
                        {/* Original Price (Strikethrough) */}
                        {originalPrice && originalPrice > price && (
                            <span className="original-price">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>
                    
                    {/* Offer Highlight (Trustworthy Text) */}
                    <p className="offer-text">{offer}</p>

                    {/* Rating (Essential for Trust) */}
                    <div className="product-rating">
                        <span>⭐ {rating}</span>
                    </div>
                </div>
            </Link>

            {/* Action Button */}
            <button 
                onClick={handleAddToCart} 
                className="btn-primary add-to-cart-btn"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
