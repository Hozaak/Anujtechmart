import { DUMMY_PRODUCTS, CATEGORIES } from '../utils/constants';

// A dummy delay function to simulate network latency, making API calls feel realistic
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ===================================================
// PUBLIC FACING FUNCTIONS (Product Listing)
// ===================================================

/**
 * Fetches all products available in the store.
 * @returns {Promise<Array>} A promise that resolves to an array of all products.
 */
export const fetchAllProducts = async () => {
    await simulateDelay(); 
    return DUMMY_PRODUCTS;
};

/**
 * Fetches a single product by its unique ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
export const fetchProductById = async (id) => {
    await simulateDelay();
    const product = DUMMY_PRODUCTS.find(p => p.id === id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

/**
 * Fetches and organizes products into the three main sections for the home page:
 * Trending, Mobile, and Audio Series.
 * @returns {Promise<Object>} A promise that resolves to an object with categorized product lists.
 */
export const fetchCategorizedProducts = async () => {
    await simulateDelay();
    
    // 1. Trending Section (based on isTrending flag)
    const trending = DUMMY_PRODUCTS.filter(p => p.isTrending);

    // 2. Mobile Section (Category: 'mobile')
    const mobile = DUMMY_PRODUCTS.filter(p => p.category.toLowerCase() === 'mobile');

    // 3. Audio Series (Category: 'audio')
    const audio = DUMMY_PRODUCTS.filter(p => p.category.toLowerCase() === 'audio');

    return {
        [CATEGORIES.TRENDING]: trending,
        [CATEGORIES.MOBILE]: mobile,
        [CATEGORIES.AUDIO]: audio,
    };
};


// ===================================================
// ADMIN FACING FUNCTIONS (Product Management)
// ===================================================

/**
 * Adds a new product to the in-memory list (Simulates persistence).
 * This will be replaced by a real database call later.
 * @param {Object} newProduct - The new product data.
 * @returns {Promise<Object>} A promise that resolves to the newly added product.
 */
export const addProduct = async (newProduct) => {
    await simulateDelay(200);
    
    // Simulate assigning a new unique ID
    const newId = `p${DUMMY_PRODUCTS.length + 1}`; 
    
    // Create the final product object with defaults
    const productToAdd = { 
        ...newProduct, 
        id: newId, 
        rating: 0, 
        stock: parseInt(newProduct.stock, 10) || 10, // Ensure stock is a number
        isTrending: !!newProduct.isTrending, // Ensure boolean value
        image: newProduct.image || 'assets/placeholder.jpg' 
    };

    // Temporarily update the DUMMY_PRODUCTS array (only for the current session)
    DUMMY_PRODUCTS.push(productToAdd); 
    
    console.log("Product added (in-memory):", productToAdd);
    return productToAdd;
};
