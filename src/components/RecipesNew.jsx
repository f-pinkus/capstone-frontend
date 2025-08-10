import React, { useState } from "react";
import { cleanLines } from "../helpers/textUtils";
import { useNavigate } from "react-router-dom";

export function RecipesNew({ onCreate, userName }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    submitted_by: userName || "",
    photo_url: "",
    ingredients: "",
    instructions: "",
    difficulty: "",
  });

  // Clean on blur helper
  const handleBlur = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: cleanLines(prev[field], field === "instructions"),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare cleaned data on submit as backup
    const cleanedData = {
      ...formData,
      ingredients: cleanLines(formData.ingredients, false),
      instructions: cleanLines(formData.instructions, true),
    };

    // Convert cleanedData to FormData for compatibility
    const params = new FormData();
    Object.entries(cleanedData).forEach(([key, val]) => {
      params.append(key, val);
    });

    onCreate(params, () => {
      setFormData({
        title: "",
        submitted_by: userName || "",
        photo_url: "",
        ingredients: "",
        instructions: "",
        difficulty: "",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          required
          autoComplete="off"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="submitted_by" className="form-label fw-semibold">
          Submitted by
        </label>
        <input
          type="text"
          id="submitted_by"
          name="submitted_by"
          value={formData.submitted_by}
          onChange={handleChange}
          className="form-control"
          autoComplete="off"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="photo_url" className="form-label fw-semibold">
          Photo URL
        </label>
        <input
          type="url"
          id="photo_url"
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
          className="form-control"
          placeholder="https://example.com/photo.jpg"
          autoComplete="off"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="ingredients" className="form-label fw-semibold">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          onBlur={() => handleBlur("ingredients")}
          className="form-control"
          rows={5}
          placeholder={`e.g.\n2 eggs\n1 cup flour\n½ tsp salt`}
          required
          style={{ fontFamily: "monospace", lineHeight: "1.5" }}
        />
        <div className="form-text">Enter one ingredient per line.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="instructions" className="form-label fw-semibold">
          Instructions
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          onBlur={() => handleBlur("instructions")}
          className="form-control"
          rows={6}
          placeholder={`e.g.\nPreheat oven to 350°F\nMix dry ingredients\nAdd eggs and stir`}
          required
          style={{ fontFamily: "monospace", lineHeight: "1.5" }}
        />
        <div className="form-text">Enter one step per line.</div>
      </div>

      <div className="mb-4">
        <label htmlFor="difficulty" className="form-label fw-semibold">
          Difficulty
        </label>
        <select
          id="difficulty"
          name="difficulty"
          className="form-select"
          value={formData.difficulty}
          onChange={handleChange}
          required
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

     
      <div className="d-flex gap-3 flex-wrap">
        <button
          type="submit"
          className="btn btn-maroon px-4 py-2 fw-semibold"
          style={{ borderRadius: "12px" }}
        >
          Submit Recipe
        </button>
        <button 
          onClick={() => navigate("/recipes")} className="btn btn-outline-danger fw-semibold" style={{ borderRadius: "12px" }}>cancel
        </button>
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
    </form>
  );
}
