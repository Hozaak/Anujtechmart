import React, { useEffect, useState } from 'react';
import { fetchCategorizedProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CATEGORIES } from '../../utils/constants';
import './Home.css'; // We will create this CSS file next

const Home = () => {
    const [categorizedProducts, setCategorizedProducts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categorized products on component mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Fetch data from the simulated API
                const data = await fetchCategorizedProducts();
                setCategorizedProducts(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try refreshing.");
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message"><h2>⚠️ Error</h2><p>{error}</p></div>;
    }
    
    // Function to render a single section (e.g., Trending, Mobile)
    const renderSection = (titleKey, products) => (
        <section key={titleKey} className="product-section">
            <h2 className="section-title">{titleKey}</h2>
            {products && products.length > 0 ? (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="no-products-message">No items currently available in this section.</p>
            )}
            <hr className="section-divider" />
        </section>
    );

    return (
        <div className="home-page">
            {/* Minimal Promotional Banner for Trustworthiness */}
            <div className="hero-banner">
                <h1>Minimal Electronics. Maximum Trust.</h1>
                <p>Curated selection of the best mobile and audio devices, delivered fast.</p>
            </div>

            {/* 1. Trending Section */}
            {renderSection(CATEGORIES.TRENDING, categorizedProducts[CATEGORIES.TRENDING])}

            {/* 2. Mobile Section */}
            {renderSection(CATEGORIES.MOBILE, categorizedProducts[CATEGORIES.MOBILE])}

            {/* 3. Audio Series Section */}
            {renderSection(CATEGORIES.AUDIO, categorizedProducts[CATEGORIES.AUDIO])}
            
        </div>
    );
};

export default Home;
