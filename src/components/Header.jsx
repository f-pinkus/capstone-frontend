import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isRecipesPage = location.pathname === "/recipes";

  return (
    <header
      className="py-3"
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
              text-decoration: none;
            }
          `}
        </style>
      </nav>
    </header>
  );
}
