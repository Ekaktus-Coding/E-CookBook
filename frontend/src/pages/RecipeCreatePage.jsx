import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/api.js';
import BackLink from '../components/BackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import RecipeForm from '../components/RecipeForm.jsx';

function RecipeCreatePage() {
  const [recipe, setRecipe] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createRecipe(recipe);
      navigate('/recipes');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <BackLink to="/recipes">All recipes</BackLink>
      <PageHeader title="New recipe" description="Add a recipe you can fill with ingredients later." />

      <RecipeForm
        values={recipe}
        onChange={setRecipe}
        onSubmit={handleSubmit}
        submitLabel="Save recipe"
        loadingLabel="Saving…"
        loading={loading}
        error={error}
        cancelTo="/recipes"
      />
    </div>
  );
}

export default RecipeCreatePage;
