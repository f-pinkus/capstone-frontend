import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { RecipesNew } from "./RecipesNew";

export function RecipesNewPage() {
  const [_recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext();

  useEffect(() => {
    axios.get("/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleCreate = (params, successCallback) => {
    axios.post("/recipes", params).then((response) => {
      setRecipes((prev) => [...prev, response.data]);
      successCallback();
      navigate(`/recipes/${response.data.id}`);
    });
  };

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "85vh",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {isLoggedIn ? (
        <div className="container" style={{ maxWidth: "700px", width: "100%" }}>
          <RecipesNew onCreate={handleCreate} />
        </div>
      ) : (
        <div
          className="p-5 rounded shadow"
          style={{
            backgroundColor: "#f9f6f4ff",
            border: "1px solid #ecd7d0",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            lineHeight: "1.6",
          }}
        >
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: "700",
              fontSize: "1.75rem",
              color: "#800020",
              marginBottom: "2rem",
              marginTop: 0,
            }}
          >
            Share Your Recipe
          </h2>
          <p style={{ fontSize: "1.15rem", color: "#5a3a39", marginBottom: "1.8rem" }}>
            Please{" "}
            <a href="/login" className="auth-link">
              log in
            </a>{" "}
            or{" "}
            <a href="/signup" className="auth-link">
              sign up
            </a>{" "}
            to upload a recipe.
          </p>
          <p style={{ marginTop: 0, fontSize: "1.1rem" }}>
            <a href="/recipes" className="auth-link">
              Or continue as guest
            </a>
          </p>
        </div>
      )}

      <style>{`
        .auth-link {
          color: #800020;
          font-weight: 600;
          text-decoration: underline;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .auth-link:hover {
          color: #660018;
        }
      `}</style>
    </main>
  );
}
