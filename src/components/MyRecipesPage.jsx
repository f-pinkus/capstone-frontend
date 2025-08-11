import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function MyRecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  useEffect(() => {
    axios
      .get("/my_recipes", { withCredentials: true })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingRecipes(false));
  }, []);

  if (user === undefined) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="spinner-border text-maroon" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading user info...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="container py-5"
        style={{ fontFamily: "'Nunito', sans-serif", backgroundColor: "#FAFAF7", minHeight: "60vh" }}
      >
        <p className="text-center text-danger fs-5">
          Account not found. <Link to="/signup" className="text-maroon text-decoration-underline">Sign up here</Link>.
        </p>
      </div>
    );
  }

  if (loadingRecipes) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="spinner-border text-maroon" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading your recipes...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#FAFAF7", fontFamily: "'Nunito', sans-serif", minHeight: "60vh" }}
    >
      <h2 className="mb-3" style={{ color: "#800020", fontWeight: "600" }}>
        My Recipes
      </h2>

      {recipes.length > 0 ? (
        <ul className="list-group mb-4" style={{ maxWidth: "600px" }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="list-group-item d-flex justify-content-between align-items-center rounded-3 shadow-sm mb-2"
              style={{ backgroundColor: "white" }}
            >
              <Link
                to={`/recipes/${recipe.id}`}
                className="d-flex align-items-center text-maroon fw-semibold text-decoration-none"
              >
                {recipe.photo_url && (
                  <img
                    src={recipe.photo_url}
                    alt={`${recipe.title} preview`}
                    className="me-3 rounded"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                  />
                )}
                {recipe.title}
              </Link>
              <Link
                to={`/recipes/${recipe.id}`}
                className="btn btn-sm btn-maroon fw-semibold"
                style={{ borderRadius: "12px" }}
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted fs-5">You haven't added any recipes yet.</p>
      )}

      <Link
        to="/recipes/new"
        className="btn btn-maroon fw-semibold px-4 py-2"
        style={{ borderRadius: "12px" }}
      >
        New Recipe
      </Link>

      <style>{`
        .text-maroon {
          color: #800020;
        }
        .text-maroon:hover {
          color: #660018;
          text-decoration: underline;
        }
        .btn-maroon {
          background-color: #800020;
          color: white;
          transition: background-color 0.3s ease;
        }
        .btn-maroon:hover {
          background-color: #660018;
          color: white;
        }
      `}</style>
    </div>
  );
}
