import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="user-profile-page" style={{padding: '40px 20px', maxWidth: '800px', margin: '0 auto'}}>
            <h1 style={{color: 'var(--primary-color)'}}>Welcome, {user?.username.split('@')[0]}!</h1>
            <p style={{marginBottom: '30px', color: 'var(--light-text-color)'}}>This is your personalized dashboard.</p>
            
            <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
                
                {/* Track Order Section */}
                <Link to="/track-order" className="dashboard-card card" style={{textDecoration: 'none', padding: '20px', textAlign: 'center'}}>
                    <h3 style={{color: 'var(--secondary-color)', fontSize: '1.5rem'}}>📦 Track Orders</h3>
                    <p>View status of all your current and past purchases.</p>
                </Link>

                {/* Account Details Section */}
                <div className="dashboard-card card" style={{padding: '20px', textAlign: 'center'}}>
                    <h3 style={{color: 'var(--primary-color)', fontSize: '1.5rem'}}>👤 Account Details</h3>
                    <p>Email: {user?.username}</p>
                    <p>Role: {user?.role}</p>
                </div>

                {/* Customer Review Placeholder */}
                <div className="dashboard-card card" style={{padding: '20px', textAlign: 'center'}}>
                    <h3 style={{color: 'var(--text-color)', fontSize: '1.5rem'}}>⭐️ Leave a Review</h3>
                    <p>Share your experience and add images/videos!</p>
                </div>
                
            </div>
        </div>
    );
};

export default UserProfile;
