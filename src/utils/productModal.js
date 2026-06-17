import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { formatPrice } from './formatPrice';

const MySwal = withReactContent(Swal);

const buildProductTags = (product) => {
    const tags = [`<span style="background: rgba(2, 136, 209, 0.1); color: #0288D1; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${product.type}</span>`];

    if (product.size) {
        tags.push(`<span style="background: rgba(107, 114, 128, 0.1); color: #4B5563; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">Talla ${product.size}</span>`);
    }

    if (product.weightRange) {
        tags.push(`<span style="background: rgba(107, 114, 128, 0.1); color: #4B5563; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${product.weightRange}</span>`);
    }

    return tags.join('');
};

/**
 * Muestra el modal SweetAlert con el detalle del producto y permite agregarlo al carrito.
 * @param {object} product - Datos del producto
 * @param {function} addToCart - Función del contexto para agregar al carrito
 */
export const showProductModal = (product, addToCart) => {
    MySwal.fire({
        title: `<h3 style="margin:0; font-size: 1.5rem; color: #1F2937;">${product.name}</h3>`,
        html: `
            <div style="text-align: left; padding: 10px 0;">
                <div style="text-align: center; margin-bottom: 20px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E5E7EB;">
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 200px; object-fit: contain;" />
                </div>
                <div style="display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap;">
                    ${buildProductTags(product)}
                </div>
                <p style="color: #4B5563; font-size: 0.95rem; line-height: 1.5; margin-bottom: 15px;">${product.longDescription || product.description}</p>
                ${product.features ? `<ul style="margin-top: 10px; padding-left: 20px; color: #4B5563; font-size: 0.9rem;">${product.features.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}</ul>` : ''}
                <div style="font-size: 1.4rem; font-weight: 800; color: #1F2937; display: flex; align-items: center; gap: 10px; margin-top: 15px;">
                    ${product.discountPrice ?
                        `<span style="color: #D32F2F;">${formatPrice(product.discountPrice)}</span>
                         <span style="text-decoration: line-through; color: #9CA3AF; font-size: 1rem; font-weight: 500;">${formatPrice(product.price)}</span>`
                        : `<span>${formatPrice(product.price)}</span>`}
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar al Carrito',
        cancelButtonText: 'Cerrar',
        confirmButtonColor: '#D32F2F',
        cancelButtonColor: '#9CA3AF',
        customClass: {
            confirmButton: 'swal-confirm-btn',
            cancelButton: 'swal-cancel-btn',
            popup: 'swal-custom-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            addToCart(product);
            MySwal.fire({
                title: '¡Agregado!',
                text: 'El producto se ha añadido a tu carrito.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
};
