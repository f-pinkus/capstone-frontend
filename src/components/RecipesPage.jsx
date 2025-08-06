import axios from "axios";
import { useState, useEffect } from "react";
import { RecipesIndex } from "./RecipesIndex";

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

  return (
    <main>
      <RecipesIndex recipes={recipes} />
    </main>
  )
}