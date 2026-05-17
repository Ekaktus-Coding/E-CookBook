import Button from './Button.jsx';
import Card from './Card.jsx';
import FormField from './FormField.jsx';
import StatusMessage from './StatusMessage.jsx';

export default function RecipeForm({
  values,
  onChange,
  onSubmit,
  submitLabel,
  loadingLabel,
  loading,
  error,
  cancelTo,
}) {
  const update = (field) => (event) => onChange({ ...values, [field]: event.target.value });

  return (
    <Card>
      <form className="stack" onSubmit={onSubmit}>
        <FormField label="Title" id="recipe-title" hint="A short name for the recipe.">
          <input
            id="recipe-title"
            value={values.title}
            onChange={update('title')}
            placeholder="e.g. Tomato soup"
            required
          />
        </FormField>

        <FormField label="Description" id="recipe-description" hint="Optional steps or notes.">
          <textarea
            id="recipe-description"
            value={values.description}
            onChange={update('description')}
            rows="5"
            placeholder="Describe how to prepare this recipe…"
          />
        </FormField>

        {error && (
          <StatusMessage variant="error" title="Could not save">
            {error}
          </StatusMessage>
        )}

        <div className="button-row">
          <Button type="submit" disabled={loading}>
            {loading ? loadingLabel : submitLabel}
          </Button>
          {cancelTo && (
            <Button to={cancelTo} variant="ghost">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
