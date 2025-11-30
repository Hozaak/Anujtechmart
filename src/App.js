// ... (imports)
import UserProfile from './pages/UserProfile'; // NEW IMPORT

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
                <Route path="/login" element={<Login />} />

                {/* NEW User Routes */}
                <Route path="/profile" element={<UserProfile />} /> {/* User Dashboard */}
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
