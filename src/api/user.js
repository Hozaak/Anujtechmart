import { ADMIN_USERS } from '../utils/constants';

// A dummy delay function to simulate network latency during authentication
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates a server-side login check.
 * Checks the provided credentials against the hardcoded ADMIN_USERS list.
 * In a real application, this would be an API call to a backend /login endpoint.
 * * @param {string} username - The user's email or username.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} Resolves with user object (username, role) or null if invalid.
 */
export const loginUser = async (username, password) => {
    await simulateDelay(); 

    // 1. Check if the provided credentials match any Admin user
    const adminUser = ADMIN_USERS.find(
        (u) => u.username === username && u.password === password
    );

    if (adminUser) {
        // Successful Admin login
        return { 
            username: adminUser.username, 
            role: adminUser.role, // 'admin'
            // In a real app, you would receive a JWT token here
        };
    }

    // 2. Add logic here for regular user login (if you had a dummy list for them)
    // For now, if not an Admin, we assume login fails
    
    // For a minimal approach, we can define a single regular user for testing
    if (username === 'testuser@guest.com' && password === 'guest123') {
        return {
            username: 'testuser@guest.com',
            role: 'user',
        };
    }

    // 3. Login failed
    return null;
};


/**
 * Simulates a basic user registration (though we mainly focus on Admin login).
 * In a real app, this would send data to a /register endpoint.
 * * @param {Object} userData - Contains username, password, etc.
 * @returns {Promise<Boolean>} Resolves true for success, false for failure (e.g., user already exists).
 */
export const registerUser = async (userData) => {
    await simulateDelay(300);
    // Since we are not persisting data, we always return success for the demo.
    console.log("Simulating registration for:", userData.username);
    return true; 
};


/*
  Note: This file should be integrated into AuthContext.js to manage the application state. 
  When you migrate to a real backend, you will replace the internal checks and hardcoded users 
  with 'fetch' or 'axios' calls to your authentication server.
*/
