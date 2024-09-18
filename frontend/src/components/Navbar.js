import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { FaBars, FaUserCircle } from "react-icons/fa";
import RealTimeUpdates from "./RealTimeUpdates"; // Importing the notification component

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        padding: "10px 40px",
      }}
    >
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
    </nav>
  );
};

const UserMenu = ({ user, handleLogout, dropdownOpen, toggleDropdown }) => (
  <div
    className="d-flex align-items-center justify-content-evenly"
    style={{ width: "150px" }}
  >
    <RealTimeUpdates />

    {user ? (
      <div className="dropdown">
        <FaUserCircle
          size={32}
          style={{ cursor: "pointer", color: "#333" }}
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div
            className="dropdown-menu"
            style={{
              display: "block",
              position: "absolute",
              right: 0,
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              width: "200px",
            }}
          >
            <Link
              to="/profile"
              className="dropdown-item"
              style={{ padding: "10px", color: "#333" }}
            >
              Profile
            </Link>
            <div
              className="dropdown-item"
              onClick={handleLogout}
              style={{ padding: "10px", cursor: "pointer", color: "#333" }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    ) : (
      <div
        className="d-flex align-items-center justify-content-between ms-3 me-5"
        style={{ gap: "15px" }}
      >
        <Link
          className="nav-link me-3"
          to="/login"
          style={{
            color: "#333",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "1px solid #333",
            textAlign: "center",
          }} 
        >
          Login
        </Link>
        <Link
          className="nav-link me-5"
          to="/register"
          style={{
            color: "#333",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "1px solid #333",
            textAlign: "center",
          }} 
        >
          Register
        </Link>
      </div>
    )}
  </div>
);

const DesktopNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ width: "100%" }}
    >
      <Link
        className="navbar-brand"
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#333",
        }}
      >
        Fynura
      </Link>

      <ul className="navbar-nav d-flex justify-content-center flex-row">
        <li className="nav-item mx-3">
          <Link className="nav-link" to="/" style={{ color: "#333" }}>
            Home
          </Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link" to="/projects/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link" to="/community">
            Community
          </Link>
        </li>
      </ul>

      <UserMenu
        user={user}
        handleLogout={handleLogout}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
};

const MobileNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ width: "100%" }}
    >
      <FaBars
        size={24}
        onClick={toggleHamburger}
        style={{ cursor: "pointer", color: "#333" }}
      />
      {/* Center: Logo */}
      <Link
        className="navbar-brand mx-auto"
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#333",
        }}
      >
        Fynura
      </Link>
      <UserMenu
        user={user}
        handleLogout={handleLogout}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
      />
      {isOpen && (
        <ul
          className="navbar-nav"
          style={{
            position: "absolute",
            top: "60px",
            left: 0,
            backgroundColor: "#fff",
            width: "100%",
            padding: "20px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ color: "#333" }}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/projects/dashboard"
              style={{ color: "#333" }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/community"
              style={{ color: "#333" }}
            >
              Community
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
