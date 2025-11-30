import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css'; // We will create this CSS file next

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where to redirect after successful login (default to home)
    const from = location.state?.from?.pathname || "/";
    
    // If already authenticated, redirect immediately
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setIsLoggingIn(true);

        try {
            // Attempt to log in using the Auth Context function
            await login(username, password); 
            // The useEffect hook above will handle the navigation upon success
        } catch (error) {
            // Handle login failure (e.g., Invalid credentials)
            setLoginError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    if (isAuthenticated) {
        // Render nothing or a quick message while waiting for the redirect effect
        return <div className="login-page">Redirecting...</div>;
    }

    return (
        <div className="login-page">
            <div className="login-card card">
                <h1 className="login-title">Account Login</h1>
                <p className="login-subtitle">Access your account or Admin Dashboard.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    
                    {loginError && <p className="error-message">{loginError}</p>}

                    <div className="form-group">
                        <label htmlFor="username">Email/Username:</label>
                        <input
                            type="email"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g., lucky@admin.com or testuser@guest.com"
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
