/**
 * Calcula la edad en meses a partir de una fecha de nacimiento.
 * @param {string} dateStr - Fecha en formato string (YYYY-MM-DD)
 * @returns {number|null} Edad en meses o null si no se provee fecha
 */
export const calculateAgeInMonths = (dateStr) => {
    if (!dateStr) return null;
    const birth = new Date(dateStr);
    const now = new Date();
    const diffYears = now.getFullYear() - birth.getFullYear();
    const diffMonths = now.getMonth() - birth.getMonth();
    let totalMonths = diffYears * 12 + diffMonths;
    if (now.getDate() < birth.getDate()) {
        totalMonths--;
    }
    return totalMonths;
};
