import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                
                {/* 1. Quick Links Section */}
                {/* ... (Existing Quick Links) ... */}

                {/* 2. Customer Engagement/Reviews (NEW SECTION) */}
                <div className="footer-section engagement">
                    <h4>Customer Zone</h4>
                    <ul>
                        <li><Link to="/profile">My Account / Orders</Link></li>
                        <li><Link to="/review-us">⭐️ Write a Review</Link></li>
                        <li><Link to="/faqs">FAQs</Link></li>
                        <li><Link to="/contact">Contact Support</Link></li>
                    </ul>
                </div>
                
                {/* 3. Policies & Legal Section (Existing Legal) */}
                {/* ... */}
                
                {/* 4. Contact Info/Brand Message (Existing Contact Info) */}
                {/* ... */}
            </div>

            {/* 4. Copyright Bar */}
            <div className="copyright-bar">
                <p>&copy; 2020 - {currentYear} Anuj E-Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
