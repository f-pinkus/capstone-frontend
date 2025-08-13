import { useState, useEffect } from "react";
import axios from "axios";

export function FavoriteButton({ recipeId, initialFavorited }) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [animate, setAnimate] = useState(false);

  const toggleFavorite = async () => {
    try {
      if (favorited) {
        await axios.delete("/favorites", { data: { recipe_id: recipeId } });
      } else {
        await axios.post("/favorites", { recipe_id: recipeId });
      }
      setFavorited(!favorited);
      setAnimate(true); 
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      alert("Could not update favorites. Please try again.");
    }
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const maroon = "#800020";
  const lightGray = "#ccc";

  return (
    <>
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }

          .pop-animation {
            animation: pop 0.3s ease forwards;
          }
        `}
      </style>

      <button
        onClick={toggleFavorite}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        title={favorited ? "Unfavorite" : "Favorite"}
        className={animate ? "pop-animation" : ""}
        style={{
          borderRadius: "50%",
          width: "38px",
          height: "38px",
          border: `2px solid ${favorited ? maroon : lightGray}`,
          backgroundColor: favorited ? "#ffe6e6" : "transparent",
          cursor: "pointer",
          marginLeft: "8px",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s ease, background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = maroon;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = favorited ? maroon : lightGray;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={favorited ? maroon : lightGray}
          width="20px"
          height="20px"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
          4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
          3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
          11.54L12 21.35z" />
        </svg>
      </button>
    </>
  );
}
