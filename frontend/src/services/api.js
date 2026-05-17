const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || response.statusText || 'Request failed';
    throw new Error(message);
  }
  return payload;
}

export async function getRecipes() {
  return handleResponse(await fetch(`${API_BASE}/recipes`));
}

export async function createRecipe(recipe) {
  return handleResponse(
    await fetch(`${API_BASE}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
  );
}

export async function getRecipe(id) {
  return handleResponse(await fetch(`${API_BASE}/recipes/${id}`));
}

export async function updateRecipe(id, recipe) {
  return handleResponse(
    await fetch(`${API_BASE}/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
  );
}

export async function deleteRecipe(id) {
  return handleResponse(
    await fetch(`${API_BASE}/recipes/${id}`, {
      method: 'DELETE',
    })
  );
}

export async function getIngredientsByRecipe(recipeId) {
  return handleResponse(await fetch(`${API_BASE}/recipes/${recipeId}/ingredients`));
}

export async function createIngredientForRecipe(recipeId, ingredient) {
  return handleResponse(
    await fetch(`${API_BASE}/recipes/${recipeId}/ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredient),
    })
  );
}

export async function updateIngredient(id, ingredient) {
  return handleResponse(
    await fetch(`${API_BASE}/ingredients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredient),
    })
  );
}

export async function deleteIngredient(id) {
  return handleResponse(
    await fetch(`${API_BASE}/ingredients/${id}`, {
      method: 'DELETE',
    })
  );
}
