import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import axios from "axios";

export function HeaderDropdown({ isLoggedIn, setIsLoggedIn, isHomePage, isFavoritesPage }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  function toggle() {
    setOpen((o) => !o);
  }

  function close() {
    setOpen(false);
  }

  function handleLogout(event) {
    event.preventDefault();
    axios
      .delete("/logout")
      .then(() => {
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        close();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        close();
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const itemBaseStyle = {
    display: "block",
    width: "100%",
    padding: "0.5rem 1rem",
    textAlign: "left",
    background: "transparent",
    border: "none",
    color: "#800000",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
  };

  const hoverOn = (e) => (e.target.style.backgroundColor = "#F4EDEB");
  const hoverOff = (e) => (e.target.style.backgroundColor = "transparent");

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        className="nav-button-link"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        <FaBars size={20} />
      </button>
      {open && (
        <ul
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 0.25rem)",
            background: "#FAFAF7",
            border: "1px solid #E0E0E0",
            borderRadius: "10px",
            minWidth: "180px",
            listStyle: "none",
            margin: 0,
            padding: "0.5rem 0",
            boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            zIndex: 1000,
          }}
        >
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/signup" onClick={close} style={itemBaseStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={close} style={itemBaseStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              {!isHomePage && (
                <li>
                  <Link to="/home" onClick={close} style={itemBaseStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    Dashboard
                  </Link>
                </li>
              )}
              {!isFavoritesPage && (
                <li>
                  <Link
                    to="/favorite_recipes"
                    onClick={close}
                    style={itemBaseStyle}
                    onMouseEnter={hoverOn}
                    onMouseLeave={hoverOff}
                  >
                    Favorites
                  </Link>
                </li>
              )}
              <li>
                <a
                  href="/logout"
                  onClick={handleLogout}
                  style={itemBaseStyle}
                  onMouseEnter={hoverOn}
                  onMouseLeave={hoverOff}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
