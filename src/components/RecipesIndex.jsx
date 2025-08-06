import { Link } from "react-router-dom";
export function RecipesIndex({ recipes }) {
  return (
    <div>
      <h1>All Recipes</h1>
      <h4>({recipes.length} total)</h4>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.photo_url} />
          <h4>Submitted By: {recipe.submitted_by}</h4>
          <h5>Difficulty: {recipe.difficulty.toUpperCase()}</h5>
          <Link to={`/recipes/${recipe.id}`}>
            View Recipe
          </Link>
        </div>
      ))}
    </div>
  );
}