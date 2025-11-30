import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../utils/constants'; 
import './Header.css';

const Header = () => {
    const { isAuthenticated, logout, user, hasRole } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile hamburger menu

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isAdmin = hasRole('admin');
    const userDisplayName = user ? user.username.split('@')[0] : 'Guest';

    const accountLink = isAuthenticated ? (isAdmin ? '/admin' : '/profile') : '/login';

    return (
        <>
            {/* Top Offer Bar */}
            <div className="top-offer-bar">
                Winters Sale Live! Enjoy FREE home delivery and up to 40% OFF on prepaid & partial payment orders!
            </div>

            <header className="main-header">
                <div className="header-top-container">
                    
                    {/* Hamburger Menu (Mobile Only) */}
                    <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
                        ☰
                    </button>

                    {/* 1. Logo/Brand Name (FIXED PATH) */}
                    <Link to="/" className="logo logo-with-image">
                        {/* The uploaded file name is 'logo.jpg', so we use that path */}
                        <img src="/assets/logo.jpg" alt="Anuj Tech Mart Logo" className="logo-img" /> 
                    </Link>

                    {/* 2. Search Bar (Similar to the screenshot) */}
                    <div className="search-bar-container">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <select className="search-category-select" aria-label="Select Category">
                            <option value="all">All categories</option>
                            <option value="mobile">{CATEGORIES.MOBILE.replace(' Section', '')}</option>
                            <option value="audio">{CATEGORIES.AUDIO.replace(' Series', '')}</option>
                            <option value="trending">{CATEGORIES.TRENDING.replace(' Section', '')}</option>
                        </select>
                        <button className="search-button" aria-label="Search">
                            🔍
                        </button>
                    </div>

                    {/* 3. Account/Cart Section */}
                    <div className="account-cart-section">
                        <div className="user-auth-area">
                            <Link to={accountLink} className="auth-link">
                                {isAuthenticated ? 'My account' : 'Login / Signup'}
                            </Link>
                            
                            {/* Track Order is now in the bottom nav bar */}
                            {/* The second line from the screenshot (My Account) is omitted for clean space */}
                        </div>

                        {/* Cart Icon */}
                        <Link to="/cart" className="cart-icon-link">
                            <span className="cart-icon-symbol">🛒</span>
                            <span className="cart-text">Cart</span>
                            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
                        </Link>
                    </div>
                </div>

                {/* Bottom Navigation Bar (Visible on Desktop, opens via Hamburger on Mobile) */}
                <nav className={`bottom-nav-bar ${isMenuOpen ? 'is-open' : ''}`}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/category/all" className="nav-link">All Products</Link>
                    <Link to="/category/trending" className="nav-link">Trending</Link>
                    <Link to="/category/mobile" className="nav-link">Mobile</Link>
                    <Link to="/category/audio" className="nav-link">Audio</Link>
                    
                    {/* PROFESSIONAL FEATURE: Track Order Link (User Feature) */}
                    <Link to="/track-order" className="nav-link track-order-link">Track Order</Link>
                    
                    <Link to="/contact" className="nav-link">Contact</Link>
                    
                    {/* Admin Link for logged-in Admins */}
                    {isAuthenticated && isAdmin && (
                        <Link to="/admin" className="nav-link admin-nav-link">Admin</Link>
                    )}
                </nav>
            </header>
        </>
    );
};

export default Header;
