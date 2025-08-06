export function RecipesNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const params = new FormData(form);
    const successCallback = () => form.reset();
    onCreate(params, successCallback);
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#FAFAF7", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}
    >
      <h1
        className="mb-4"
        style={{ fontFamily: "'Playfair Display', serif", color: "#800020" }}
      >
        New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-4 shadow-sm border border-light">
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title:
          </label>
          <input
            name="title"
            type="text"
            id="title"
            className="form-control"
            required
          />
        </div>

        {/* Submitted By */}
        <div className="mb-3">
          <label htmlFor="submitted_by" className="form-label fw-semibold">
            Submitted By:
          </label>
          <input
            name="submitted_by"
            type="text"
            id="submitted_by"
            className="form-control"
            required
          />
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label fw-semibold">
            Ingredients:
          </label>
          <textarea
            name="ingredients"
            id="ingredients"
            className="form-control"
            rows={4}
            required
          />
        </div>

        {/* Instructions */}
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label fw-semibold">
            Instructions:
          </label>
          <textarea
            name="instructions"
            id="instructions"
            className="form-control"
            rows={5}
            required
          />
        </div>

        {/* Difficulty */}
        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label fw-semibold">
            Difficulty:
          </label>
          <input
            name="difficulty"
            type="text"
            id="difficulty"
            className="form-control"
            placeholder="easy, medium, or hard"
            required
          />
        </div>

        {/* Photo URL */}
        <div className="mb-4">
          <label htmlFor="photo_url" className="form-label fw-semibold">
            Photo URL:
          </label>
          <input
            name="photo_url"
            type="text"
            id="photo_url"
            className="form-control"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <button
          type="submit"
          className="btn btn-maroon px-4 py-2 fw-semibold"
          style={{
            borderRadius: "12px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#660018")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#800020")}
        >
          Save
        </button>

        {/* Custom maroon button style */}
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
  );
}
