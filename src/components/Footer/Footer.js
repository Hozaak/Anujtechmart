import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                
                {/* 1. Quick Links Section */}
                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Support</Link></li>
                        <li><Link to="/faq">FAQs</Link></li>
                        <li><Link to="/admin">Admin Access</Link></li>
                    </ul>
                </div>

                {/* 2. Customer Engagement/Reviews (NEW SECTION) */}
                <div className="footer-section engagement">
                    <h4>Customer Zone</h4>
                    <ul>
                        <li><Link to="/profile">My Account / Orders</Link></li>
                        <li><Link to="/review-us">⭐️ Write a Review</Link></li>
                        <li><Link to="/faqs">FAQs</Link></li>
                        <li><Link to="/track-order">Track Your Order</Link></li>
                    </ul>
                </div>

                {/* 3. Policies & Legal Section (Existing Legal) */}
                <div className="footer-section legal">
                    <h4>Legal & Policies</h4>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/returns">Return Policy</Link></li>
                        <li><Link to="/shipping">Shipping Info</Link></li>
                    </ul>
                </div>
                
                {/* 4. Brand Message & Trust */}
                <div className="footer-section trust-info">
                    <h4>Anuj E-Store</h4>
                    <p className="trust-message">
                        Minimal. Reliable. Guaranteed.
                        <br/>
                        <span style={{fontSize: '0.8rem', color: '#aaa', display: 'block', marginTop: '5px'}}>Since 2020: Genuine Tech, Genuine Price.</span>
                    </p>
                </div>
            </div>

            {/* 5. Copyright Bar */}
            <div className="copyright-bar">
                <p>&copy; 2020 - {currentYear} Anuj E-Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
