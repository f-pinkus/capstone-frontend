import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function UserHomePage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  useEffect(() => {
    axios
      .get("/my_recipes", { withCredentials: true })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingRecipes(false));
  }, []);

  if (user === undefined) {
    // User info still loading (should rarely happen here since App waits)
    return <div>Loading user info...</div>;
  }

  if (!user) {
    // Not logged in / no user found
    return (
      <div>
        Account not found. <Link to="/signup">Sign up here</Link>.
      </div>
    );
  }

  if (loadingRecipes) {
    return <div>Loading your recipes...</div>;
  }

  return (
    <div className="container py-4">
      <h1>Welcome, {user.name}</h1>
      <h2>My Recipes</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      ) : (
        <p>You haven't added any recipes yet.</p>
      )}
    </div>
  );
}
