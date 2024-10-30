import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(evento.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    dispatch({ type: "add-budget", payload: { budget } });
  };

  return (
    <div className="card shadow-sm" style={{ width: "28rem" }}>
      <div className="card-body">
        <form className="py-3" onSubmit={handleSubmit}>
          <div className="mb-3 text-center">
            <label
              htmlFor="budget"
              className="form-label fs-4 text-uppercase fw-medium"
            >
              Definir presupuesto <span className="text-danger">*</span>
            </label>
            <input
              id="budgetID"
              type="number"
              className="form-control"
              name="budget"
              aria-describedby="emailHelp"
              placeholder="Define tu presupuesto"
              value={budget}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            className={`btn text-uppercase w-100 fw-medium ${
              isValid ? "btn-secondary" : "btn-success-custom"
            }`}
            value="Guardar"
            disabled={isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
