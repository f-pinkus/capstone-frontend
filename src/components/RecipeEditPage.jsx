export function RecipeEditPage({ formData, setFormData, handleInputChange, handleSubmit, onCancel }) {
  return (
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

        <button
          type="submit"
          className="btn fw-semibold me-3"
          style={{
            backgroundColor: "#800020",
            color: "white",
            borderRadius: "12px",
            padding: "0.5rem 1.25rem",
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary fw-semibold"
          onClick={onCancel}
          style={{ borderRadius: "12px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
