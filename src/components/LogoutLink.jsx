import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LogoutLink({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    axios
      .delete("/logout")
      .then(() => {
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <button onClick={handleClick} className="btn btn-outline-dark">
      Logout
    </button>
  );
}
