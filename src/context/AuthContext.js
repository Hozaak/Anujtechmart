import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../api/user'; //
import LoadingSpinner from '../components/LoadingSpinner'; //

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to hold user info (null if logged out)
    const [user, setUser] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false); //
    const [isLoading, setIsLoading] = useState(true); // Tracks initial load from storage

    // Effect to check local storage on initial app load
    useEffect(() => {
        const checkAuth = async () => {
            // FIX: Introduce a minimum delay (e.g., 300ms) to prevent quick flash on fast connections
            await new Promise(resolve => setTimeout(resolve, 300)); 

            const storedUser = localStorage.getItem('ecomUser');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser); //
                    setUser(parsedUser); //
                    setIsAuthenticated(true); //
                } catch (e) {
                    console.error("Failed to parse user from storage:", e); //
                    localStorage.removeItem('ecomUser'); // Clear corrupted data
                }
            }
            setIsLoading(false); // Authentication check is complete
        };

        checkAuth();
    }, []);

    /**
     * Handles the login process by calling the API simulation.
     */
    const login = async (username, password) => {
        setIsLoading(true); //
        try {
            const validatedUser = await loginUser(username, password); //

            if (validatedUser) {
                setUser(validatedUser); //
                setIsAuthenticated(true); //
                // Store user data in local storage for persistence
                localStorage.setItem('ecomUser', JSON.stringify(validatedUser)); //
                setIsLoading(false); //
                return true; // Login successful
            } else {
                setIsLoading(false); //
                throw new Error('Invalid username or password.'); // Login failed (e.g., 401 error)
            }
        } catch (error) {
            setIsLoading(false); //
            // Re-throw the error to be handled by the Login component
            throw error; //
        }
    };

    /**
     * Handles the logout process.
     */
    const logout = () => {
        setUser(null); //
        setIsAuthenticated(false); //
        localStorage.removeItem('ecomUser'); //
    };

    /**
     * Checks if the currently logged-in user has a specific role (e.g., 'admin').
     */
    const hasRole = (role) => {
        return user && user.role === role; //
    };

    const value = {
        user, //
        isAuthenticated, //
        isLoading, //
        login, //
        logout, //
        hasRole, //
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Show a full-page loading spinner only during the initial authentication check */}
            {isLoading ? <LoadingSpinner /> : children} 
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context easily in any component
export const useAuth = () => {
    return useContext(AuthContext); //
};
