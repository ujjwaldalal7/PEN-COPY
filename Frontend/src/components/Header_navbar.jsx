import React from "react";
import logo from "../assets/LOGO.png";
import { useAuth } from "../context/auth";

const HeaderNavbar = () => {
  const { logout, isLoggedIn, isAdmin } = useAuth(); // Get auth state

  return (
    <header className="md:flex items-center h-24 bg-black space-x-10 justify-between">
      {/* Logo */}
      <div>
        <img src={logo} alt="Logo" className="h-24" />
      </div>

      <nav className="bg-black text-gray-400 w-96 p-0">
        <ul className="flex items-center justify-between whitespace-normal list-none p-0 m-0">
          <li><a href="/home">HOME</a></li>
          {isAdmin ? (
            <li><a href="/admin/dashboard">DASHBOARD</a></li>
          ) : (
            isLoggedIn && <li><a href="/userdashboard">DASHBOARD</a></li>
          )}
          <li><a href="/contact">CONTACT US</a></li>
          <li><a href="/cart">CART</a></li>
        </ul>
      </nav>

      <div className="w-96">
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
    </header>
  );
};

export default HeaderNavbar;
