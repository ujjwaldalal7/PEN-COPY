import React, { useState } from 'react';
import Header_navbar from '../components/Header_navbar';
import Footer from '../components/footer';
import TextField from '../components/TextField';
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setError('');

    if (!isLoggedIn) {
      await login({ email, password });
        
      }
  };

  return (
    <div>
      <Header_navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <form 
          className="flex flex-1 items-center justify-center flex-col gap-4 w-full max-w-md mx-auto p-4 border border-gray-300 rounded-md shadow-sm"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <TextField
            type="email"
            name="email"
            placeholder="Enter registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <h3 className='text-black'>
            New User? <a href='/register' className='underline text-blue-600'>Register here</a>
          </h3>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
