import { useBudget } from "../hooks/useBudget";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseModal() {
  const { state, dispatch } = useBudget();

  return (
    <>
      <div
        className="position-fixed d-flex align-items-center justify-content-center"
        style={{ right: "1.25rem", bottom: "1.25rem" }}
      >
        <button
          type="button"
          onClick={() => dispatch({ type: "show-modal" })}
          className="d-flex align-items-center gap-2 btn text-uppercase w-100 fw-medium btn-primary-custom"
        >
          <span>Nuevo</span>
          <i className="bi bi-plus-circle fs-3"></i>
        </button>
      </div>

      {state.modal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.75)" }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-uppercase">
                  Registrar un nuevo gasto
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => dispatch({ type: "hide-modal" })}
                ></button>
              </div>
              <div className="modal-body">
                <ExpenseForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
