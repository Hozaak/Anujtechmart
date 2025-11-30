import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css'; // We will create this CSS file next

const Cart = () => {
    const { 
        cartItems, 
        totalPrice, 
        removeItem, 
        updateQuantity,
        clearCart // Though usually not exposed directly, it's good to have.
    } = useCart();
    
    const navigate = useNavigate();

    // Helper to format price to Indian Rupees (INR)
    const formatPrice = (p) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(p);
    };

    const handleQuantityChange = (id, e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity >= 1) {
            updateQuantity(id, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page-empty cart-container">
                <h1>Your Cart is Empty 🛒</h1>
                <p>Looks like you haven't found anything yet.</p>
                <Link to="/" className="btn-primary start-shopping-btn">
                    Start Shopping Now
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart ({cartItems.length} items)</h1>
            <div className="cart-container">
                
                {/* Cart Items List */}
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item card">
                            <Link to={`/product/${item.id}`} className="item-image-link">
                                <img src={`/${item.image}`} alt={item.name} className="item-image" />
                            </Link>
                            
                            <div className="item-details">
                                <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                                <p className="item-offer">{item.offer}</p>
                            </div>

                            <div className="item-quantity">
                                <label>Qty:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e)}
                                    className="quantity-input-small"
                                />
                            </div>

                            <div className="item-price">
                                <span className="current-item-price">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                                <span className="unit-price-small">
                                    ({formatPrice(item.price)} / unit)
                                </span>
                            </div>

                            <button 
                                onClick={() => removeItem(item.id)} 
                                className="btn-remove"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="cart-summary card">
                    <h2>Cart Summary</h2>
                    <div className="summary-row">
                        <span>Total Items:</span>
                        <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                    </div>
                    <div className="summary-row total-amount">
                        <span>Grand Total:</span>
                        <span className="grand-total-price">{formatPrice(totalPrice)}</span>
                    </div>
                    
                    <button 
                        onClick={handleCheckout} 
                        className="btn-primary checkout-btn"
                    >
                        Proceed to Checkout ({formatPrice(totalPrice)})
                    </button>
                    {/* Optional: Clear Cart Button */}
                    <button 
                        onClick={clearCart} 
                        className="btn-secondary clear-cart-btn"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
