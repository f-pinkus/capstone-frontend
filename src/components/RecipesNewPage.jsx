import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RecipesNew } from "./RecipesNew";

export function RecipesNewPage() {
  const [_recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleCreate = (params, successCallback) => {
    axios.post("/recipes", params).then((response) => {
      setRecipes((prev) => [...prev, response.data]);
      successCallback();
      navigate(`/recipes/${response.data.id}`);
    });
  };

  return (
    <main>
      <RecipesNew onCreate={handleCreate} />
    </main>
  );
}
