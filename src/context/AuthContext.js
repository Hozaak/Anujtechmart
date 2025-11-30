import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, simulateFirebaseLogin } from '../api/user'; // Import new functions
import LoadingSpinner from '../components/LoadingSpinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initial load logic (checking local storage) is sufficient for initial loading.

    // Effect to listen for changes in Firebase Auth state (real-time check)
    // NOTE: This requires Firebase integration in the next steps.

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 300)); 
            const storedUser = localStorage.getItem('ecomUser');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (e) {
                    console.error("Failed to parse user from storage:", e);
                    localStorage.removeItem('ecomUser');
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    /**
     * Handles the login process for both ADMIN (hardcoded) and USER (simulated/Firebase).
     */
    const login = async (username, password) => {
        setIsLoading(true);
        try {
            // 1. Try Admin Login (via hardcoded list)
            let validatedUser = await loginUser(username, password); 

            if (!validatedUser) {
                 // 2. Try Regular User Login (Simulated Firebase Auth)
                 validatedUser = await simulateFirebaseLogin(username, password);
            }

            if (validatedUser) {
                setUser(validatedUser);
                setIsAuthenticated(true);
                localStorage.setItem('ecomUser', JSON.stringify(validatedUser));
                setIsLoading(false);
                return true; 
            } else {
                setIsLoading(false);
                throw new Error('Invalid email or password.'); 
            }
        } catch (error) {
            setIsLoading(false);
            throw error; 
        }
    };

    const logout = () => {
        // Implement Firebase Sign Out logic here if using real Firebase
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('ecomUser');
    };

    const hasRole = (role) => {
        return user && user.role === role;
    };

    const value = { user, isAuthenticated, isLoading, login, logout, hasRole };

    return (
        <AuthContext.Provider value={value}>
            {isLoading ? <LoadingSpinner /> : children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
