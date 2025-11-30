import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import NotFound from './pages/NotFound/NotFound';
// NEW Pages (Placeholders)
import CategoryPage from './pages/CategoryPage'; // NEW FILE
import TrackOrder from './pages/TrackOrder'; // NEW FILE

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/Utils/PrivateRoute'; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            
            <Header /> 
            
            <main>
              <Routes>
                
                {/* Core Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Login remains the Admin login point */}
                <Route path="/login" element={<Login />} /> 
                
                {/* NEW Routes */}
                <Route path="/category/:name" element={<CategoryPage />} />
                <Route path="/track-order" element={<TrackOrder />} />

                {/* Admin Route */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer /> 
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
