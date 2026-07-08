import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <>
      {!isLogin && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
              },
            }}
          />
          <AppLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AppLayout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;