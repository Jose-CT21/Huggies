/**
 * Formatea un precio en colones costarricenses.
 * @param {number|string} amount - Monto a formatear
 * @returns {string} Precio formateado (e.g., "₡5,950")
 */
export const formatPrice = (amount) => {
    if (amount === undefined || amount === null) return '';
    return `₡${Number(amount).toLocaleString('es-CR')}`;
};
