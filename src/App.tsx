import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import Logo from "/favicon.png";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

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
            <span className="fs-3 text-uppercase fw-bold">
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
    </>
  );
}

export default App;
