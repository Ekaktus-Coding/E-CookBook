import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe, getIngredientsByRecipe } from '../services/api.js';
import BackLink from '../components/BackLink.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatusMessage from '../components/StatusMessage.jsx';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRecipe();
  }, [id]);

  async function loadRecipe() {
    setLoading(true);
    setError('');
    try {
      const [recipeData, ingredientsData] = await Promise.all([
        getRecipe(id),
        getIngredientsByRecipe(id),
      ]);
      setRecipe(recipeData);
      setIngredients(ingredientsData.itemList || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <BackLink to="/recipes">All recipes</BackLink>

      {loading && (
        <StatusMessage variant="loading" title="Loading recipe">
          Please wait…
        </StatusMessage>
      )}

      {error && (
        <StatusMessage variant="error" title="Could not load recipe">
          {error}
        </StatusMessage>
      )}

      {!loading && !error && !recipe && (
        <StatusMessage variant="empty" title="Recipe not found">
          This recipe may have been deleted.
        </StatusMessage>
      )}

      {!loading && recipe && (
        <>
          <PageHeader title={recipe.title || 'Untitled recipe'}>
            <Button to={`/recipes/${id}/edit`}>Edit recipe</Button>
          </PageHeader>

          <Card>
            <h2 className="panel__title">Description</h2>
            <p className="recipe-detail__description">
              {recipe.description || 'No description provided.'}
            </p>
          </Card>

          <Card title="Ingredients">
            {ingredients.length === 0 ? (
              <StatusMessage variant="empty" title="No ingredients">
                Edit this recipe to add ingredients.
              </StatusMessage>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient) => (
                      <tr key={ingredient.id}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.quantity || '—'}</td>
                        <td>{ingredient.unit || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default RecipeDetailPage;
