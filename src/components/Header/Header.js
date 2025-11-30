import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../utils/constants'; // Import CATEGORIES
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
                
                {/* 1. Logo/Brand Name */}
                <Link to="/" className="logo">
                    🛒 Anuj E-Store
                </Link>

                {/* 2. Main Navigation Links (New Product Sections) */}
                <nav className="nav-links">
                    
                    {/* Primary Product Categories */}
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/category/mobile" className="nav-item">{CATEGORIES.MOBILE.replace(' Section', '')}</Link>
                    <Link to="/category/audio" className="nav-item">{CATEGORIES.AUDIO.replace(' Series', '')}</Link>
                    <Link to="/category/trending" className="nav-item">{CATEGORIES.TRENDING.replace(' Section', '')}</Link>
                    
                    {/* Cart Link with Item Count */}
                    <Link to="/cart" className="nav-item cart-icon">
                        Cart 
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>

                    {/* Admin Dashboard / Login (Hidden from non-admin user view, but accessible if logged out) */}
                    {isAuthenticated && isAdmin && (
                        <Link to="/admin" className="nav-item admin-link">
                            Admin
                        </Link>
                    )}
                </nav>

                {/* 3. Authentication Section (User-centric features) */}
                <div className="auth-section">
                    
                    {/* NEW: Track Order Link */}
                    <Link to="/track-order" className="btn-secondary track-btn">
                        Track Order
                    </Link>
                    
                    {isAuthenticated ? (
                        <>
                            <span className="welcome-message">
                                Hello, {user.username.split('@')[0]}!
                            </span>
                            <button onClick={handleLogout} className="btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        // If logged out, show the login button as "Admin Login"
                        <Link to="/login" className="btn-primary">
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
