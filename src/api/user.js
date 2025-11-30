import { ADMIN_USERS, REGULAR_USERS } from '../utils/constants'; // Import REGULAR_USERS
// Import auth service from the new firebase file (if using real backend)
// import { auth } from '../firebase'; 
// import { signInWithEmailAndPassword } from 'firebase/auth'; 

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Checks credentials against the hardcoded ADMIN_USERS list.
 */
export const loginUser = async (username, password) => {
    await simulateDelay(200); 
    const adminUser = ADMIN_USERS.find(
        (u) => u.username === username && u.password === password
    );
    if (adminUser) {
        return { username: adminUser.username, role: adminUser.role };
    }
    return null;
};


/**
 * SIMULATES Firebase Email/Password Login for Regular Users.
 * If integration is real, replace this logic with signInWithEmailAndPassword(auth, username, password).
 */
export const simulateFirebaseLogin = async (username, password) => {
    await simulateDelay(300);
    
    // Check against the hardcoded regular user for now
    const regularUser = REGULAR_USERS.find(
        (u) => u.username === username && u.password === password
    );

    if (regularUser) {
        return { username: regularUser.username, role: 'user' };
    }
    
    // Simulate Firebase error for unknown user
    return null;
};

// Register User (simulated - can be replaced with Firebase createUserWithEmailAndPassword)
export const registerUser = async (userData) => {
    await simulateDelay(300);
    console.log("Simulating registration for:", userData.username);
    return true; 
};
