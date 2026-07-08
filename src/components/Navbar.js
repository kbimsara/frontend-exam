import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Home,
  ShoppingCart,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Navbar = () => {
  const { logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-150 ${
      isActive(path)
        ? 'text-slate-900 bg-slate-100'
        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 select-none">
            <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-tight">EC</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 hidden sm:block tracking-tight">
              E-Commerce
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className={linkClasses(to)}>
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-1">
            {/* Cart */}
            <Link to="/cart" className={`relative ${linkClasses('/cart')}`}>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden ml-1 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-slate-100 py-2 space-y-0.5 pb-3">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;