import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // We'll create this CSS file next

const Footer = () => {
    // Get the current year for the copyright notice
    const currentYear = new Date().getFullYear(); //

    return (
        <footer className="footer">
            <div className="footer-container">
                
                {/* 1. Quick Links Section */}
                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Support</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/admin">Admin Access</Link></li>
                    </ul>
                </div>

                {/* 2. Policies & Legal Section (For Trustworthiness) */}
                <div className="footer-section legal">
                    <h4>Legal & Policies</h4>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/returns">Return Policy</Link></li>
                        <li><Link to="/shipping">Shipping Info</Link></li>
                    </ul>
                </div>

                {/* 3. Contact Info/Brand Message */}
                <div className="footer-section contact-info">
                    <h4>Contact</h4>
                    <p>Email: support@anujestore.com</p>
                    <p>Ph: +91 98765 43210</p>
                    <p className="trust-message">
                        {/* REMOVED ** */}
                        Anuj E-Store: Minimal. Reliable. Guaranteed.
                    </p>
                </div>
            </div>

            {/* 4. Copyright Bar */}
            <div className="copyright-bar">
                <p>&copy; {currentYear} Anuj E-Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
