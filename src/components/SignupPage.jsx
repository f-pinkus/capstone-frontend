import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/signup", params)
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        event.target.reset();
        navigate("/login");
      })
      .catch((error) => {
        setErrors(error.response?.data?.errors || ["Something went wrong."]);
      });
  };

  return (
    <div className="container py-5" style={{ fontFamily: "'Nunito', sans-serif", maxWidth: "500px", margin: "0 auto" }}>
      <h1 className="mb-4" style={{ color: "#800020", textAlign: "center" }}>Create an Account</h1>
      <ul className="text-danger" style={{ textAlign: "left" }}>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" required />
        </div>
        <div className="mb-4">
          <label className="form-label">Confirm Password</label>
          <input name="password_confirmation" type="password" className="form-control" required />
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" className="auth-button">Sign Up</button>
        </div>

        <p
          style={{
            marginTop: "2rem",
            fontFamily: "'Nunito', sans-serif",
            color: "#800020",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          or{" "}
          <a
            href="/recipes"
            style={{
              color: "#800020",
              textDecoration: "underline",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            continue as guest
          </a>
        </p>
      </form>

      <style>{`
        .auth-button {
          background-color: #800020;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        .auth-button:hover {
          background-color: #660018;
        }
      `}</style>
    </div>
  );
}
