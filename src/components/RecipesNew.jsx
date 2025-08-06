export function RecipesNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const params = new FormData(form);
    const successCallback = () => form.reset();
    onCreate(params, successCallback);
  };

  return (
    <div>
      <h1>New Recipe</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input name="title" type="text" id="title" required />
        </div>

        <div>
          <label htmlFor="submitted_by">Submitted By:</label>
          <input name="submitted_by" type="text" id="submitted_by" required />
        </div>

        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea name="ingredients" id="ingredients" required />
        </div>

        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea name="instructions" id="instructions" required />
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <input name="difficulty" type="text" id="difficulty" required />
        </div>

        <div>
          <label htmlFor="photo_url">Photo URL:</label>
          <input name="photo_url" type="text" id="photo_url" />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
