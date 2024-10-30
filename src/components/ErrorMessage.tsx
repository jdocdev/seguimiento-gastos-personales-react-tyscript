import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div
      className="alert alert-danger d-flex align-items-center gap-2"
      role="alert"
    >
      <i className="bi bi-stoplights fs-4"></i>
      {children}
      <span className="text-danger">*</span>
    </div>
  );
};

export default ErrorMessage;
