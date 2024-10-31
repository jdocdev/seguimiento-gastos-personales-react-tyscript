import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

const BudgetTracker = () => {
  const { state, dispatch } = useBudget();
  const totalExpenses = useMemo(
    () =>
      state.expenses.reduce(
        (total, expense) => expense.expenseAmount + total,
        0
      ),
    [state.expenses]
  );
  const remainingBudget = state.budget - totalExpenses;
  const percentage = (totalExpenses / state.budget) * 100 || 0;
  const pathColor = percentage >= 80 ? "#e14e4b" : "#66bb6a";
  return (
    <div className="card shadow-sm" style={{ width: "80rem" }}>
      <div className="card-header">
        <span className="fs-4 text-uppercase fw-medium">
          Análisis del Presupuesto
        </span>
      </div>
      <div className="card-body d-flex gap-3 justify-content-center align-items-center">
        <div className="d-flex justify-content-center py-3">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor: pathColor,
              trailColor: "#42a5f5",
              textSize: 8,
              textColor: pathColor,
            })}
            text={`${percentage}% Gastado`}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <AmountDisplay label="Presupuesto" amount={state.budget} />
          <AmountDisplay label="Disponible" amount={remainingBudget} />
          <AmountDisplay label="Gastado" amount={totalExpenses} />
        </div>
      </div>
      <div className="card-footer text-end">
        <button
          className="btn btn-sm btn-danger-custom text-uppercase fw-medium"
          onClick={() => dispatch({ type: "reset-app" })}
        >
          Reiniciar App
        </button>
      </div>
    </div>
  );
};

export default BudgetTracker;
