import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function FavoritesPage({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/favorite_recipes", { withCredentials: true })
      .then((res) => setFavorites(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load favorites.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (user === undefined) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}
      >
        <div
          className="spinner-border text-maroon"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
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
          Account not found.{" "}
          <Link to="/signup" className="text-maroon text-decoration-underline">
            Sign up here
          </Link>
          .
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}
      >
        <div
          className="spinner-border text-maroon"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading your favorites...</span>
        </div>
      </div>
    );
  }

  const removeFavorite = async (recipeId) => {
    try {
      await axios.delete("/favorites", { data: { recipe_id: recipeId } });
      setFavorites((prev) => prev.filter((r) => r.id !== recipeId));
    } catch {
      alert("Failed to remove favorite");
    }
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#FAFAF7", fontFamily: "'Nunito', sans-serif", minHeight: "60vh" }}
    >
      <h2 className="mb-3" style={{ color: "#800020", fontWeight: "600" }}>
        My Favorites
      </h2>

      {error && <p className="text-danger">{error}</p>}

      {favorites.length > 0 ? (
        <ul className="list-group mb-4" style={{ maxWidth: "600px" }}>
          {favorites.map((recipe) => (
            <li
              key={recipe.id}
              className="list-group-item d-flex justify-content-between align-items-center rounded-3 shadow-sm mb-2"
              style={{ backgroundColor: "white" }}
            >
              <div className="d-flex align-items-center" style={{ gap: "12px" }}>
                {recipe.photo_url && (
                  <img
                    src={recipe.photo_url}
                    alt={recipe.title}
                    style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px" }}
                  />
                )}
                <Link to={`/recipes/${recipe.id}`} className="text-maroon fw-semibold text-decoration-none">
                  {recipe.title}
                </Link>
              </div>

              <div className="d-flex gap-2">
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="btn btn-sm btn-maroon fw-semibold"
                  style={{ borderRadius: "12px" }}
                >
                  View
                </Link>

                <button
                  className="btn btn-outline-danger btn-sm"
                  style={{ borderRadius: "12px" }}
                  onClick={() => removeFavorite(recipe.id)}
                  title="Remove from favorites"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted fs-5">You haven't favorited any recipes yet.</p>
      )}

      <Link to="/recipes" className="btn btn-maroon fw-semibold px-4 py-2" style={{ borderRadius: "12px" }}>
        Browse Recipes
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
