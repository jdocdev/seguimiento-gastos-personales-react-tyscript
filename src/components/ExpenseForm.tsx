import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {
  const { dispatch } = useBudget();

  return (
    <form className="d-flex flex-column gap-3 mt-3">
      <div>
        <label htmlFor="expenseAmount" className="form-label fw-medium">
          Monto del gasto <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="expenseAmount"
          className="form-control"
          placeholder="12.000"
        />
      </div>

      <div>
        <label htmlFor="expenseCategory" className="form-label fw-medium">
          Categoría del gasto <span className="text-danger">*</span>
        </label>
        <select id="expenseCategory" className="form-select">
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="expenseDate" className="form-label fw-medium">
          Fecha del gasto <span className="text-danger">*</span>
        </label>
        <input type="date" id="expenseDate" className="form-control" />
      </div>

      <div>
        <label htmlFor="expenseDescription" className="form-label fw-medium">
          Descripción del gasto
        </label>
        <input
          type="text"
          id="expenseDescription"
          className="form-control"
          placeholder="Ejm: Café Starbucks"
        />
      </div>

      <div className="d-flex justify-content-end gap-3">
        <button
          type="button"
          className="btn btn-secondary-custom"
          onClick={() => dispatch({ type: "hide-modal" })}
        >
          Cancelar
        </button>
        <input type="submit" value={'Guardar'} className="btn btn-primary-custom"/>
      </div>
    </form>
  );
};

export default ExpenseForm;
