import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getRecipe,
  getIngredientsByRecipe,
  updateRecipe,
  createIngredientForRecipe,
  updateIngredient,
  deleteIngredient,
} from '../services/api.js';
import BackLink from '../components/BackLink.jsx';
import IngredientSection from '../components/IngredientSection.jsx';
import PageHeader from '../components/PageHeader.jsx';
import RecipeForm from '../components/RecipeForm.jsx';
import StatusMessage from '../components/StatusMessage.jsx';

function RecipeEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ title: '', description: '' });
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [ingredientForm, setIngredientForm] = useState({ name: '', quantity: '', unit: '' });
  const [editingIngredient, setEditingIngredient] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const [recipeData, ingredientData] = await Promise.all([
        getRecipe(id),
        getIngredientsByRecipe(id),
      ]);
      setRecipe({ title: recipeData.title || '', description: recipeData.description || '' });
      setIngredients(ingredientData.itemList || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRecipeSave(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateRecipe(id, recipe);
      navigate(`/recipes/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleIngredientCreate(event) {
    event.preventDefault();
    if (!ingredientForm.name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const newIngredient = await createIngredientForRecipe(id, { ...ingredientForm });
      setIngredients((prev) => [...prev, newIngredient]);
      setIngredientForm({ name: '', quantity: '', unit: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleIngredientUpdate(event) {
    event.preventDefault();
    if (!editingIngredient) return;
    setSaving(true);
    setError('');
    try {
      const updatedIngredient = await updateIngredient(editingIngredient.id, {
        name: editingIngredient.name,
        quantity: editingIngredient.quantity,
        unit: editingIngredient.unit,
      });
      setIngredients((current) =>
        current.map((item) => (item.id === updatedIngredient.id ? updatedIngredient : item))
      );
      setEditingIngredient(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleIngredientDelete(ingredientId) {
    if (!window.confirm('Delete this ingredient?')) return;
    setSaving(true);
    setError('');
    try {
      await deleteIngredient(ingredientId);
      setIngredients((current) => current.filter((item) => item.id !== ingredientId));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <BackLink to={`/recipes/${id}`}>Back to recipe</BackLink>
      <PageHeader title="Edit recipe" description="Update the recipe details and manage its ingredients." />

      {loading && (
        <StatusMessage variant="loading" title="Loading">
          Fetching recipe and ingredients…
        </StatusMessage>
      )}

      {error && !loading && (
        <StatusMessage variant="error" title="Something went wrong">
          {error}
        </StatusMessage>
      )}

      {!loading && (
        <>
          <RecipeForm
            values={recipe}
            onChange={setRecipe}
            onSubmit={handleRecipeSave}
            submitLabel="Save recipe"
            loadingLabel="Saving…"
            loading={saving}
            cancelTo={`/recipes/${id}`}
          />

          <IngredientSection
            ingredients={ingredients}
            editingIngredient={editingIngredient}
            setEditingIngredient={setEditingIngredient}
            ingredientForm={ingredientForm}
            setIngredientForm={setIngredientForm}
            saving={saving}
            onCreate={handleIngredientCreate}
            onUpdate={handleIngredientUpdate}
            onDelete={handleIngredientDelete}
          />
        </>
      )}
    </div>
  );
}

export default RecipeEditPage;
