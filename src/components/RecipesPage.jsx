import axios from "axios";
import { useState, useEffect } from "react";
import { RecipesIndex } from "./RecipesIndex";
import { RecipesNew } from "./RecipesNew";

export function RecipesPage() {

  const [recipes, setRecipes] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex!");

    axios.get("/recipes").then((response) => {
      console.log(response.data);
      setRecipes(response.data);
    });
  };

  useEffect(handleIndex, []);

  const handleCreate = (params, successCallback) => {
    axios.post("/recipes", params).then((response) => {
      setRecipes([...recipes, response.data]);
      successCallback();
    });
  };

  return (
    <main>
      <RecipesNew onCreate={handleCreate} />
      <RecipesIndex recipes={recipes} />
    </main>
  )
}