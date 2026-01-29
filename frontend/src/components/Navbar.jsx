import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 className="logo">🛍️ GadgetHub</h2>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <span style={{ margin: "0 10px", color: "#333" }}>
              Welcome, {user.name || user.email || "User"}
            </span>
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
