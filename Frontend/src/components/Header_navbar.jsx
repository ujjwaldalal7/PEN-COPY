import React, { useState } from "react";
import logo from "../assets/LOGO.png";
import { useAuth } from "../context/auth";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle

const HeaderNavbar = () => {
  const { logout, isLoggedIn, isAdmin } = useAuth(); // Get auth state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-gray-400">
      <div className="flex items-center justify-between h-24 px-6 md:px-10">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-16 md:h-24" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/home" className="hover:text-white">HOME</a>
          {isAdmin ? (
            <a href="/admin/dashboard" className="hover:text-white">DASHBOARD</a>
          ) : (
            isLoggedIn && <a href="/userdashboard" className="hover:text-white">DASHBOARD</a>
          )}
          <a href="/cart" className="hover:text-white">CART</a>
          {isAdmin ? (
            <a href="/admin/orders" className="hover:text-white">ORDERS</a>
          ) : (
            isLoggedIn && <a href="/orders" className="hover:text-white">ORDERS</a>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button className="bg-gray-500 text-white w-28 h-9 rounded-xl" onClick={logout}>
              LogOut
            </button>
          ) : (
            <button className="bg-gray-500 text-white w-28 h-9 rounded-xl">
              <a href="/login">LogIn</a>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-black p-6 space-y-4 text-center">
          <a href="/home" className="block hover:text-white">HOME</a>
          {isAdmin ? (
            <a href="/admin/dashboard" className="block hover:text-white">DASHBOARD</a>
          ) : (
            isLoggedIn && <a href="/userdashboard" className="block hover:text-white">DASHBOARD</a>
          )}
          <a href="/cart" className="block hover:text-white">CART</a>
          {isAdmin ? (
            <a href="/admin/orders" className="block hover:text-white">ORDERS</a>
          ) : (
            isLoggedIn && <a href="/orders" className="block hover:text-white">ORDERS</a>
          )}

          {/* Mobile Auth Buttons */}
          {isLoggedIn ? (
            <button className="bg-gray-500 text-white w-full h-9 rounded-xl" onClick={logout}>
              LogOut
            </button>
          ) : (
            <button className="bg-gray-500 text-white w-full h-9 rounded-xl">
              <a href="/login">LogIn</a>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderNavbar;
