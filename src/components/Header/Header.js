import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../utils/constants'; 
import './Header.css';

const Header = () => {
    const { isAuthenticated, logout, user, hasRole } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isAdmin = hasRole('admin');

    return (
        <header className="header">
            <div className="header-container">
                
                {/* 1. Logo/Brand Name (Logo/Image placeholder needed in public/assets/ ) */}
                <Link to="/" className="logo logo-with-image">
                    {/* Assuming logo.jpg is in public/assets/ */}
                    <img src="/assets/logo.jpg" alt="Anuj E-Store Logo" className="logo-img" /> 
                    Anuj E-Store
                </Link>

                {/* 2. Main Navigation Links (Matching Image Layout) */}
                <nav className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/category/mobile" className="nav-item">Mobile</Link>
                    <Link to="/category/audio" className="nav-item">Audio</Link>
                    <Link to="/category/trending" className="nav-item">Trending</Link>
                    <Link to="/cart" className="nav-item cart-icon">
                        Cart 
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </nav>

                {/* 3. Authentication Section (User-centric features) */}
                <div className="auth-section">
                    {isAuthenticated ? (
                        <>
                            {/* User Menu/Profile Link */}
                            <Link to="/profile" className="btn-secondary profile-btn">
                                My Account
                            </Link>
                            
                            {/* Only show ADMIN button for logged-in Admins */}
                            {isAdmin && (
                                <Link to="/admin" className="btn-primary admin-btn-highlight">
                                    Admin Dashboard
                                </Link>
                            )}
                            <button onClick={handleLogout} className="btn-secondary logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* NEW: Track Order Link (User Feature) */}
                            <Link to="/track-order" className="btn-secondary track-btn">
                                Track Order
                            </Link>
                            {/* Login Button (Now for ALL users/admins) */}
                            <Link to="/login" className="btn-primary login-btn-highlight">
                                User Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
