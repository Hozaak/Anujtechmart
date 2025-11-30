import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css'; // We'll create this CSS file next

const Header = () => {
    // Hooks to access state and actions
    const { isAuthenticated, logout, user, hasRole } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    const isAdmin = hasRole('admin');

    return (
        <header className="header">
            <div className="header-container">
                
                {/* 1. Logo/Brand Name */}
                <Link to="/" className="logo">
                    🛒 **Anuj E-Store**
                </Link>

                {/* 2. Main Navigation Links */}
                <nav className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    {/* Cart Link with Item Count */}
                    <Link to="/cart" className="nav-item cart-icon">
                        Cart 
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>

                    {/* Admin Dashboard Link (Visible only to Admins) */}
                    {isAuthenticated && isAdmin && (
                        <Link to="/admin" className="nav-item admin-link">
                            Admin
                        </Link>
                    )}
                </nav>

                {/* 3. Authentication Section */}
                <div className="auth-section">
                    {isAuthenticated ? (
                        <>
                            <span className="welcome-message">
                                Hello, **{user.username.split('@')[0]}**!
                            </span>
                            <button onClick={handleLogout} className="btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary">
                            Login / Sign Up
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
