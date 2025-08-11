import { Link, useLocation } from "react-router-dom";
import { HeaderDropdown } from "./HeaderDropdown";

export function Header({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const isRecipesPage = location.pathname === "/recipes";
  const isHomePage = location.pathname === "/home";
  const isFavoritesPage = location.pathname === "/favorite_recipes";
  const isMyRecipesPage= location.pathname === "/my_recipes"

  return (
    <header
      className="py-3 mb-4"
      style={{ backgroundColor: "#FAFAF7", borderBottom: "1px solid #ddd" }}
    >
      <nav
        className="container d-flex align-items-center justify-content-between position-relative"
        style={{ minHeight: "50px" }}
      >
        {/* Left: Logo */}
        <Link to="/" className="brand-link d-flex align-items-center gap-2">
          <img
            src="/capstone-logo.svg"
            alt="BiteShare Logo"
            width={32}
            height={32}
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
            isMyRecipesPage={location.pathname === "/my_recipes"}
          />
        </div>
      </nav>

      <style>{`
        .brand-link {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
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
          border-radius: 12px;
          padding: 0.375rem 0.75rem;
          text-decoration: none;
          transition: background-color 0.3s ease;
          font-weight: 600;
        }
        .nav-button-link:hover {
          background-color: #660018;
          color: white;
        }

        /* Center the middle button perfectly */
        .center-button-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Ensure right dropdown stays aligned */
        .dropdown-wrapper {
          margin-left: auto;
        }
      `}</style>
    </header>
  );
}
