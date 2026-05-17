import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, deleteRecipe } from '../services/api.js';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import Card from '../components/Card.jsx';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    setLoading(true);
    setError('');
    try {
      const result = await getRecipes();
      setRecipes(result.itemList || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await deleteRecipe(id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <PageHeader title="Recipes" description="Browse, create, and manage your recipes.">
        <Button to="/recipes/new">New recipe</Button>
      </PageHeader>

      {loading && (
        <StatusMessage variant="loading" title="Loading recipes">
          Please wait…
        </StatusMessage>
      )}

      {error && (
        <StatusMessage variant="error" title="Something went wrong">
          {error}
        </StatusMessage>
      )}

      {!loading && !error && recipes.length === 0 && (
        <StatusMessage
          variant="empty"
          title="No recipes yet"
          action={<Button to="/recipes/new">Create your first recipe</Button>}
        >
          Start by adding a recipe with a title and description.
        </StatusMessage>
      )}

      {!loading && recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="recipe-card">
              <h2 className="recipe-card__title">
                <Link to={`/recipes/${recipe.id}`}>{recipe.title || 'Untitled recipe'}</Link>
              </h2>
              <p className="recipe-card__description">
                {recipe.description || 'No description yet.'}
              </p>
              <div className="recipe-card__actions button-row">
                <Button to={`/recipes/${recipe.id}`} variant="secondary">
                  View
                </Button>
                <Button to={`/recipes/${recipe.id}/edit`} variant="ghost">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(recipe.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeListPage;
