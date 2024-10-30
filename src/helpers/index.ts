export const formatearCantidad = (amount: number): string => {
    const formateado = amount.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  
    return formateado;
  };
  