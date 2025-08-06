import { useState, useEffect } from "react";
import axios from "axios";
import { RecipesNew } from "./RecipesNew";

export function RecipesNewPage() {
  const [_recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleCreate = (params, successCallback) => {
    axios.post("/recipes", params).then((response) => {
      setRecipes((prev) => [...prev, response.data]);
      successCallback();
      // Optionally, you can navigate after creation here if you add useNavigate
    });
  };

  return (
    <main>
      <RecipesNew onCreate={handleCreate} />
    </main>
  );
}
