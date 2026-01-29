import { Link } from "react-router-dom";
import { useState } from "react";

export function RecipesIndex({ recipes }) {
  const [searchFilter, setSearchFilter] = useState("");

  const difficultyStyles = {
    easy: {
      className: "bg-success text-white",
    },
    medium: {
      className: "bg-warning text-white",
      style: { backgroundColor: "#D4A017" },
    },
    hard: {
      className: "bg-danger text-white",
      style: { backgroundColor: "#C1440E" },
    },
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const search = searchFilter.toLowerCase();
    return (
      recipe.title?.toLowerCase().includes(search) ||
      recipe.submitted_by?.toLowerCase().includes(search)
    );
  });

  return (
    <div
      className="min-vh-100 py-5"
      style={{ backgroundColor: "#FAFAF7", fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="container">
        <header className="text-center mb-5">


          <div className="mx-auto position-relative" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              className="form-control rounded-pill shadow-sm px-4"
              placeholder="Search recipes..."
              value={searchFilter}
              onChange={(event) => setSearchFilter(event.target.value)}
              style={{
                border: "2px solid #800020",
                fontFamily: "'Nunito', sans-serif",
                paddingRight: "3 rem",
              }}
            />

            <div
              className="position-absolute top-50 translate-middle-y"
              style={{ right: "4px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#800020",
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-search text-white"></i>
              </div>
            </div>
          </div>


        </header>

        {filteredRecipes.length === 0 ? (
          <p className="text-center text-muted fs-5">
            No recipes match your search.
          </p>
        ) : (
          <div className="row g-4">
            {filteredRecipes.map((recipe) => {
              const diff = recipe.difficulty?.toLowerCase() || "";
              const diffStyle = difficultyStyles[diff] || {
                className: "bg-secondary text-white",
              };

              return (
                <div key={recipe.id} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card shadow-sm h-100 rounded-4 border-0">
                    <img
                      src={recipe.photo_url}
                      className="card-img-top rounded-top-4"
                      alt={recipe.title}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: "#800020",
                        }}
                      >
                        {recipe.title}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Submitted By: {recipe.submitted_by}
                      </h6>

                      <span
                        className={`badge ${diffStyle.className} mb-3`}
                        style={{
                          fontSize: "0.85rem",
                          borderRadius: "9999px",
                          ...diffStyle.style,
                        }}
                      >
                        {recipe.difficulty}
                      </span>

                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="btn btn-maroon mt-auto fw-semibold"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>
        {`
          .btn-maroon {
            background-color: #800020;
            color: white;
            border-radius: 12px;
            transition: background-color 0.3s ease;
          }
          .btn-maroon:hover {
            background-color: #660018;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
