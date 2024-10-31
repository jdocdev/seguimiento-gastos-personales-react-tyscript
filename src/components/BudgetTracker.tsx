import AmountDisplay from "./AmountDisplay";
import Grafico from "/favicon.png";

const BudgetTracker = () => {
  return (
    <div className="card shadow-sm" style={{ width: "40rem" }}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fs-4 text-uppercase fw-medium">
          Análisis del Presupuesto
        </span>
        <button className="btn btn-sm btn-danger-custom text-uppercase fw-medium">
          Reiniciar App
        </button>
      </div>
      <div className="card-body d-flex gap-3 justify-content-center align-items-center">
        <div className="d-flex justify-content-center py-3">
          <img src={Grafico} alt="Ejemplo de grafica" width="200" />
        </div>
        <div className="d-flex flex-column align-items-center">
          <AmountDisplay label="Presupuesto" amount={50000} />
          <AmountDisplay label="Disponible" amount={30000} />
          <AmountDisplay label="Gastado" amount={20000} />
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
