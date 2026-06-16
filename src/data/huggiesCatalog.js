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
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES ACTIVE SEC RECIÉN NACIDO
    // ═══════════════════════════════════════════════════
    {
        id: 'p21',
        name: 'Pañales Huggies Active Sec Recién Nacido',
        type: 'Pañales',
        size: 'RN',
        weightRange: 'Hasta 4 kg',
        description: 'Protección confiable desde el primer día para recién nacidos.',
        longDescription: 'Especialmente diseñado para la piel ultra delicada de los recién nacidos. Los Pañales Huggies Active Sec para Recién Nacido cuentan con corte especial para el ombligo, indicador de humedad y barrera anti-filtraciones para brindar protección y comodidad desde el primer día.',
        price: 5200,
        discountPrice: 4490,
        image: '/product_images/active_sec_rn.png',
        features: ['Corte especial para el ombligo', 'Indicador de humedad', 'Barrera anti-filtraciones', 'Cubierta suave extra delicada', 'Tecnología Maxisec de absorción rápida']
    },
    {
        id: 'p22',
        name: 'Huggies Active Sec',
        type: 'Pañales',
        size: 'P',
        weightRange: '3.5 - 6 kg',
        description: 'La confianza Active Sec para los primeros meses de vida.',
        longDescription: 'Huggies Active Sec talla P acompaña a tu bebé en sus primeros meses con la tecnología Maxisec de absorción rápida. Diseñado para adaptarse al cuerpecito pequeño con cintura elástica suave y barreras que evitan los escurrimientos.',
        price: 5490,
        discountPrice: null,
        image: '/product_images/active_sec.png',
        features: ['Tecnología Maxisec de absorción rápida', 'Cintura elástica suave', 'Barreras anti-desbordes', 'Ajuste anatómico para bebé pequeño', 'Hasta 12 horas de protección']
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES NATURAL CARE
    // ═══════════════════════════════════════════════════
    {
        id: 'p23',
        name: 'Pañales Huggies Natural Care',
        type: 'Pañales',
        size: 'M',
        weightRange: '5.5 - 9.5 kg',
        description: 'Cuidado natural y suave para la piel sensible de tu bebé.',
        longDescription: 'Huggies Natural Care está elaborado con materiales de origen natural que respetan y cuidan la piel delicada de tu bebé. Su interior suave como el algodón y libre de ingredientes agresivos lo hace ideal para pieles sensibles.',
        price: 6800,
        discountPrice: null,
        image: '/product_images/natural_care_diaper.png',
        features: ['Materiales de origen natural', 'Interior suave como el algodón', 'Sin cloro, fragancias ni parabenos', 'Dermatológicamente testeado', 'Ideal para piel sensible']
    },
    {
        id: 'p24',
        name: 'Pañales Huggies Natural Care',
        type: 'Pañales',
        size: 'G',
        weightRange: '9 - 12 kg',
        description: 'Protección natural que acompaña cada aventura de tu bebé.',
        longDescription: 'Para los bebés más activos que necesitan un pañal que respete su piel. Natural Care talla G ofrece la protección confiable de Huggies con materiales de origen natural, cintura elástica y barreras suaves que se adaptan al movimiento.',
        price: 7400,
        discountPrice: 6890,
        image: '/product_images/natural_care_diaper.png',
        features: ['Materiales de origen natural', 'Cintura elástica que no aprieta', 'Barreras suaves adaptadas al movimiento', 'Libre de fragancias y colorantes', 'pH balanceado para piel sensible']
    },
    {
        id: 'p25',
        name: 'Pañales Huggies Natural Care',
        type: 'Pañales',
        size: 'XG',
        weightRange: '12 - 15 kg',
        description: 'Confort natural para bebés más grandes con piel sensible.',
        longDescription: 'Huggies Natural Care XG cuida la piel de tu bebé mientras crece. Hecho con materiales de origen natural y libre de aditivos agresivos, proporciona una protección suave y confiable tanto de día como de noche.',
        price: 8100,
        discountPrice: null,
        image: '/product_images/natural_care_diaper.png',
        features: ['Materiales de origen natural XG', 'Sin fragancias, cloro ni parabenos', 'Dermatológicamente aprobado', 'Ajuste suave en cintura y piernas', 'Hasta 12 horas de sequedad']
    },

    // ═══════════════════════════════════════════════════
    // PANTS — HUGGIES NATURAL CARE PANTS
    // ═══════════════════════════════════════════════════
    {
        id: 'p26',
        name: 'Pañales Huggies Natural Care Pants',
        type: 'Pants',
        size: 'G',
        weightRange: '9 - 12 kg',
        description: 'Pants de origen natural para bebés activos con piel sensible.',
        longDescription: 'Natural Care Pants combina la comodidad del formato calzoncito con la suavidad de los materiales de origen natural. Su cintura 360° se adapta perfectamente y su interior sin fragancias protege la piel más delicada.',
        price: 7900,
        discountPrice: null,
        image: '/product_images/natural_care_pants.png',
        features: ['Formato calzoncito de fácil colocación', 'Materiales de origen natural', 'Cintura autoajustable 360°', 'Costuras laterales rasgables', 'Libre de fragancias y colorantes']
    },
    {
        id: 'p27',
        name: 'Pañales Huggies Natural Care Pants',
        type: 'Pants',
        size: 'XG',
        weightRange: '12 - 15 kg',
        description: 'Transición natural al entrenamiento con pants eco-amigables.',
        longDescription: 'Ideal para la etapa de entrenamiento al baño. Natural Care Pants XG combina la independencia del calzoncito con la suavidad de los materiales naturales. Tu bebé puede subirlos y bajarlos solo mientras cuida su piel sensible.',
        price: 8600,
        discountPrice: 7990,
        image: '/product_images/natural_care_pants.png',
        features: ['Materiales de origen natural', 'Ideal para el entrenamiento al baño', 'Cintura elástica tipo ropita', 'Laterales rasgables para retiro fácil', 'Sin fragancias ni colorantes']
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES DERMACARE
    // ═══════════════════════════════════════════════════
    {
        id: 'p28',
        name: 'Pañales Huggies Dermacare',
        type: 'Pañales',
        size: 'P',
        weightRange: '3.5 - 6 kg',
        description: 'Formulado especialmente para la piel más sensible y propensa a rozaduras.',
        longDescription: 'Huggies Dermacare es el pañal de elección para bebés con piel muy sensible, propensa a irritación o dermatitis del pañal. Su interior está enriquecido con crema protectora que forma una barrera contra la humedad desde dentro del pañal.',
        price: 6900,
        discountPrice: null,
        image: '/product_images/dermacare_diaper.png',
        features: ['Interior con crema protectora integrada', 'Barrera contra la humedad', 'Recomendado por dermatólogos', 'Sin fragancias ni alcohol', 'Cubierta ultra suave hipoalergénica']
    },
    {
        id: 'p29',
        name: 'Pañales Huggies Dermacare',
        type: 'Pañales',
        size: 'M',
        weightRange: '5.5 - 9.5 kg',
        description: 'Cuidado dermatológico avanzado en cada cambio de pañal.',
        longDescription: 'La línea Dermacare de Huggies ofrece protección dermatológica avanzada para bebés con tendencia a rozaduras. La crema protectora integrada actúa en cada cambio para mantener la piel de tu bebé libre de irritaciones.',
        price: 7500,
        discountPrice: 6990,
        image: '/product_images/dermacare_diaper.png',
        features: ['Crema protectora en el interior', 'Prevención activa de rozaduras', 'Recomendado para piel atópica', 'Sin perfumes ni parabenos', 'Testeado por dermatólogos pediátricos']
    },
    {
        id: 'p30',
        name: 'Pañales Huggies Dermacare',
        type: 'Pañales',
        size: 'G',
        weightRange: '9 - 12 kg',
        description: 'Protección activa de la piel para bebés con rozaduras frecuentes.',
        longDescription: 'Huggies Dermacare talla G mantiene la piel de bebés activos libre de irritaciones. La crema protectora integrada forma una barrera invisible que actúa incluso cuando el pañal está húmedo, protegiendo en todo momento.',
        price: 8200,
        discountPrice: null,
        image: '/product_images/dermacare_diaper.png',
        features: ['Barrera invisible contra la humedad', 'Crema protectora de acción prolongada', 'Ajuste anatómico para bebés activos', 'Libre de ingredientes irritantes', 'Cubierta transpirable']
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES ECO PROTECT
    // ═══════════════════════════════════════════════════
    {
        id: 'p31',
        name: 'Pañales Huggies Eco Protect',
        type: 'Pañales',
        size: 'M',
        weightRange: '5.5 - 9.5 kg',
        description: 'Protección de la piel con menor impacto al planeta.',
        longDescription: 'Huggies Eco Protect está fabricado con al menos un 20% de materiales renovables o reciclados. Mantiene la misma protección y suavidad que esperas de Huggies, con un menor impacto ambiental para un futuro más verde para tu bebé.',
        price: 7200,
        discountPrice: null,
        image: '/product_images/eco_protect_diaper.png',
        features: ['Al menos 20% de materiales renovables', 'Empaque reducido y reciclable', 'Misma absorción que Supreme Care', 'Sin cloro elemental', 'Certificación ambiental']
    },
    {
        id: 'p32',
        name: 'Pañales Huggies Eco Protect',
        type: 'Pañales',
        size: 'G',
        weightRange: '9 - 12 kg',
        description: 'Cuida la piel de tu bebé y el futuro del planeta.',
        longDescription: 'Eco Protect talla G combina la tecnología de protección Huggies con un compromiso real hacia el medioambiente. Fabricado con ingredientes de origen más sostenible sin sacrificar ni un gramo de rendimiento.',
        price: 7900,
        discountPrice: 7290,
        image: '/product_images/eco_protect_diaper.png',
        features: ['Origen más sostenible de materias primas', 'Empaque con menor plástico', 'Alta absorción eco-certificada', 'Sin fragancias ni colorantes', 'Dermatológicamente comprobado']
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES LITTLE SWIMMERS
    // ═══════════════════════════════════════════════════
    {
        id: 'p33',
        name: 'Pañales Huggies Little Swimmers',
        type: 'Pañales',
        size: 'M',
        weightRange: '7 - 12 kg',
        description: 'El pañal ideal para el agua: no se hincha ni se deshace.',
        longDescription: 'Huggies Little Swimmers está diseñado específicamente para usar en el agua. A diferencia de los pañales normales, no se hincha cuando se moja y mantiene los deshechos contenidos para que tu bebé pueda disfrutar del agua con total libertad y seguridad.',
        price: 5800,
        discountPrice: null,
        image: '/product_images/little_swimmers.png',
        features: ['No se hincha en el agua', 'Contiene deshechos sólidos', 'Cintura y piernas elásticas para buen ajuste', 'Costados rasgables para cambio fácil', 'Diseños coloridos y divertidos']
    },
    {
        id: 'p34',
        name: 'Pañales Huggies Little Swimmers',
        type: 'Pañales',
        size: 'G',
        weightRange: '12 - 18 kg',
        description: 'Libertad total en el agua para los más grandecitos.',
        longDescription: 'Little Swimmers talla G permite que tu bebé o niño pequeño disfrute del agua sin preocupaciones. Su ajuste cómodo y seguro se mantiene en la piscina, la playa o el parque acuático sin restricción de movimiento.',
        price: 6200,
        discountPrice: 5590,
        image: '/product_images/little_swimmers.png',
        features: ['Diseño tipo bañador reutilizable', 'Ajuste perfecto en cintura y piernas', 'No se hincha ni pierde forma en el agua', 'Retención de sólidos garantizada', 'Apto para agua de alberca y mar']
    },

    // ═══════════════════════════════════════════════════
    // PAÑALES — HUGGIES ACTIVE SEC SOFT COMFORT
    // ═══════════════════════════════════════════════════
    {
        id: 'p35',
        name: 'Pañal Huggies Active Sec Soft Comfort',
        type: 'Pañales',
        size: 'M',
        weightRange: '5.5 - 9.5 kg',
        description: 'Tecnología Active Sec con interior acolchado extra suave.',
        longDescription: 'Active Sec Soft Comfort combina la potente absorción Maxisec con un interior acolchado extra suave que envuelve suavemente la piel de tu bebé. La sensación de suavidad se percibe desde el primer contacto y dura toda la noche.',
        price: 6500,
        discountPrice: null,
        image: '/product_images/active_sec.png',
        features: ['Interior acolchado extra suave', 'Absorción Maxisec de alto rendimiento', 'Hasta 12 horas de comodidad nocturna', 'Cubierta sin costuras que roza', 'Cintura flexible que no deja marcas']
    },
    {
        id: 'p36',
        name: 'Pañal Huggies Active Sec Soft Comfort',
        type: 'Pañales',
        size: 'G',
        weightRange: '9 - 12 kg',
        description: 'Máximo confort activo para bebés que no paran.',
        longDescription: 'Para los bebés que más se mueven, Active Sec Soft Comfort talla G ofrece el ajuste perfecto con un toque de suavidad premium. Su interior acolchado previene rozaduras incluso durante las noches más largas.',
        price: 7100,
        discountPrice: 6490,
        image: '/product_images/active_sec.png',
        features: ['Interior acolchado ultra suave', 'Ajuste anatómico para máximo movimiento', 'Barreras reforzadas anti-filtración', 'Cubierta transpirable y suave', 'Diseño ergonómico sin restricciones']
    },

    // ═══════════════════════════════════════════════════
    // TOALLITAS — NUEVAS VARIEDADES
    // ═══════════════════════════════════════════════════
    {
        id: 'p37',
        name: 'Toallitas Húmedas Limpieza Efectiva',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Limpieza rápida y profunda en cada cambio de pañal.',
        longDescription: 'Las Toallitas Huggies Limpieza Efectiva están diseñadas para la limpieza más exigente: son gruesas, resistentes y húmedas en el nivel justo para una limpieza rápida y profunda sin irritar la piel de tu bebé.',
        price: 2600,
        discountPrice: null,
        image: '/product_images/wipes_limpieza_efectiva.png',
        features: ['Tela gruesa y resistente', 'Nivel óptimo de humedad', 'Limpieza profunda en un solo pase', 'Sin alcohol ni parabenos', 'Suaves con la piel sensible del bebé']
    },
    {
        id: 'p38',
        name: 'Toallitas Húmedas Manitos y Caritas',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Limpian manos y carita con delicadeza en cualquier momento.',
        longDescription: 'Especialmente formuladas para limpiar las manos y la carita de tu bebé fuera de los cambios de pañal. Son más suaves y finas, perfectas para el uso frecuente a lo largo del día, en casa o en la bolsa del pañalero.',
        price: 2900,
        discountPrice: 2490,
        image: '/product_images/wipes_manitos.png',
        features: ['Formuladas para manos y cara', 'Finas y extra suaves', 'Sin alcohol, perfume ni colorantes', 'Tamaño ideal para el pañalero', 'Dispensador fácil de abrir con una mano']
    },
    {
        id: 'p39',
        name: 'Toallitas Húmedas Huggies Eco Protect',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Limpieza delicada con fibras de origen vegetal.',
        longDescription: 'Las Toallitas Eco Protect de Huggies están elaboradas con fibras de origen vegetal 100% biodegradables. Cuidan la piel de tu bebé con la misma eficacia que las toallitas tradicionales, pero con un menor impacto en el medioambiente.',
        price: 3400,
        discountPrice: null,
        image: '/product_images/wipes_natural.png',
        features: ['Fibras vegetales 100% biodegradables', 'Empaque de cartón reciclable', 'Sin plástico en la tela', 'Hipoalergénicas y sin fragancias', 'Certificación de origen sustentable']
    },
    {
        id: 'p40',
        name: 'Toallitas Húmedas Cuidado 4 en 1',
        type: 'Toallitas',
        size: null,
        weightRange: null,
        description: 'Limpia, hidrata, protege y calma en una sola toallita.',
        longDescription: 'Las Toallitas Huggies Cuidado 4 en 1 son multifuncionales: limpian, hidratan, protegen y calman la piel de tu bebé en un solo producto. Enriquecidas con aloe vera, vitamina E, manteca de karité y caléndula para un cuidado completo.',
        price: 3900,
        discountPrice: 3490,
        image: '/product_images/wipes_cuidado_4en1.png',
        features: ['4 beneficios en 1: limpia, hidrata, protege y calma', 'Aloe vera y vitamina E', 'Manteca de karité y caléndula', 'Dermatológicamente testeada', 'Libre de alcohol y parabenos']
    },

    // ═══════════════════════════════════════════════════
    // CUIDADO DEL BAÑO — NUEVOS PRODUCTOS
    // ═══════════════════════════════════════════════════
    {
        id: 'p41',
        name: 'Jabón en Barra Huggies Extra Suave',
        type: 'Cuidado',
        size: null,
        weightRange: null,
        description: 'Baño extra suave con jabón en barra especial para bebés.',
        longDescription: 'El Jabón en Barra Huggies Extra Suave limpia y cuida la piel delicada de tu bebé. Su fórmula cremosa con pH balanceado no reseca y deja una sensación de suavidad después del baño. Libre de colorantes agresivos y testeado por pediatras.',
        price: 2800,
        discountPrice: null,
        image: '/product_images/soap_barra.png',
        features: ['Fórmula en barra cremosa extra suave', 'pH balanceado para piel de bebé', 'Sin colorantes agresivos', 'Deja la piel suave y protegida', 'Testeado por pediatras']
    },
    {
        id: 'p42',
        name: 'Shampoo Huggies Manzanilla',
        type: 'Cuidado',
        size: null,
        weightRange: null,
        description: 'Shampoo de manzanilla sin lágrimas para un cabello suave y brillante.',
        longDescription: 'El Shampoo Huggies Manzanilla está enriquecido con extracto natural de manzanilla, conocido por su efecto calmante y suavizante. Su fórmula sin lágrimas y sin parabenos limpia el cuero cabelludo delicado de tu bebé dejando el cabello suave, brillante y con un aroma fresco y natural.',
        price: 3900,
        discountPrice: 3490,
        image: '/product_images/shampoo_manzanilla.png',
        features: ['Extracto natural de manzanilla', 'Fórmula sin lágrimas', 'Testeado oftalmológicamente', 'Sin parabenos ni sulfatos', 'Cabello suave, brillante y con aroma natural']
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
