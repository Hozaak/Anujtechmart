import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    
    const { login, isAuthenticated, user } = useAuth(); // Added 'user'
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where to redirect after successful login
    const adminLink = '/admin';
    const userLink = '/profile'; // New user dashboard route
    const redirectPath = user?.role === 'admin' ? adminLink : userLink;

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectPath, { replace: true });
        }
    }, [isAuthenticated, navigate, redirectPath]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setIsLoggingIn(true);

        try {
            await login(username, password); 
            // Navigation handled by useEffect
        } catch (error) {
            setLoginError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    if (isAuthenticated) {
        return <div className="login-page">Redirecting to Dashboard...</div>;
    }

    return (
        <div className="login-page">
            <div className="login-card card">
                <h1 className="login-title">Account Login</h1>
                <p className="login-subtitle">Use your credentials to access your personalized dashboard or the Admin panel.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    
                    {loginError && <p className="error-message">{loginError}</p>}

                    <div className="form-group">
                        <label htmlFor="username">Email/Username:</label>
                        <input
                            type="email"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary login-btn" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="extra-links">
                    <p>
                        New User? <Link to="/register" className="register-link">Create Account</Link> 
                        <br/>
                        <small>(Registration is currently simulated)</small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
