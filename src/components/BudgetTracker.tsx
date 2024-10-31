import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import Grafico from "/favicon.png";

const BudgetTracker = () => {

  const {state} = useBudget()
  const totalExpenses = useMemo(()=>state.expenses.reduce((total,expense)=>expense.expenseAmount + total,0),[state.expenses])
  const remainingBudget = state.budget-totalExpenses

  return (
    <div className="card shadow-sm" style={{ width: "80rem" }}>
      <div className="card-header">
        <span className="fs-4 text-uppercase fw-medium">
          Análisis del Presupuesto
        </span>
      </div>
      <div className="card-body d-flex gap-3 justify-content-center align-items-center">
        <div className="d-flex justify-content-center py-3">
          <img src={Grafico} alt="Ejemplo de grafica" width="200" />
        </div>
        <div className="d-flex flex-column align-items-center">
          <AmountDisplay label="Presupuesto" amount={state.budget} />
          <AmountDisplay label="Disponible" amount={remainingBudget} />
          <AmountDisplay label="Gastado" amount={totalExpenses} />
        </div>
      </div>
      <div className="card-footer text-end">
        <button className="btn btn-sm btn-danger-custom text-uppercase fw-medium">
          Reiniciar App
        </button>
      </div>
    </div>
  );
};

export default BudgetTracker;
