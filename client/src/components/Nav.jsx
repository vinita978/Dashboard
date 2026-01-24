import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signup");
    window.location.reload();
  };

  return (
    <nav className="bg-black px-4 py-3 shadow-md relative z-40">
      <div className="flex items-center justify-between">

        {/* 🔹 Logo */}
        <Link
          to="/"
          className="text-white text-xl font-bold"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-red-500">My</span>Store
        </Link>

        {/* 🔹 Mobile Menu Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* 🔹 Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
          {auth ? (
            <>
              <li><Link to="/" className="hover:text-red-400">Products</Link></li>
              <li><Link to="/add" className="hover:text-red-400">Add Product</Link></li>
              <li><Link to="/update" className="hover:text-red-400">Update Product</Link></li>
              <li><Link to="/profile" className="hover:text-red-400">Profile</Link></li>
              <li>
                <button onClick={logout} className="hover:text-red-400">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-red-400">Login</Link></li>
              <li><Link to="/signup" className="hover:text-red-400">Signup</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-white font-semibold bg-black p-4 rounded relative z-50">
          {auth ? (
            <>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Products</Link></li>
              <li><Link to="/add" onClick={() => setMenuOpen(false)}>Add Product</Link></li>
              <li><Link to="/update" onClick={() => setMenuOpen(false)}>Update Product</Link></li>
              <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
