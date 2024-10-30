import { formatearCantidad } from "../helpers";

type AmountDisplayProps = {
  label: string;
  amount: number;
};

const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <p className="fw-medium fs-5">
      {label}: {""}
      <span className="fw-bold fs-4 ">{formatearCantidad(amount)}</span>
    </p>
  );
};

export default AmountDisplay;
