import { useEffect, useState } from "react";
import { DraftExpense } from "../types";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import ErrorMessage from "./ErrorMessage";

const ExpenseForm = () => {
  const { dispatch, state } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    expenseAmount: 0,
    expenseCategory: "",
    expenseDate: new Date(),
    expenseDescription: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (state.editingId) {
      const editingExpese = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpese);
    }
  }, [state.editingId]);

  const handleChange = (
    evento:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = evento.target;

    const isAmountField = ["expenseAmount"].includes(name);
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: isAmountField ? Number(value) : value,
      ...(name === "expenseDate" && {
        expenseDate: new Date(value + "T00:00:00"),
      }),
    }));
  };

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (
      !expense.expenseAmount ||
      !expense.expenseCategory ||
      !expense.expenseDate
    ) {
      setError("Debe llenar los campos obligatorios");
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setExpense({
      expenseAmount: 0,
      expenseCategory: "",
      expenseDate: new Date(),
      expenseDescription: "",
    });
  };

  return (
    <form className="d-flex flex-column gap-3 mt-3" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div>
        <label htmlFor="expenseAmount" className="form-label fw-medium">
          Monto del gasto <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="expenseAmount"
          name="expenseAmount"
          className="form-control"
          placeholder="12.000"
          value={expense.expenseAmount}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="expenseCategory" className="form-label fw-medium">
          Categoría del gasto <span className="text-danger">*</span>
        </label>
        <select
          id="expenseCategory"
          name="expenseCategory"
          className="form-select"
          value={expense.expenseCategory}
          onChange={handleChange}
        >
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
        <input
          type="date"
          id="expenseDate"
          name="expenseDate"
          className="form-control"
          value={expense.expenseDate.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="expenseDescription" className="form-label fw-medium">
          Descripción del gasto
        </label>
        <input
          type="text"
          id="expenseDescription"
          name="expenseDescription"
          className="form-control"
          placeholder="Ejm: Café Starbucks"
          value={expense.expenseDescription}
          onChange={handleChange}
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
        <input
          type="submit"
          value={state.editingId ? 'Guardar cambios' : 'Registrar gasto'}
          className="btn btn-primary-custom"
        />
      </div>
    </form>
  );
};

export default ExpenseForm;
