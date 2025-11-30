import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers (State Management)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages (Major Views/Routes)
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import NotFound from './pages/NotFound/NotFound';

// Components (Reusable UI/Logic)
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/Utils/PrivateRoute'; // To protect the admin route

function App() {
  return (
    // BrowserRouter enables URL routing
    <BrowserRouter>
      {/* 1. State Providers: Wrap the whole app in necessary contexts */}
      <AuthProvider>
        <CartProvider>
          <div className="App">
            
            {/* Header is rendered outside the Routes so it appears on all pages */}
            <Header /> 
            
            <main>
              {/* Routes define which component to render based on the URL */}
              <Routes>
                
                {/* Public Routes (Accessible by everyone) */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />

                {/* Placeholder/Trivial Routes (If you choose to implement them later) */}
                <Route path="/contact" element={<p style={{textAlign: 'center', padding: '50px'}}>Contact Page Placeholder</p>} />
                <Route path="/about" element={<p style={{textAlign: 'center', padding: '50px'}}>About Us Page Placeholder</p>} />


                {/* Private Admin Route (Protected by AuthContext) */}
                <Route
                  path="/admin"
                  element={
                    // PrivateRoute component ensures only 'admin' role users can access
                    <PrivateRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                
                {/* Catch-all Route for 404 (Must be the last route) */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer is rendered outside the Routes so it appears on all pages */}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
