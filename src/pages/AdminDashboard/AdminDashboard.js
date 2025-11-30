import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addProduct, fetchAllProducts } from '../../api/products';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CATEGORIES } from '../../utils/constants'; 
import './AdminDashboard.css'; // We will create this CSS file next

const initialProductState = {
    name: '',
    category: 'mobile', // Default category
    price: 0,
    originalPrice: 0,
    offer: '',
    description: '',
    stock: 1,
    image: '',
    isTrending: false,
};

const AdminDashboard = () => {
    const { user } = useAuth();
    const [newProduct, setNewProduct] = useState(initialProductState);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    // --- Data Fetching Logic (All Products) ---
    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllProducts();
            setProducts(data);
        } catch (error) {
            setMessage('Error loading product list.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // --- Form Handling ---
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setMessage('');

        // Basic validation
        if (!newProduct.name || !newProduct.price || newProduct.price <= 0) {
            setMessage('Please enter a valid Name and Price.');
            return;
        }

        try {
            // Note: addProduct updates the DUMMY_PRODUCTS array in memory
            const addedProduct = await addProduct(newProduct);
            
            setMessage(`Success! Product "${addedProduct.name}" added (ID: ${addedProduct.id}).`);
            setNewProduct(initialProductState); // Reset form
            loadProducts(); // Refresh the list
        } catch (error) {
            setMessage('Failed to add product.');
            console.error(error);
        }
    };
    
    // --- Render Functions ---
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">
                🔑 Admin Dashboard
            </h1>
            <p className="welcome-message">
                Welcome, **{user.username}**. Manage products and offers here.
            </p>
            
            {message && <div className="admin-message">{message}</div>}

            <div className="admin-layout-container">
                
                {/* 1. Add New Product Form */}
                <div className="add-product-section card">
                    <h2>Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="admin-form">
                        
                        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} required />
                        
                        <div className="form-group-row">
                            <select name="category" value={newProduct.category} onChange={handleInputChange}>
                                <option value="mobile">{CATEGORIES.MOBILE}</option>
                                <option value="audio">{CATEGORIES.AUDIO}</option>
                            </select>
                            
                            <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleInputChange} min="1" required />
                        </div>
                        
                        <div className="form-group-row price-group">
                            <input type="number" name="price" placeholder="Selling Price (₹)" value={newProduct.price} onChange={handleInputChange} min="1" required />
                            <input type="number" name="originalPrice" placeholder="M.R.P. (₹)" value={newProduct.originalPrice} onChange={handleInputChange} min="0" />
                        </div>
                        
                        <input type="text" name="offer" placeholder="Offer Text (e.g., 30% OFF)" value={newProduct.offer} onChange={handleInputChange} />
                        <input type="text" name="image" placeholder="Image Path (e.g., assets/image.jpg)" value={newProduct.image} onChange={handleInputChange} />

                        <textarea name="description" placeholder="Product Description" value={newProduct.description} onChange={handleInputChange} rows="3"></textarea>
                        
                        <div className="checkbox-group">
                            <input type="checkbox" id="isTrending" name="isTrending" checked={newProduct.isTrending} onChange={handleInputChange} />
                            <label htmlFor="isTrending">Mark as Trending</label>
                        </div>

                        <button type="submit" className="btn-primary admin-submit-btn">
                            Save Product
                        </button>
                    </form>
                </div>
                
                {/* 2. Product Listing/Management */}
                <div className="product-list-section card">
                    <h2>Current Product Inventory ({products.length})</h2>
                    <ul className="product-inventory-list">
                        {products.map((p) => (
                            <li key={p.id} className="inventory-item">
                                <span>**{p.name}** ({p.category.toUpperCase()})</span>
                                <span>₹{p.price} | Stock: {p.stock}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="inventory-note">
                        *Note: To delete or edit products, you would implement those API functions here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
