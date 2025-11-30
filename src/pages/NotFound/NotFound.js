import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // We will create this CSS file next

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content card">
                <h1 className="error-code">404</h1>
                <h2 className="error-message-title">Page Not Found</h2>
                
                <p className="error-description">
                    The requested minimalist resource could not be located.
                    It looks like you took a wrong turn.
                </p>

                <p className="error-guidance">
                    Don't worry, you can easily go back to shopping!
                </p>

                <Link to="/" className="btn-primary home-link-btn">
                    Go Back To Home
                </Link>
                
                <p className="contact-link">
                    If you believe this is an error, please <Link to="/contact">contact support</Link>.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
