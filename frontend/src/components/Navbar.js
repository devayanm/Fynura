import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { FaBars, FaUserCircle } from "react-icons/fa";
import RealTimeUpdates from "./RealTimeUpdates";
import { logoutUser } from "../utils/api";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (loading) return null;

  return (
    <nav
      className="navbar"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        padding: "10px 20px",
      }}
    >
      {isMobile ? (
        <MobileNavbar
          user={user}
          handleLogout={handleLogout}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
        />
      ) : (
        <DesktopNavbar
          user={user}
          handleLogout={handleLogout}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
        />
      )}
    </nav>
  );
};

const UserMenu = ({ user, handleLogout, dropdownOpen, toggleDropdown }) => (
  <div className="d-flex align-items-center" style={{ gap: "15px" }}>
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
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              zIndex: 1000,
            }}
          >
            <Link
              to="/profile"
              className="dropdown-item"
              style={{
                color: "#333",
                backgroundColor: "#fff",
                textDecoration: "none",
                padding: "10px",
              }}
            >
              Profile
            </Link>
            <div
              className="dropdown-item"
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                color: "#d9534f",
                backgroundColor: "#fff",
                padding: "10px",
                textDecoration: "none",
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    ) : (
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ gap: "15px" }}
      >
        <Link className="nav-link" to="/login" style={linkStyle}>
          Login
        </Link>
        <Link className="nav-link" to="/register" style={linkStyle}>
          Register
        </Link>
      </div>
    )}
  </div>
);

const linkStyle = {
  color: "#333",
  padding: "10px 15px",
  borderRadius: "5px",
  border: "1px solid #333",
  textAlign: "center",
  textDecoration: "none",
  transition: "background-color 0.2s",
};

const DesktopNavbar = ({
  user,
  handleLogout,
  dropdownOpen,
  toggleDropdown,
}) => (
  <div
    className="d-flex justify-content-between align-items-center"
    style={{ width: "100%" }}
  >
    <Link
      className="navbar-brand"
      to="/"
      style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}
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
        <Link className="nav-link" to="/explore">
          Explore
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

const MobileNavbar = ({ user, handleLogout, dropdownOpen, toggleDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

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
      <Link
        className="navbar-brand mx-auto"
        to="/"
        style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}
      >
        Fynura
      </Link>
      <UserMenu
        user={user}
        handleLogout={handleLogout}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
      />

      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "0" : "-250px",
          width: "250px",
          height: "100vh",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "2px 0 12px rgba(0, 0, 0, 0.1)",
          transition: "left 0.3s ease",
          zIndex: 999,
        }}
      >
        <ul className="navbar-nav" style={{ listStyle: "none", padding: 0 }}>
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <Link
              className="nav-link"
              to="/"
              style={{ color: "#333", padding: "10px", display: "block" }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <Link
              className="nav-link"
              to="/explore"
              style={{ color: "#333", padding: "10px", display: "block" }}
            >
              Explore
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <Link
              className="nav-link"
              to="/projects/dashboard"
              style={{ color: "#333", padding: "10px", display: "block" }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <Link
              className="nav-link"
              to="/community"
              style={{ color: "#333", padding: "10px", display: "block" }}
            >
              Community
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for clicking outside to close */}
      {isOpen && (
        <div
          onClick={toggleHamburger}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
