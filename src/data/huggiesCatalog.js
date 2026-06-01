/**
 * Catálogo completo de productos Huggies disponibles en Costa Rica.
 * Precios en colones costarricenses (₡).
 * 
 * Estructura de cada producto:
 * - id: Identificador único (string)
 * - name: Nombre comercial del producto
 * - type: Categoría del producto ('Pañales' | 'Pants' | 'Toallitas' | 'Cuidado')
 * - size: Talla del pañal/pants o null para productos sin talla
 * - weightRange: Rango de peso del bebé o null si no aplica
 * - description: Descripción corta para tarjetas de producto
 * - longDescription: Descripción extendida para vista detallada
 * - price: Precio regular en colones (₡)
 * - discountPrice: Precio con descuento o null si no tiene oferta
 * - image: Ruta de la imagen del producto
 * - features: Lista de características destacadas
 */

export const huggiesCatalog = [
    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES SUPREME CARE
    // ═══════════════════════════════════════════════════
    {
        id: 'p1',
        name: 'Huggies Supreme Care',
        type: 'Pañales',
        size: 'RN',
        weightRange: 'Hasta 4 kg',
        description: 'Nuestra mejor protección y cuidado para la piel de tu bebé recién nacido.',
        longDescription: 'Huggies Supreme Care es el pañal ideal para el cuidado de la piel de tu bebé recién nacido. Cuenta con cubierta exterior respirable, delicada como el algodón, y cápsulas de absorción que retienen la humedad y heces líquidas para mantener su piel limpia y protegida.',
        price: 5950,
        discountPrice: 4990,
        image: '/product_images/supreme_care.png',
        features: ['Corte para el ombligo que evita roces', 'Indicador de humedad que cambia de color', 'Cubierta extra suave respirable', 'Dermatológicamente comprobado', 'Absorción de caquita líquida']
    },
    {
        id: 'p2',
        name: 'Huggies Supreme Care',
        type: 'Pañales',
        size: 'P',
        weightRange: '3.5 - 6 kg',
        description: 'Protección premium para los primeros meses de vida.',
        longDescription: 'La mejor protección de Huggies para los primeros meses. Supreme Care talla P ofrece una absorción superior gracias a sus cápsulas súper absorbentes. Su cintura elástica se ajusta suavemente al cuerpecito de tu bebé.',
        price: 6200,
        discountPrice: null,
        image: '/product_images/supreme_care.png',
        features: ['Indicador de humedad que cambia de color', 'Cintura elástica y suave', 'Cubierta tipo algodón', 'Absorción de heces líquidas', 'Materiales hipoalergénicos']
    },
    {
        id: 'p3',
        name: 'Huggies Supreme Care',
        type: 'Pañales',
        size: 'M',
        weightRange: '5.5 - 9.5 kg',
        description: 'Flexibilidad y absorción para bebés en crecimiento.',
        longDescription: 'A medida que tu bebé crece, necesita más flexibilidad. Huggies Supreme Care incorpora tecnología Xtra-Care con canales en forma de X que distribuyen el líquido uniformemente para que el pañal no se abulte en el centro.',
        price: 7250,
        discountPrice: null,
        image: '/product_images/supreme_care.png',
        features: ['Tecnología de canales en X', 'No se abulta en el centro', 'Cintura súper elástica', 'Dermatológicamente testeado', 'Cubierta 100% respirable']
    },
    {
        id: 'p4',
        name: 'Huggies Supreme Care',
        type: 'Pañales',
        size: 'G',
        weightRange: '9 - 12.5 kg',
        description: 'Máxima comodidad para bebés activos que descubren el mundo.',
        longDescription: 'Para bebés activos que requieren máxima comodidad. Supreme Care talla G ofrece canales en X que se adaptan a los movimientos de tu bebé, previniendo escurrimientos en cualquier posición.',
        price: 7800,
        discountPrice: null,
        image: '/product_images/supreme_care.png',
        features: ['Flexibilidad superior para gateo y caminata', 'Tecnología Xtra-Care', 'Barreras anti-filtraciones mejoradas', 'Laterales elásticos', 'Diseños exclusivos de Disney']
    },
    {
        id: 'p5',
        name: 'Huggies Supreme Care',
        type: 'Pañales',
        size: 'XG',
        weightRange: '12 - 15 kg',
        description: 'Protección extendida para bebés más grandes.',
        longDescription: 'Máxima protección para los más grandes. La tecnología Supreme Care mantiene a tu bebé seco y libre de rozaduras incluso durante toda la noche, con un ajuste perfecto que no deja marcas rojas en su piel.',
        price: 8500,
        discountPrice: 7490,
        image: '/product_images/supreme_care.png',
        features: ['Ajuste perfecto sin marcas', 'Hasta 12 horas de absorción', 'Canales en X que distribuyen el líquido', 'Textura súper suave', 'Materiales respirables']
    },
    {
        id: 'p6',
        name: 'Huggies Supreme Care',
        type: 'Pañales',
        size: 'XXG',
        weightRange: 'Más de 14 kg',
        description: 'La máxima capacidad de absorción para los más grandes.',
        longDescription: 'El tamaño ideal para bebés más grandes o que requieren extra capacidad de absorción nocturna. Supreme Care XXG es sinónimo de protección total y cuidado delicado de la piel.',
        price: 9200,
        discountPrice: null,
        image: '/product_images/supreme_care.png',
        features: ['Máxima capacidad de absorción Huggies', 'Barreras súper altas', 'Cintura y orejas ajustables', 'Cubierta interior extra seca', 'Prevención de rozaduras']
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES ACTIVE SEC
    // ═══════════════════════════════════════════════════
    {
        id: 'p7',
        name: 'Huggies Active Sec',
        type: 'Pañales',
        size: 'M',
        weightRange: '5.5 - 9.5 kg',
        description: 'Protección confiable con ajuste anatómico para tu bebé activo.',
        longDescription: 'Para los bebés que no paran, Huggies Active Sec ofrece protección confiable de día y de noche. Su tecnología Maxisec absorbe rápidamente y su sistema de ajuste anatómico garantiza hasta 12 horas de absorción continua.',
        price: 5500,
        discountPrice: null,
        image: '/product_images/active_sec.png',
        features: ['Tecnología Maxisec de absorción rápida', 'Hasta 12 horas de protección nocturna', 'Ajuste anatómico Flexi-comodidad', 'Barreras anti-desbordes', 'Cintas con agarre seguro']
    },
    {
        id: 'p8',
        name: 'Huggies Active Sec',
        type: 'Pañales',
        size: 'G',
        weightRange: '9 - 12.5 kg',
        description: 'Absorción reforzada para noches enteras y días de movimiento.',
        longDescription: 'Mantén a tu bebé seco y cómodo mientras explora el mundo. Huggies Active Sec ofrece absorción reforzada para aguantar las noches enteras y los días de máximo movimiento sin filtraciones.',
        price: 6200,
        discountPrice: 5490,
        image: '/product_images/active_sec.png',
        features: ['Capa extra absorbente', 'Hasta 12 horas de protección', 'Ajuste anatómico', 'Cintura elástica trasera', 'Barreras reforzadas']
    },
    {
        id: 'p12',
        name: 'Huggies Active Sec',
        type: 'Pañales',
        size: 'XG',
        weightRange: '12 - 15 kg',
        description: 'Protección extra para bebés grandes en constante movimiento.',
        longDescription: 'Huggies Active Sec XG acompaña a tu bebé en cada aventura con su tecnología Maxisec de absorción inmediata. Diseñado para resistir largas horas de juego activo sin comprometer la comodidad ni la protección.',
        price: 6800,
        discountPrice: null,
        image: '/product_images/active_sec.png',
        features: ['Tecnología Maxisec reforzada', 'Ajuste anatómico para mayor movilidad', 'Cintura elástica completa', 'Barreras anti-desbordes laterales', 'Hasta 12 horas de sequedad']
    },
    {
        id: 'p13',
        name: 'Huggies Active Sec',
        type: 'Pañales',
        size: 'XXG',
        weightRange: 'Más de 14 kg',
        description: 'Máxima protección Active Sec para los más grandecitos.',
        longDescription: 'La talla más grande de la línea Active Sec, diseñada para bebés que ya caminan con confianza. Ofrece la misma absorción Maxisec confiable en un tamaño que se adapta perfectamente a los cuerpos más grandes.',
        price: 7200,
        discountPrice: null,
        image: '/product_images/active_sec.png',
        features: ['Talla XXG con máxima cobertura', 'Absorción Maxisec de alto rendimiento', 'Cintas reposicionables', 'Ajuste anatómico amplio', 'Materiales suaves y resistentes']
    },

    // ═══════════════════════════════════════════════════
    // PANTS — HUGGIES ACTIVE SEC PANTS
    // ═══════════════════════════════════════════════════
    {
        id: 'p9',
        name: 'Huggies Active Sec Pants',
        type: 'Pants',
        size: 'G',
        weightRange: '9 - 12.5 kg',
        description: 'Fáciles de poner y quitar, con ajuste 360°.',
        longDescription: 'La transición perfecta cuando tu bebé está siempre en movimiento. Los pañales Huggies Active Sec tipo Pants se ponen como ropita interior, facilitando el cambio incluso si tu bebé está de pie o escapando.',
        price: 7500,
        discountPrice: null,
        image: '/product_images/active_sec_pants.png',
        features: ['Se suben como calzoncito', 'Cintura autoajustable 360°', 'Costuras laterales que se rasgan para fácil retiro', 'Hasta 12 horas de protección', 'Cinta enrolladora para desechar']
    },
    {
        id: 'p14',
        name: 'Huggies Active Sec Pants',
        type: 'Pants',
        size: 'XG',
        weightRange: '12 - 15 kg',
        description: 'Pañal tipo calzoncito con máxima libertad de movimiento.',
        longDescription: 'Huggies Active Sec Pants XG brinda la libertad que tu bebé necesita para correr, jugar y explorar. Su tecnología de ajuste 360° se adapta como ropita interior, mientras la absorción Maxisec mantiene todo bajo control.',
        price: 8200,
        discountPrice: 7290,
        image: '/product_images/active_sec_pants.png',
        features: ['Ajuste tipo ropita interior 360°', 'Absorción Maxisec incorporada', 'Laterales rasgables para retiro fácil', 'Ultra delgado para mayor comodidad', 'Diseños divertidos para niños y niñas']
    },
    {
        id: 'p15',
        name: 'Huggies Active Sec Pants',
        type: 'Pants',
        size: 'XXG',
        weightRange: 'Más de 14 kg',
        description: 'El pants más grande para los pequeños más independientes.',
        longDescription: 'Para los pequeños que ya quieren hacer todo solitos. Los Pants XXG son ideales para la etapa de entrenamiento al baño, porque tu hijo puede subirlos y bajarlos fácilmente, como ropita interior de verdad.',
        price: 8900,
        discountPrice: null,
        image: '/product_images/active_sec_pants.png',
        features: ['Ideal para entrenamiento al baño', 'El niño puede subirlo y bajarlo solo', 'Cintura autoajustable de tela', 'Máxima absorción Maxisec', 'Costuras laterales para retiro rápido']
    },

    // ═══════════════════════════════════════════════════
    // TOALLITAS HÚMEDAS
    // ═══════════════════════════════════════════════════
    {
        id: 'p10',
        name: 'Toallitas Húmedas Supreme Care',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Limpieza superior y delicada para la piel de tu bebé.',
        longDescription: 'Las toallitas húmedas Huggies Supreme Care están diseñadas con Eco-Fibras naturales y agua purificada, ofreciendo la limpieza más delicada y segura desde el primer día. Son más gruesas y suaves, ideales para cuerpo, manos y carita.',
        price: 3200,
        discountPrice: 2690,
        image: '/product_images/wipes.png',
        features: ['Hechas con agua purificada', 'Fibras de origen natural', '0% alcohol, parabenos y fragancias', 'Hipoalergénicas y testeadas por pediatras', 'Enriquecidas con Vitamina E y Aloe Vera']
    },
    {
        id: 'p11',
        name: 'Toallitas Húmedas Limpieza Cotidiana',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Limpieza efectiva y resistente en cada cambio de pañal.',
        longDescription: 'Mantén a tu bebé fresco y limpio todo el día con Huggies Limpieza Cotidiana. Estas toallitas son súper resistentes, no se rompen fácilmente al sacarlas y tienen el nivel justo de humedad para una limpieza profunda y rápida.',
        price: 2400,
        discountPrice: null,
        image: '/product_images/wipes.png',
        features: ['Tela resistente para limpieza profunda', 'Aroma suave y refrescante', 'Libres de parabenos y alcohol', 'Suaves con la piel del bebé', 'Dermatológicamente comprobadas']
    },
    {
        id: 'p16',
        name: 'Toallitas Húmedas One & Done',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Una sola toallita es suficiente para una limpieza completa.',
        longDescription: 'La toallita más gruesa y resistente de Huggies. Con textura acanalada TripleClean, una sola toallita basta para limpiar completamente. Ideal para cambios de pañal difíciles y para las manos y la carita después de comer.',
        price: 3500,
        discountPrice: null,
        image: '/product_images/wipes_one_done.png',
        features: ['Textura acanalada TripleClean', 'La más gruesa y resistente de Huggies', 'Una toallita basta para limpiar', 'Libres de alcohol y parabenos', 'Aroma fresco y suave']
    },
    {
        id: 'p17',
        name: 'Toallitas Húmedas Puro y Natural',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: '99% agua purificada, la opción más natural para tu bebé.',
        longDescription: 'Las toallitas Huggies Puro y Natural están compuestas en un 99% por agua purificada y contienen fibras de origen vegetal. Sin fragancias, sin colorantes, sin parabenos. La opción más pura para la piel más delicada desde el día uno.',
        price: 3800,
        discountPrice: 3290,
        image: '/product_images/wipes_natural.png',
        features: ['99% agua purificada', 'Fibras de origen vegetal', '0% fragancias, colorantes y parabenos', 'Perfectas para recién nacidos', 'Certificación de origen natural']
    },

    // ═══════════════════════════════════════════════════
    // CUIDADO DEL BEBÉ
    // ═══════════════════════════════════════════════════
    {
        id: 'p18',
        name: 'Huggies Crema Protectora',
        type: 'Cuidado',
        size: null,
        weightRange: null,
        description: 'Protege y previene las rozaduras del pañal desde el primer uso.',
        longDescription: 'La Crema Protectora Huggies crea una barrera protectora en la piel de tu bebé que previene la irritación por el contacto con la humedad del pañal. Enriquecida con óxido de zinc y vitamina E, calma la piel irritada y previene futuras rozaduras.',
        price: 4200,
        discountPrice: null,
        image: '/product_images/care_cream.png',
        features: ['Barrera protectora contra rozaduras', 'Enriquecida con óxido de zinc', 'Vitamina E para piel sana', 'Alivio inmediato de irritación', 'Dermatológicamente testeada']
    },
    {
        id: 'p19',
        name: 'Huggies Jabón Líquido Suave',
        type: 'Cuidado',
        size: null,
        weightRange: null,
        description: 'Baño suave y delicado para la piel sensible de tu bebé.',
        longDescription: 'El Jabón Líquido Huggies limpia suavemente la piel de tu bebé sin resecarla. Su fórmula con pH balanceado respeta la barrera natural de la piel y su textura cremosa deja una sensación de suavidad y frescura después del baño.',
        price: 3800,
        discountPrice: 3290,
        image: '/product_images/care_soap.png',
        features: ['pH balanceado para piel de bebé', 'Fórmula sin lágrimas', 'Limpia sin resecar', 'Textura cremosa y suave', 'Hipoalergénico y sin colorantes']
    },
    {
        id: 'p20',
        name: 'Huggies Shampoo Suave',
        type: 'Cuidado',
        size: null,
        weightRange: null,
        description: 'Shampoo sin lágrimas para el cabello delicado de tu bebé.',
        longDescription: 'El Shampoo Huggies Suave limpia el cabello de tu bebé con delicadeza, dejándolo suave y con un aroma fresco. Su fórmula "sin lágrimas" ha sido testeada oftalmológicamente para que el baño sea un momento de disfrute sin llantos.',
        price: 3600,
        discountPrice: null,
        image: '/product_images/care_shampoo.png',
        features: ['Fórmula sin lágrimas', 'Testeado oftalmológicamente', 'Deja el cabello suave y brillante', 'Aroma fresco y duradero', 'Libre de parabenos y sulfatos']
    }
];

/** Tallas disponibles para pañales y pants (productos con talla) */
export const productSizes = ['RN', 'P', 'M', 'G', 'XG', 'XXG'];

/** Tipos/categorías de productos disponibles en el catálogo */
export const productTypes = ['Pañales', 'Pants', 'Toallitas', 'Cuidado'];

/**
 * Tipos de producto que NO tienen talla.
 * Usado por los filtros para ocultar el selector de tallas.
 */
export const sizelessTypes = ['Toallitas', 'Cuidado'];
