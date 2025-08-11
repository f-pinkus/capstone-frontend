import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUtensils, FaHeart, FaPlus } from "react-icons/fa";

export function Dashboard({ user }) {
  const [_recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  useEffect(() => {
    axios
      .get("/my_recipes", { withCredentials: true })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingRecipes(false));
  }, []);

  if (user === undefined) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}>
        <div className="spinner-border text-maroon" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading user info...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5" style={{ fontFamily: "'Nunito', sans-serif", backgroundColor: "#FAFAF7", minHeight: "60vh" }}>
        <p className="text-center text-danger fs-5">
          Account not found. <Link to="/signup" className="text-maroon text-decoration-underline">Sign up here</Link>.
        </p>
      </div>
    );
  }

  if (loadingRecipes) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh", fontFamily: "'Nunito', sans-serif" }}>
        <div className="spinner-border text-maroon" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading your recipes...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      style={{
        backgroundColor: "#FAFAF7",
        fontFamily: "'Nunito', sans-serif",
        minHeight: "60vh",
      }}
    >
      <h1
        className="mb-5 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#800020",
          fontWeight: "700",
        }}
      >
        Welcome, {user.name}
      </h1>

      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-4">
          <Link to="/my_recipes" className="dashboard-tile text-center p-4 d-block rounded-4 shadow-sm h-100">
            <FaUtensils size={40} className="mb-3 text-maroon" />
            <h5 className="fw-semibold">My Recipes</h5>
          </Link>
        </div>

        <div className="col-12 col-md-4">
          <Link to="/favorite_recipes" className="dashboard-tile text-center p-4 d-block rounded-4 shadow-sm h-100">
            <FaHeart size={40} className="mb-3 text-maroon" />
            <h5 className="fw-semibold">My Favorites</h5>
          </Link>
        </div>

        <div className="col-12 col-md-4">
          <Link to="/recipes/new" className="dashboard-tile text-center p-4 d-block rounded-4 shadow-sm h-100">
            <FaPlus size={40} className="mb-3 text-maroon" />
            <h5 className="fw-semibold">New Recipe</h5>
          </Link>
        </div>
      </div>

      <style>{`
        .text-maroon {
          color: #800020;
        }
        .dashboard-tile {
          background-color: #fff;
          color: #800020;
          border: 1px solid #f0e6e6;
          transition: all 0.25s ease;
        }
        .dashboard-tile:hover {
          background-color: #800020;
          color: white;
          transform: translateY(-3px);
        }
        .dashboard-tile:hover .text-maroon {
          color: white;
        }
      `}</style>
    </div>
  );
}
