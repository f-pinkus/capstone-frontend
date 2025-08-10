import { Link, useLocation } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const isRecipesPage = location.pathname === "/recipes";
  const isHomePage = location.pathname === "/home";

  return (
    <header
      className="py-3 mb-4"
      style={{ backgroundColor: "#FAFAF7", borderBottom: "1px solid #ddd" }}
    >
      <nav className="container d-flex justify-content-between align-items-center">
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

        <div>
          {isRecipesPage ? (
            <Link to="/recipes/new" className="nav-button-link">
              New Recipe
            </Link>
          ) : (
            <Link to="/recipes" className="nav-button-link">
              All Recipes
            </Link>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          {isLoggedIn ? (
            <>
              {!isHomePage && (
                <Link to="/home" className="auth-button-link">
                  Dashboard
                </Link>
              )}
              <Link to="/favorite_recipes" className="auth-button-link">
                  Favorites
                </Link>
                <LogoutLink setIsLoggedIn={setIsLoggedIn} />
            </>
          ) : (
            <>
              <Link to="/signup" className="auth-button-link">
                Sign Up
              </Link>
              <Link to="/login" className="auth-button-link">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <style>
        {`
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

          .auth-button-link {
            background-color: transparent;
            color: #800020;
            border: 1px solid #800020;
            border-radius: 8px;
            padding: 0.375rem 0.75rem;
            font-weight: 600;
            text-decoration: none;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          .auth-button-link:hover {
            background-color: #800020;
            color: white;
            text-decoration: none;
          }

          .btn-outline-dark {
            border: 1px solid #800020;
            color: #800020;
            font-weight: 600;
            border-radius: 8px;
            padding: 0.375rem 0.75rem;
            background-color: transparent;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .btn-outline-dark:hover {
            background-color: #800020;
            color: white;
          }
        `}
      </style>
    </header>
  );
}
