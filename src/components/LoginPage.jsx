import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/login", params)
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);

        setIsLoggedIn(true);
        setCurrentUser(response.data);

        event.target.reset();
        navigate("/home");
      })
      .catch(() => {
        setErrors(["Invalid email or password."]);
      });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "'Nunito', sans-serif", maxWidth: "500px", margin: "0 auto" }}
    >
      <h1 className="mb-4" style={{ color: "#800020", textAlign: "center" }}>Log in to your Account</h1>
      <ul className="text-danger" style={{ textAlign: "left" }}>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" required />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePassword}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" className="auth-button">Login</button>
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
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#800020",
              textDecoration: "underline",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Create one
          </a>
          !
        </p>

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
