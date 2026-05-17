import Button from './Button.jsx';
import Card from './Card.jsx';
import IngredientFields from './IngredientFields.jsx';
import StatusMessage from './StatusMessage.jsx';

function formatAmount(quantity, unit) {
  const parts = [quantity, unit].filter((part) => part != null && String(part).trim() !== '');
  return parts.length > 0 ? parts.join(' ') : '—';
}

export default function IngredientSection({
  ingredients,
  editingIngredient,
  setEditingIngredient,
  ingredientForm,
  setIngredientForm,
  saving,
  onCreate,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="ingredient-section">
      <Card title="Ingredients">
        {ingredients.length === 0 ? (
          <StatusMessage variant="empty" title="No ingredients yet">
            Add ingredients below to build this recipe.
          </StatusMessage>
        ) : (
          <ul className="ingredient-list">
            {ingredients.map((ingredient) => (
              <li className="ingredient-list__item" key={ingredient.id}>
                {editingIngredient?.id === ingredient.id ? (
                  <form className="ingredient-list__edit" onSubmit={onUpdate}>
                    <IngredientFields
                      values={editingIngredient}
                      onChange={setEditingIngredient}
                      idPrefix={`edit-${ingredient.id}`}
                    />
                    <div className="button-row">
                      <Button type="submit" disabled={saving}>
                        Save
                      </Button>
                      <Button type="button" variant="ghost" onClick={() => setEditingIngredient(null)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="ingredient-list__row">
                    <div className="ingredient-list__info">
                      <span className="ingredient-list__name">{ingredient.name}</span>
                      <span className="ingredient-list__amount">
                        {formatAmount(ingredient.quantity, ingredient.unit)}
                      </span>
                    </div>
                    <div className="button-row">
                      <Button type="button" variant="secondary" onClick={() => setEditingIngredient(ingredient)}>
                        Edit
                      </Button>
                      <Button type="button" variant="danger" onClick={() => onDelete(ingredient.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Add ingredient">
        <form className="stack" onSubmit={onCreate}>
          <IngredientFields
            values={ingredientForm}
            onChange={setIngredientForm}
            idPrefix="new-ingredient"
          />
          <Button type="submit" disabled={saving}>
            {saving ? 'Adding…' : 'Add ingredient'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
