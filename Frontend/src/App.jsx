import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserDashboard from "./pages/Userdashboard"; // Fix: Ensure case matches file
import Register from "./pages/Register";
import LoginForm from "./pages/Login";
import { useAuth } from "./context/auth";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import CreateProduct from "./pages/Admin/CreateProducts";
import Unauthorized from "./pages/Admin/Unauthorized";

function App() {
  const { isLoggedIn, isAdmin, isAuthChecked } = useAuth();

  if (!isAuthChecked) return <div>Loading...</div>; // Prevents flickering logout

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected Routes */}
      <Route
        path="/userdashboard"
        element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />}
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={isAdmin ? <Dashboard /> : <Navigate to="/admin/unauthorized" />}
      />
      <Route
        path="/admin/products"
        element={isAdmin ? <AdminProducts /> : <Navigate to="/admin/unauthorized" />}
      />
      <Route
        path="/admin/products/create"
        element={isAdmin ? <CreateProduct /> : <Navigate to="/admin/unauthorized" />}
      />

      <Route path="/admin/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
