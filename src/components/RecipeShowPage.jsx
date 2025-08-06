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

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate("/recipes")}>Back to All Recipes</button>

      {!editing ? (
        <div>
          <h1>{recipe.title}</h1>
          <p>Submitted by: {recipe.submitted_by}</p>
          <p>Ingredients: {recipe.ingredients}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Difficulty: {recipe.difficulty}</p>
          {recipe.photo_url && (
            <img src={recipe.photo_url} alt={recipe.title} />
          )}
          <div>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Edit Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Submitted by</label>
              <input
                name="submitted_by"
                value={formData.submitted_by}
                onChange={(e) => setFormData({ ...formData, submitted_by: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Ingredients</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                required
              ></textarea>
            </div>
            <div>
              <label>Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                required
              ></textarea>
            </div>
            <div>
              <label>Difficulty</label>
              <input
                name="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Photo URL</label>
              <input
                name="photo_url"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
