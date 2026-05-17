import FormField from './FormField.jsx';

const UNIT_OPTIONS = ['', 'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'pcs'];

export default function IngredientFields({ values, onChange, idPrefix = 'ingredient' }) {
  const update = (field) => (event) => onChange({ ...values, [field]: event.target.value });
  const unitOptions = UNIT_OPTIONS.includes(values.unit) ? UNIT_OPTIONS : [...UNIT_OPTIONS, values.unit];

  return (
    <div className="ingredient-fields">
      <FormField label="Name" id={`${idPrefix}-name`}>
        <input
          id={`${idPrefix}-name`}
          value={values.name}
          onChange={update('name')}
          placeholder="e.g. Flour"
          required
        />
      </FormField>
      <FormField label="Quantity" id={`${idPrefix}-quantity`}>
        <input
          id={`${idPrefix}-quantity`}
          type="number"
          min="0"
          step="any"
          value={values.quantity}
          onChange={update('quantity')}
          placeholder="e.g. 200"
        />
      </FormField>
      <FormField label="Unit" id={`${idPrefix}-unit`}>
        <select
          id={`${idPrefix}-unit`}
          value={values.unit}
          onChange={update('unit')}
        >
          {unitOptions.map((unit) => (
            <option key={unit || 'empty'} value={unit}>
              {unit || 'No unit'}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}
