import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center animate-fade-slide"
      style={{ backgroundColor: "#FAFAF7", fontFamily: "'Nunito', sans-serif" }}
    >
      <img
        src="/capstone-logo.svg"
        alt="BiteShare Logo"
        width={80}
        className="mb-3"
        style={{ animation: "fadeIn 1s ease-in-out" }}
      />
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "#800020",
          animation: "fadeInUp 1.2s ease-in-out",
        }}
      >
        Welcome to BiteShare
      </h1>
      <p
        className="text-secondary mb-4 fs-5"
        style={{ animation: "fadeInUp 1.4s ease-in-out" }}
      >
        Share what you cook. Discover what you crave.
      </p>

      <div
        className="d-flex gap-3 flex-wrap justify-content-center"
        style={{ animation: "fadeInUp 1.6s ease-in-out" }}
      >
        <Link to="/recipes" className="btn btn-maroon fw-semibold px-4 py-2 animated-btn">
          Browse Recipes
        </Link>
        <Link to="/recipes/new" className="btn btn-maroon fw-semibold px-4 py-2 animated-btn">
          Upload Recipe
        </Link>
      </div>

      <style>
        {`
          .btn-maroon {
            background-color: #800020;
            color: white;
            border-radius: 12px;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          }

          .btn-maroon:hover {
            background-color: #660018;
            color: white; /* Ensures text stays white */
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(102, 0, 24, 0.3);
            text-decoration: none;
          }

          /* Entry Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-slide {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
