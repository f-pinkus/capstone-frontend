import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { RecipesNew } from "./RecipesNew";
import { cleanLines } from "../helpers/textUtils";

export function RecipesNewPage() {
  const [_recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext();

  const userName = localStorage.getItem("name") || "";

  useEffect(() => {
    axios.get("/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleCreate = (params, successCallback) => {
    const plainParams = Object.fromEntries(params);
    const cleanedParams = {
      ...plainParams,
      ingredients: cleanLines(plainParams.ingredients, false),
      instructions: cleanLines(plainParams.instructions, true),
    };

    axios.post("/recipes", cleanedParams).then((response) => {
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
          <RecipesNew onCreate={handleCreate} userName={userName} />
        </div>
      ) : (
        <div
          className="p-5 rounded shadow guest-card"
          style={{
            backgroundColor: "#f9f6f4ff",
            border: "1px solid #ecd7d0",
            textAlign: "center",
            lineHeight: "1.6",
            margin: "0 auto",
          }}
        >
          <h2 className="guest-card-title">Share Your Recipe</h2>
          <p className="guest-card-text">
            Please{" "}
            <Link to="/login" className="auth-link">
              log in
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="auth-link">
              sign up
            </Link>{" "}
            to upload a recipe.
          </p>
          <p className="guest-card-link">
            <Link to="/recipes" className="auth-link">
              Or continue as guest
            </Link>
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

        /* Default desktop size */
        .guest-card {
          max-width: 500px;
        }
        .guest-card-title {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 1.75rem;
          color: #800020;
          margin-bottom: 2rem;
        }
        .guest-card-text {
          font-size: 1.15rem;
          color: #5a3a39;
          margin-bottom: 1.8rem;
        }
        .guest-card-link {
          margin-top: 0;
          font-size: 1.1rem;
        }

        /* Tablet */
        @media (max-width: 992px) {
          .guest-card {
            max-width: 400px;
          }
          .guest-card-title {
            font-size: 1.6rem;
          }
          .guest-card-text,
          .guest-card-link {
            font-size: 1.05rem;
          }
        }

        /* Small tablet / large phone */
        @media (max-width: 768px) {
          .guest-card {
            max-width: 340px;
            padding: 1.5rem !important;
          }
          .guest-card-title {
            font-size: 1.45rem;
          }
          .guest-card-text,
          .guest-card-link {
            font-size: 1rem;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .guest-card {
            max-width: 280px;
            padding: 1.25rem !important;
          }
          .guest-card-title {
            font-size: 1.3rem;
          }
          .guest-card-text,
          .guest-card-link {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </main>
  );
}
