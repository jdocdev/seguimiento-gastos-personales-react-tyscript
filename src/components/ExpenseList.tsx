import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { formatearCantidad } from "../helpers";
import { categories } from "../data/categories";

const ExpenseList = () => {
  const { state, dispatch } = useBudget();

  const categoryLookup: { [key: string]: { name: string; icon: string } } =
    useMemo(
      () =>
        categories.reduce((acc, category) => {
          acc[category.id] = { name: category.name, icon: category.icon };
          return acc;
        }, {} as { [key: string]: { name: string; icon: string } }),
      []
    );

  const handleEdit = (id: string) => {
    dispatch({ type: "get-expense-by-id", payload: { id } });
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este gasto?"
    );

    if (confirmDelete) {
      dispatch({ type: "remove-expense", payload: { id } });
    } else {
      console.log("Eliminación cancelada");
    }
  };

  const filteredExpense = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.expenseCategory === state.currentCategory
      )
    : state.expenses;

  const isEmpty = useMemo(
    () => filteredExpense.length === 0,
    [filteredExpense]
  );

  return (
    <>
      {isEmpty ? (
        <div
          className="alert alert-light text-center shadow-sm"
          style={{ width: "80rem" }}
          role="alert"
        >
          No hay gastos registrados :)
        </div>
      ) : (
        <div className="card shadow-sm" style={{ width: "80rem" }}>
          <div className="card-header">
            <span className="fs-4 text-uppercase fw-medium">
              Resumen de gastos
            </span>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpense.map((expense) => {
                    const category = categoryLookup[expense.expenseCategory];
                    return (
                      <tr key={expense.id}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar-event me-2 text-warning fs-5"></i>
                            <span>
                              {expense.expenseDate.toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-coin me-2 text-success fs-5"></i>
                            <span>
                              {formatearCantidad(expense.expenseAmount)}
                            </span>
                          </div>
                        </td>
                        <td className="align-middle">
                          {category ? (
                            <div className="d-flex align-items-center">
                              <i className={`${category.icon} me-2`} />
                              <span>{category.name}</span>
                            </div>
                          ) : (
                            "Categoría desconocida"
                          )}
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-journal-text me-2 text-info fs-5"></i>
                            <span>{expense.expenseDescription}</span>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-warning text-uppercase fw-medium"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Editar"
                              onClick={() => handleEdit(expense.id)}
                            >
                              <i className="bi bi-pen fs-5"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger-custom text-uppercase fw-medium"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Eliminar"
                              onClick={() => handleDelete(expense.id)}
                            >
                              <i className="bi bi-trash3 fs-5"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseList;
