import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import Logo from "/favicon.png";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterBy from "./components/FilterBy";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <header className="navbar bg-light shadow-sm">
        <div className="container-fluid d-flex justify-content-center">
          <a className="navbar-brand d-flex align-items-center gap-3" href="#">
            <img
              src={Logo}
              alt="Logo"
              width="50"
              className="d-inline-block align-text-top"
            />
            <span className="fs-3 text-uppercase fw-bold text-center text-wrap">
              Planificador de gastos personales
            </span>
            <img
              src={Logo}
              alt="Logo"
              width="50"
              className="d-inline-block align-text-top"
            />
          </a>
        </div>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      <div className="container mt-5 d-flex justify-content-center">
        {isValidBudget && <FilterBy/>}
      </div>

      {isValidBudget && (
        <div className="container mt-5 d-flex justify-content-center">
          <ExpenseModal />
          <ExpenseList />
        </div>
      )}
    </>
  );
}

export default App;
