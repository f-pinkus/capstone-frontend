import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeModal } from "./WelcomeModal";
import "bootstrap-icons/font/bootstrap-icons.css";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

        setShowModal(true);
      })
      .catch((error) => {
        setErrors(error.response?.data?.errors || ["Something went wrong."]);
      });
  };

  const handleGoToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "'Nunito', sans-serif", maxWidth: "500px", margin: "0 auto" }}
    >
      <h1 className="mb-4" style={{ color: "#800020", textAlign: "center" }}>
        Create an Account
      </h1>
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

        <div className="mb-4">
          <label className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              name="password_confirmation"
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
          <button type="submit" className="auth-button">
            Sign Up
          </button>
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
          Already a member?{" "}
          <a
            href="/login"
            style={{
              color: "#800020",
              textDecoration: "underline",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Log in
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

      {showModal && (
        <WelcomeModal
          message="Welcome to BiteShare!"
          onClose={handleGoToLogin}
        />
      )}
    </div>
  );
}
