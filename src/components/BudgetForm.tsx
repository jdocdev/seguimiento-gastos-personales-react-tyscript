import { useMemo, useState } from "react";

const BudgetForm = () => {
  const [budget, setBudget] = useState(0);

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(evento.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  return (
    <div className="card shadow-sm" style={{ width: "28rem" }}>
      <div className="card-body">
        <form className="py-3">
          <div className="mb-3 text-center">
            <label htmlFor="budget" className="form-label fs-4 text-uppercase">
              Definir presupuesto
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
            className={`btn text-uppercase w-100 ${
              isValid ? "btn-secondary" : "btn-success"
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
