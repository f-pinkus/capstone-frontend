import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function RecipeShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    submitted_by: "",
    ingredients: "",
    instructions: "",
    difficulty: "",
    photo_url: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setFormData({
          title: response.data.title || "",
          submitted_by: response.data.submitted_by || "",
          ingredients: response.data.ingredients || "",
          instructions: response.data.instructions || "",
          difficulty: response.data.difficulty || "",
          photo_url: response.data.photo_url || "",
        });
      })
      .catch(() => setError("Recipe not found."));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    axios.delete(`/recipes/${id}`).then(() => {
      navigate("/recipes");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`/recipes/${id}`, formData)
      .then((response) => {
        setRecipe(response.data);
        setEditing(false);
      })
      .catch(() => alert("Error updating recipe."));
  };

  if (error)
    return (
      <div className="container py-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  if (!recipe)
    return (
      <div className="container py-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#FAFAF7", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}
    >
      <button
        onClick={() => navigate("/recipes")}
        className="btn btn-outline-secondary mb-4"
      >
        &larr; Back to All Recipes
      </button>

      {!editing ? (
        <div
          className="card shadow-sm p-4 rounded-4 border-0"
          style={{ backgroundColor: "#fff" }}
        >
          <h1
            style={{ fontFamily: "'Playfair Display', serif", color: "#800020" }}
            className="mb-3"
          >
            {recipe.title}
          </h1>
          <p className="text-muted mb-1">
            <strong>Submitted by:</strong> {recipe.submitted_by}
          </p>
          <p className="mb-2">
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
          <p className="mb-2">
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
          <p className="mb-3">
            <strong>Difficulty:</strong>{" "}
            <span
              className={`badge ${
                recipe.difficulty.toLowerCase() === "easy"
                  ? "bg-success"
                  : recipe.difficulty.toLowerCase() === "medium"
                  ? "bg-warning text-dark"
                  : recipe.difficulty.toLowerCase() === "hard"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
              style={{ fontSize: "1rem", borderRadius: "9999px", padding: "0.35em 0.75em" }}
            >
              {recipe.difficulty}
            </span>
          </p>
          {recipe.photo_url && (
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="img-fluid rounded-4 mb-4"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          )}

          <div className="d-flex gap-3">
            <button
              className="btn btn-maroon fw-semibold"
              onClick={() => setEditing(true)}
              style={{ borderRadius: "12px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#660018")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#800020")}
            >
              Edit
            </button>
            <button className="btn btn-outline-danger fw-semibold" onClick={handleDelete} style={{ borderRadius: "12px" }}>
              Delete
            </button>
          </div>

          <style>
            {`
              .btn-maroon {
                background-color: #800020;
                color: white;
                transition: background-color 0.3s ease;
              }
              .btn-maroon:hover {
                background-color: #660018;
                color: white;
              }
            `}
          </style>
        </div>
      ) : (
        <div
          className="card shadow-sm p-4 rounded-4 border-0"
          style={{ backgroundColor: "#fff" }}
        >
          <h2
            style={{ fontFamily: "'Playfair Display', serif", color: "#800020" }}
            className="mb-4"
          >
            Edit Recipe
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            {/* Submitted by */}
            <div className="mb-3">
              <label htmlFor="submitted_by" className="form-label fw-semibold">
                Submitted by
              </label>
              <input
                id="submitted_by"
                name="submitted_by"
                value={formData.submitted_by}
                onChange={(e) =>
                  setFormData({ ...formData, submitted_by: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            {/* Ingredients */}
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label fw-semibold">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData({ ...formData, ingredients: e.target.value })
                }
                className="form-control"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Instructions */}
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label fw-semibold">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
                className="form-control"
                rows={5}
                required
              ></textarea>
            </div>

            {/* Difficulty */}
            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label fw-semibold">
                Difficulty
              </label>
              <input
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="form-control"
                placeholder="easy, medium, or hard"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label htmlFor="photo_url" className="form-label fw-semibold">
                Photo URL
              </label>
              <input
                id="photo_url"
                name="photo_url"
                value={formData.photo_url}
                onChange={(e) =>
                  setFormData({ ...formData, photo_url: e.target.value })
                }
                className="form-control"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <button
              type="submit"
              className="btn btn-maroon px-4 py-2 fw-semibold me-3"
              style={{ borderRadius: "12px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#660018")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#800020")}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary fw-semibold"
              onClick={() => setEditing(false)}
              style={{ borderRadius: "12px" }}
            >
              Cancel
            </button>

            <style>
              {`
                .btn-maroon {
                  background-color: #800020;
                  color: white;
                  transition: background-color 0.3s ease;
                }
                .btn-maroon:hover {
                  background-color: #660018;
                  color: white;
                }
              `}
            </style>
          </form>
        </div>
      )}
    </div>
  );
}
