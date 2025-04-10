import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "./config";
const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  user: null,
  isAuthChecked: false,
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${api_url}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            setIsLoggedIn(true);
            setUser(data);
            setIsAdmin(data.role === "admin");
          } else {
            setIsLoggedIn(false);
            setUser(null);
            setIsAdmin(false);
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUser(null);
          setIsAdmin(false);
        })
        .finally(() => {
          setIsAuthChecked(true);
        });
    } 
    setIsAuthChecked(true);
    
  }, []);

  const loginHandler = async ({ email, password }) => {
    try {
      const response = await fetch(`${api_url}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        setIsAdmin(data.user.role === "admin");

        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const contextValue = {
    isLoggedIn,
    isAdmin,
    login: loginHandler,
    logout: logoutHandler,
    user,
    isAuthChecked,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
