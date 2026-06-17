/**
 * Devuelve la etiqueta amigable para el tipo de piel.
 * @param {string} type - Identificador del tipo de piel (sensitive, atopic, normal)
 * @returns {string} Etiqueta en español
 */
export const getSkinTypeLabel = (type) => {
    switch (type) {
        case 'sensitive':
            return 'Sensible';
        case 'atopic':
            return 'Muy Sensible / Atópica';
        default:
            return 'Normal';
    }
};
