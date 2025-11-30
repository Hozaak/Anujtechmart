// This file serves as a temporary, in-memory database for products and admin credentials.

export const DUMMY_PRODUCTS = [
    // 1. Mobile (Trending) - High Value Discount
    {
        id: 'p1',
        name: 'Quantum Leap 5G Smartphone',
        category: 'mobile',
        price: 18999,
        originalPrice: 24999, // Higher Original Price
        offer: 'Flat 24% OFF! Best Seller.',
        description: 'Blazing fast Snapdragon 8 Gen 2 processor, 108MP camera, and a minimal, seamless glass design. Trustworthy performance guarantee.',
        rating: 4.8,
        stock: 50,
        image: 'assets/product_images/mobile_1.jpg',
        isTrending: true,
    },
    // 2. Audio (Trending) - Clear Offer/Freebie (Earbuds + T-Case)
    {
        id: 'p2',
        name: 'EchoMax Pro Wireless Earbuds',
        category: 'audio',
        price: 999, // The current selling price
        originalPrice: 1999,
        offer: '50% OFF + Free Charging Case!',
        description: 'Crystal clear sound quality and stable Bluetooth 5.2. Comes with a complimentary protective T-Case (Value ₹499).',
        rating: 4.5,
        stock: 120,
        image: 'assets/product_images/earbuds_1.jpg',
        isTrending: true,
    },
    // 3. Audio (Trending) - Premium Product
    {
        id: 'p3',
        name: 'Acoustic Voyager ANC Headphones',
        category: 'audio',
        price: 5999,
        originalPrice: 7999,
        offer: 'Deal of the Day! 25% Instant Discount.',
        description: 'Immersive sound, 40-hour battery life, and superior Active Noise Cancellation. Built for professionals.',
        rating: 4.7,
        stock: 35,
        image: 'assets/product_images/headphone_2.jpg',
        isTrending: true,
    },
    // 4. Mobile Accessory - Minimal Price Drop
    {
        id: 'p4',
        name: 'ThunderCharge 100W PD Adapter',
        category: 'mobile',
        price: 1499,
        originalPrice: 1699,
        offer: 'Limited Time Offer: Get 10% OFF.',
        description: 'Ultra-fast GaN technology ensures safety and speed. Perfect companion for your 5G smartphone.',
        rating: 4.6,
        stock: 90,
        image: 'assets/product_images/charger_1.jpg',
        isTrending: false,
    },
    // 5. Audio (Standard Item)
    {
        id: 'p5',
        name: 'RetroBeat Wired Earphones',
        category: 'audio',
        price: 499,
        originalPrice: 699,
        offer: 'Budget Friendly Choice.',
        description: 'Reliable wired earphones with a classic look and rich bass. Durable and lightweight.',
        rating: 4.0,
        stock: 200,
        image: 'assets/product_images/earphones_2.jpg',
        isTrending: false,
    },
    // 6. Mobile (Mid-Range) - Offer focused on bank/card
    {
        id: 'p6',
        name: 'VisionTab 10-inch Tablet',
        category: 'mobile',
        price: 11999,
        originalPrice: 12999,
        offer: 'Extra ₹1000 off on Select Cards.',
        description: 'Large display for consumption and productivity. Sleek metal unibody design.',
        rating: 4.3,
        stock: 45,
        image: 'assets/product_images/tablet_1.jpg',
        isTrending: true,
    },
    // 7. Audio Accessory - Utility Item
    {
        id: 'p7',
        name: 'Durable Braided USB-C Cable (2m)',
        category: 'audio', // Classified as accessory here
        price: 349,
        originalPrice: 499,
        offer: 'Buy 2 Get 1 Free!',
        description: 'Tangle-free, heavy-duty braided cable capable of 60W power transfer.',
        rating: 4.8,
        stock: 300,
        image: 'assets/product_images/cable_1.jpg',
        isTrending: false,
    },
    // 8. Mobile (Flagship) - High Price
    {
        id: 'p8',
        name: 'Titan X Foldable Phone',
        category: 'mobile',
        price: 99999,
        originalPrice: 119999,
        offer: 'Massive ₹20,000 Price Drop!',
        description: 'The future of mobile technology. Innovative foldable screen with zero gap hinge.',
        rating: 4.9,
        stock: 10,
        image: 'assets/product_images/fold_1.jpg',
        isTrending: true,
    },
    // 9. Audio (Soundbar) - Specific Product Type
    {
        id: 'p9',
        name: 'Cinema-Pro 2.1 Soundbar',
        category: 'audio',
        price: 6499,
        originalPrice: 8999,
        offer: 'Launch Offer: 30% OFF',
        description: 'Deep bass and clear vocals for a cinematic experience at home. Wall-mountable.',
        rating: 4.2,
        stock: 25,
        image: 'assets/product_images/soundbar_1.jpg',
        isTrending: false,
    },
    // 10. Accessory (Powerbank) - High Stock/Value
    {
        id: 'p10',
        name: 'MegaPower 20000mAh Power Bank',
        category: 'audio', // Accessory
        price: 1899,
        originalPrice: 2499,
        offer: 'Reliable power backup.',
        description: 'Dual fast charging ports and robust build quality. Never run out of charge.',
        rating: 4.4,
        stock: 150,
        image: 'assets/product_images/powerbank_2.jpg',
        isTrending: false,
    },
];

// Admin Credentials (as requested: lucky and anuj)
export const ADMIN_USERS = [
    { username: 'lucky@admin.com', password: 'adminpassword123', role: 'admin' },
    { username: 'anuj@admin.com', password: 'adminpassword456', role: 'admin' }
];

// Regular User for testing (simulated)
export const REGULAR_USERS = [
    { username: 'testuser@guest.com', password: 'guest123', role: 'user' }
];

// Product Categories for Routing/Filtering (as requested)
export const CATEGORIES = {
    TRENDING: 'Trending Section',
    MOBILE: 'Mobile Section',
    AUDIO: 'Audio Series', // Includes audio devices and related accessories
};
