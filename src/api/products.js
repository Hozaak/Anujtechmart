
export const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        name: 'EchoMax Pro Wireless Headphones',
        category: 'audio',
        price: 3999,
        originalPrice: 5999,
        offer: '30% OFF',
        description: 'Immersive sound with 30-hour battery life and active noise cancellation. Perfect for travel and work.',
        rating: 4.5,
        stock: 15,
        image: 'assets/product_images/headphone_1.jpg', // public/assets/ के सापेक्ष पथ
        isTrending: true,
    },
    {
        id: 'p2',
        name: 'Quantum Leap 5G Smartphone',
        category: 'mobile',
        price: 18999,
        originalPrice: 21999,
        offer: 'Flat ₹3000 Discount',
        description: 'Blazing fast 5G processor, 108MP camera, and sleek, minimal design. The future in your hand.',
        rating: 4.8,
        stock: 5,
        image: 'assets/product_images/mobile_1.jpg',
        isTrending: true,
    },
    {
        id: 'p3',
        name: 'SmartBand X Fitness Tracker',
        category: 'audio', // इसे ऑडियो/मोबाइल के बजाय 'ट्रेंडी' आइटम मान सकते हैं
        price: 1999,
        originalPrice: 2499,
        offer: '20% OFF',
        description: 'Track steps, heart rate, and sleep. Waterproof with 7 days of battery backup.',
        rating: 4.1,
        stock: 50,
        image: 'assets/product_images/band_1.jpg',
        isTrending: false,
    },
    {
        id: 'p4',
        name: 'ThunderCharge 10000mAh Powerbank',
        category: 'audio', // एक्सेसरी
        price: 999,
        originalPrice: 1299,
        offer: 'Sale Price',
        description: 'Fast charging powerbank with LED display. Compact and highly reliable.',
        rating: 4.6,
        stock: 100,
        image: 'assets/product_images/powerbank_1.jpg',
        isTrending: false,
    },
    // आप यहां और प्रोडक्ट जोड़ सकते हैं (ऑडियो सीरीज़, मोबाइल)
];

// Admin Credentials (जो हमने पिछली चर्चा में तय किए थे)
export const ADMIN_USERS = [
    { username: 'lucky@admin.com', password: 'adminpassword123', role: 'admin' },
    { username: 'anuj@admin.com', password: 'adminpassword456', role: 'admin' }
];

// प्रोडक्ट कैटेगरीज
export const CATEGORIES = {
    TRENDING: 'Trending Section',
    MOBILE: 'Mobile Section',
    AUDIO: 'Audio Series',
};
