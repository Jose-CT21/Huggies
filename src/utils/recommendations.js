/**
 * Filtra el catálogo de productos basándose en los datos del bebé del usuario.
 * @param {Array} catalog - Catálogo completo de productos
 * @param {object} childData - Datos del bebé (talla de pañal, tipo de piel, edad en meses)
 * @param {number} limit - Límite de productos a retornar
 * @returns {Array} Productos recomendados
 */
export const getRecommendedProducts = (catalog, childData, limit = 4) => {
    if (!childData || childData.skipped) return [];
    const { diaperSize, skinType, ageInMonths } = childData;
    return catalog.filter(product => {
        if (skinType === 'sensitive' || skinType === 'atopic') {
            return (
                (product.size === diaperSize && product.name.includes('Supreme')) ||
                (product.type === 'Toallitas' && product.name.includes('Supreme'))
            );
        }
        if (ageInMonths && ageInMonths >= 12 && product.type === 'Pants') {
            return true;
        }
        return product.size === diaperSize || (product.type === 'Toallitas' && product.size === null);
    }).slice(0, limit);
};
