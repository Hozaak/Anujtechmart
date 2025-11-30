import React from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../utils/constants';

const CategoryPage = () => {
    const { name } = useParams();
    
    // Map URL param to display name
    const categoryTitle = CATEGORIES[name.toUpperCase()] || 'Unknown Category';

    return (
        <div className="category-page" style={{padding: '50px', textAlign: 'center'}}>
            <h1>{categoryTitle}</h1>
            <p>This page will display all products filtered by **{categoryTitle}**.</p>
            <p style={{marginTop: '20px', color: 'var(--light-text-color)'}}>
                Product listing integration is needed here.
            </p>
        </div>
    );
};

export default CategoryPage;
