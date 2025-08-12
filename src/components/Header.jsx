import { Link, useLocation } from "react-router-dom";
import { HeaderDropdown } from "./HeaderDropdown";

export function Header({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const isRecipesPage = location.pathname === "/recipes";
  const isHomePage = location.pathname === "/home";
  const isFavoritesPage = location.pathname === "/favorite_recipes";
  const isMyRecipesPage = location.pathname === "/my_recipes";

  return (
    <header className="main-header">
      <nav className="container d-flex align-items-center justify-content-between position-relative header-nav">
        {/* Left: Logo */}
        <Link to="/" className="brand-link d-flex align-items-center gap-2">
          <img
            src="/capstone-logo.svg"
            alt="BiteShare Logo"
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
          <span>BiteShare</span>
        </Link>

        {/* Center: Button */}
        <div className="center-button-wrapper">
          {isRecipesPage ? (
            <Link to="/recipes/new" className="nav-button-link">
              New Recipe
            </Link>
          ) : (
            <Link to="/recipes" className="nav-button-link">
              Browse Recipes
            </Link>
          )}
        </div>

        {/* Right: Dropdown */}
        <div className="dropdown-wrapper">
          <HeaderDropdown
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isHomePage={isHomePage}
            isFavoritesPage={isFavoritesPage}
            isMyRecipesPage={isMyRecipesPage}
          />
        </div>
      </nav>

      <style>{`
        .main-header {
          background-color: #FAFAF7;
          border-bottom: 1px solid #ddd;
          padding: 0.4rem 0; /* Thinner than original */
        }

        .brand-link {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; /* Slightly smaller */
          color: #800020;
          font-weight: 700;
          text-decoration: none;
        }
        .brand-link:hover {
          color: #660018;
          text-decoration: underline;
        }

        .nav-button-link {
          background-color: #800020;
          color: white;
          border-radius: 10px;
          padding: 0.3rem 0.6rem; /* Less padding */
          text-decoration: none;
          transition: background-color 0.3s ease;
          font-weight: 600;
          white-space: nowrap;
          font-size: 0.9rem; /* Smaller text */
        }
        .nav-button-link:hover {
          background-color: #660018;
          color: white;
        }

        .center-button-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .dropdown-wrapper {
          margin-left: auto;
        }

        /* --- MOBILE STYLES --- */
        @media (max-width: 768px) {
          .header-nav {
            flex-direction: row; /* Keep items in a row instead of stacking */
            justify-content: space-between;
            align-items: center;
            padding: 0 0.6rem;
            min-height: 50px; /* Thinner header */
          }

          .brand-link {
            font-size: 1.3rem; /* Smaller brand text */
          }

          .center-button-wrapper {
            position: static;
            transform: none;
            margin-left: auto;
            margin-right: 0.5rem;
          }

          .nav-button-link {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
          }

          .dropdown-wrapper {
            margin-left: 0;
          }
        }
      `}</style>
    </header>
  );
}
