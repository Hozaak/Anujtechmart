import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Checkout.css'; // We will create this CSS file next

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    
    // State for shipping form
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    // Ref for the Cashfree Button container
    const cashfreeContainerRef = useRef(null);

    // Helper to format price to Indian Rupees (INR)
    const formatPrice = (p) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(p);
    };

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    // Simulates the integration of the external HTML/JS payment button
    useEffect(() => {
        if (formSubmitted && totalPrice > 0 && cashfreeContainerRef.current) {
            // NOTE: Replace the content of this function with your actual Cashfree button HTML code
            const cashfreeButtonHTML = `
                <button id="cashfree-pay-button" class="btn-primary payment-btn-placeholder">
                    Pay Now ${formatPrice(totalPrice)} (via Cashfree)
                </button>
                <p class="trust-msg">Payment is secured via Cashfree Gateway.</p>
                <p class="small-text">Order will be placed upon successful payment.</p>
                
                `;
            
            cashfreeContainerRef.current.innerHTML = cashfreeButtonHTML;

            // Optional: Simulate successful payment after a click for demo purposes
            const payButton = cashfreeContainerRef.current.querySelector('#cashfree-pay-button');
            if (payButton) {
                payButton.onclick = () => {
                    alert('Simulating successful payment via Cashfree...');
                    setTimeout(() => {
                        // Clear cart and redirect after 'successful' payment
                        clearCart();
                        navigate('/order-success'); // Assuming you create an OrderSuccess page
                    }, 1500);
                };
            }
        }
    }, [formSubmitted, totalPrice, clearCart, navigate]);

    const handleFormChange = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simple client-side validation check
        if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.email) {
            alert("Please fill in all required shipping details.");
            return;
        }
        
        setFormSubmitted(true);
    };

    if (cartItems.length === 0) {
        return null; // Should redirect via useEffect, but safe return.
    }

    return (
        <div className="checkout-page">
            <h1>Checkout Summary</h1>
            <div className="checkout-container">
                
                {/* 1. Shipping Details Form */}
                <div className="shipping-form-section card">
                    <h2>1. Shipping Details</h2>
                    {!formSubmitted ? (
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" name="name" placeholder="Full Name *" value={shippingDetails.name} onChange={handleFormChange} required />
                            <input type="email" name="email" placeholder="Email Address *" value={shippingDetails.email} onChange={handleFormChange} required />
                            <input type="tel" name="phone" placeholder="Phone Number" value={shippingDetails.phone} onChange={handleFormChange} />
                            <textarea name="address" placeholder="Full Address *" value={shippingDetails.address} onChange={handleFormChange} required></textarea>
                            <input type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleFormChange} />
                            <input type="text" name="zip" placeholder="ZIP/Pin Code" value={shippingDetails.zip} onChange={handleFormChange} />
                            
                            <button type="submit" className="btn-primary save-details-btn">
                                Save Details & Proceed to Payment
                            </button>
                        </form>
                    ) : (
                        <div className="details-saved">
                            <p>Shipping Address Saved: **{shippingDetails.name}**</p>
                            <p>{shippingDetails.address}, {shippingDetails.city} - {shippingDetails.zip}</p>
                            <p className="edit-link" onClick={() => setFormSubmitted(false)}>Edit Details</p>
                        </div>
                    )}
                </div>

                {/* 2. Order Summary and Payment */}
                <div className="order-summary-section card">
                    <h2>2. Order Summary</h2>
                    <div className="summary-details">
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    
                    <hr />
                    
                    <div className="summary-total-row">
                        <span>Shipping Fee:</span>
                        <span>FREE</span> {/* Minimal sites often offer free shipping */}
                    </div>
                    <div className="summary-total-row final-total">
                        <span>**Total Payable:**</span>
                        <span>**{formatPrice(totalPrice)}**</span>
                    </div>

                    {/* Cashfree Payment Button Integration */}
                    {formSubmitted && (
                        <div className="payment-gateway-area">
                            <h3>Select Payment Method</h3>
                            <div 
                                ref={cashfreeContainerRef} 
                                className="cashfree-button-container"
                            >
                                {/* The Cashfree button HTML/JS will be dynamically injected here */}
                                <p>Loading secure payment gateway...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {!formSubmitted && (
                <p className="disclaimer">
                    *Please save your shipping details to proceed to the secure payment gateway.*
                </p>
            )}
        </div>
    );
};

export default Checkout;
