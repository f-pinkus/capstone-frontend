import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ConfirmModal } from "../components/ConfirmModal";

export function RecipeShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const cleanLines = (text, isNumbered = false) => {
  return text
    .split("\n")
    .map((line) => {
      const cleaned = isNumbered
        ? line.replace(/^(\s*\d+[\.\)]|\s*[-*•])\s*/, "")
        : line.replace(/^(\s*[-*•])\s*/, "");
      return cleaned.trim();
    })
    .filter(line => line !== "")  // <== Remove empty lines here
    .join("\n");
};

  const handleInputChange = (field, value) => {
    let cleanedValue = value;
    if (field === "ingredients") {
      cleanedValue = cleanLines(value, false);
    } else if (field === "instructions") {
      cleanedValue = cleanLines(value, true);
    }
    setFormData({ ...formData, [field]: cleanedValue });
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

  const handleDelete = () => {
    axios.delete(`/recipes/${id}`).then(() => {
      navigate("/recipes");
    });
  };

  if (error)
    return (
      <div className="container py-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <p className="text-danger">{error}</p>
      </div>
    );

  if (!recipe)
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}>
        <div className="spinner-border text-maroon mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted fs-5">Cooking up something delicious…</p>
        <style>
          {`.text-maroon { color: #800020; }`}
        </style>
      </div>
    );

  return (
    <div className="container py-5" style={{ backgroundColor: "#FAFAF7", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>
      <button onClick={() => navigate("/recipes")} className="btn btn-outline-secondary mb-4">
        &larr; Back to All Recipes
      </button>

      {!editing ? (
        <div className="card shadow-sm p-4 rounded-4 border-0" style={{ backgroundColor: "#fff" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#800020" }} className="mb-3">{recipe.title}</h1>
          <p className="text-muted mb-1"><strong>Submitted by:</strong> {recipe.submitted_by}</p>

          <div className="mb-4">
            <strong>Ingredients:</strong>
            <ul className="mt-2 ps-4">
              {recipe.ingredients.split("\n").filter(Boolean).map((item, i) => (
                <li key={i} className="mb-1">{item.replace(/^[-*•]\s*/, "")}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong>Instructions:</strong>
            <ol className="mt-2 ps-4">
              {recipe.instructions.split("\n").filter(Boolean).map((step, i) => (
                <li key={i} className="mb-2">{step.replace(/^(\d+[\.\)]|[-*•])\s*/, "")}</li>
              ))}
            </ol>
          </div>

          <p className="mb-3">
            <strong>Difficulty:</strong>{" "}
            <span className={`badge ${
              recipe.difficulty === "easy" ? "bg-success" :
              recipe.difficulty === "medium" ? "bg-warning text-dark" :
              recipe.difficulty === "hard" ? "bg-danger" : "bg-secondary"
            }`} style={{ fontSize: "1rem", borderRadius: "9999px", padding: "0.35em 0.75em" }}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </span>
          </p>

          {recipe.photo_url && (
            <img src={recipe.photo_url} alt={recipe.title} className="img-fluid rounded-4 mb-4" style={{ maxHeight: "700px", objectFit: "cover" }} />
          )}

          <div className="d-flex gap-3 flex-wrap">
            <button className="btn btn-maroon fw-semibold" onClick={() => setEditing(true)} style={{ borderRadius: "12px" }}>Edit</button>
            <button className="btn btn-outline-danger fw-semibold" onClick={() => setShowModal(true)} style={{ borderRadius: "12px" }}>Delete</button>
            <button onClick={() => navigate("/recipes")} className="btn btn-outline-secondary fw-semibold" style={{ borderRadius: "12px" }}>Back</button>
          </div>

          <style>{`
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
      ) : (
        // Editing form
        <div className="card shadow-sm p-4 rounded-4 border-0" style={{ backgroundColor: "#fff" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#800020" }} className="mb-4">Edit Recipe</h2>
          <form onSubmit={handleSubmit}>
            {[
              ["title", "Title", "text"],
              ["submitted_by", "Submitted by", "text"],
              ["photo_url", "Photo URL", "text"],
            ].map(([field, label, type]) => (
              <div key={field} className="mb-3">
                <label htmlFor={field} className="form-label fw-semibold">{label}</label>
                <input
                  id={field}
                  name={field}
                  type={type}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="form-control"
                  required={field !== "photo_url"}
                />
              </div>
            ))}

            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label fw-semibold">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={(e) => handleInputChange("ingredients", e.target.value)}
                className="form-control"
                rows={5}
                required
                placeholder="e.g.\n2 eggs\n1 cup flour\n½ tsp salt"
                style={{ fontFamily: "monospace", lineHeight: "1.5" }}
              />
              <div className="form-text">Enter one ingredient per line.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="instructions" className="form-label fw-semibold">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={(e) => handleInputChange("instructions", e.target.value)}
                className="form-control"
                rows={6}
                required
                placeholder="e.g.\nPreheat oven to 350°F\nMix dry ingredients\nAdd eggs and stir"
                style={{ fontFamily: "monospace", lineHeight: "1.5" }}
              />
              <div className="form-text">Enter one step per line.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label fw-semibold">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button type="submit" className="btn btn-maroon px-4 py-2 fw-semibold me-3" style={{ borderRadius: "12px" }}>
              Save
            </button>
            <button type="button" className="btn btn-outline-secondary fw-semibold" onClick={() => setEditing(false)} style={{ borderRadius: "12px" }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Confirm Modal */}
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this recipe?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
