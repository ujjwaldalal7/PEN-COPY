import React, { useState } from "react";
import logo from "../assets/LOGO.png";
import { useAuth } from "../context/auth";
import { FiMenu, FiX } from "react-icons/fi";

const HeaderNavbar = () => {
  const { logout, isLoggedIn, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-gray-400 shadow-md">
      <div className="flex items-center justify-between h-20 px-6 md:px-10">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-14 md:h-20" />
        </div>

        <nav className="hidden md:flex space-x-8 text-lg font-medium mx-auto">
          <a href="/home" className="hover:text-white transition duration-300">
            HOME
          </a>
          {isAdmin ? (
            <a
              href="/admin/dashboard"
              className="hover:text-white transition duration-300"
            >
              DASHBOARD
            </a>
          ) : (
            isLoggedIn && (
              <a
                href="/userdashboard"
                className="hover:text-white transition duration-300"
              >
                DASHBOARD
              </a>
            )
          )}
          <a href="/cart" className="hover:text-white transition duration-300">
            CART
          </a>
          {isAdmin ? (
            <a
              href="/admin/orders"
              className="hover:text-white transition duration-300"
            >
              ORDERS
            </a>
          ) : (
            isLoggedIn && (
              <a
                href="/orders"
                className="hover:text-white transition duration-300"
              >
                ORDERS
              </a>
            )
          )}
        </nav>

        <div className="hidden md:block w-72">
          {isLoggedIn ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
              onClick={logout}
            >
              LogOut
            </button>
          ) : (
            <a href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300">
                LogIn
              </button>
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-6 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>

        {/* Links */}
        <a
          href="/home"
          className="text-white hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >
          HOME
        </a>
        {isAdmin ? (
          <a
            href="/admin/dashboard"
            className="text-white hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            DASHBOARD
          </a>
        ) : (
          isLoggedIn && (
            <a
              href="/userdashboard"
              className="text-white hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              DASHBOARD
            </a>
          )
        )}
        <a
          href="/cart"
          className="text-white hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >
          CART
        </a>
        {isAdmin ? (
          <a
            href="/admin/orders"
            className="text-white hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            ORDERS
          </a>
        ) : (
          isLoggedIn && (
            <a
              href="/orders"
              className="text-white hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              ORDERS
            </a>
          )
        )}

        {/* Auth Button (Mobile) */}
        <div className="mt-8">
          {isLoggedIn ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              LogOut
            </button>
          ) : (
            <a href="/login" onClick={() => setMenuOpen(false)}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300">
                LogIn
              </button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderNavbar;
