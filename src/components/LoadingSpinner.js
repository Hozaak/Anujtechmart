import React from 'react';

// Inline CSS for the spinner container
const spinnerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh', // Take up vertical space for visibility
    color: '#007bff', // Primary color for a trustworthy look
    padding: '20px',
    textAlign: 'center',
};

// Inline CSS for the visual cue (simple animated text)
const loadingTextStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '15px',
    // In a real setup, you would define the keyframes 'pulse' in a CSS file
    // For this manual structure, we keep it simple:
};

// You can use an emoji or simple characters as a visual spinner cue
const visualCueStyle = {
    fontSize: '3rem',
    animation: 'spin 1.5s linear infinite', // Placeholder for CSS animation
};

const LoadingSpinner = () => {
    return (
        <div style={spinnerContainerStyle}>
            <span role="img" aria-label="Loading" style={visualCueStyle}>
                🔄
            </span>
            <span style={loadingTextStyle}>
                Loading Products... Please wait for the minimal UI to appear.
            </span>
        </div>
    );
};

export default LoadingSpinner;

/*
  NOTE: If you were using a CSS file, you would define the 'spin' animation like this:
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  Since we are using inline styles, the animation effect will not actually run, 
  but the structure is correct.
*/
