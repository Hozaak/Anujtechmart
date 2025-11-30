import React from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
    return (
        <div className="track-order-page" style={{padding: '50px', textAlign: 'center'}}>
            <h1>Track Your Order 📦</h1>
            <p>Enter your order ID below to see the status of your shipment.</p>
            
            <div style={{maxWidth: '400px', margin: '30px auto'}}>
                <input 
                    type="text" 
                    placeholder="Enter Order ID" 
                    style={{width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px'}}
                />
                <button 
                    className="btn-primary" 
                    style={{width: '100%', padding: '12px'}}
                    onClick={() => alert('Tracking functionality to be integrated with backend/Firebase!')}
                >
                    Track Now
                </button>
            </div>

            <p style={{marginTop: '20px', color: 'var(--light-text-color)'}}>
                Order tracking requires a persistent database (Firebase/Backend).
            </p>
        </div>
    );
};

export default TrackOrder;
