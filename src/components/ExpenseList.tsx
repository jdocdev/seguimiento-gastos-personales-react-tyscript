import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { formatearCantidad } from "../helpers";
import { categories } from "../data/categories";

const ExpenseList = () => {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  // Definimos el tipo de categoryLookup para evitar `any`
  const categoryLookup: { [key: string]: { name: string; icon: string } } =
    useMemo(
      () =>
        categories.reduce((acc, category) => {
          acc[category.id] = { name: category.name, icon: category.icon };
          return acc;
        }, {} as { [key: string]: { name: string; icon: string } }),
      []
    );

  return (
    <>
      {isEmpty ? (
        <div
          className="alert alert-light text-center shadow-sm"
          style={{ width: "40rem" }}
          role="alert"
        >
          No hay gastos registrados :)
        </div>
      ) : (
        <div className="card shadow-sm" style={{ width: "40rem" }}>
          <div className="card-header">
            <span className="fs-4 text-uppercase fw-medium">
              Resumen de gastos
            </span>
          </div>
          <div className="card-body">
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
                {state.expenses.map((expense) => {
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
                        <div className="d-flex align-items-center">

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseList;
