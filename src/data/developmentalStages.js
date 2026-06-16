export const getDevelopmentalStage = (months) => {
    if (months === null || months === undefined) return null;
    if (months < 0) {
        return {
            id: 'prenatal',
            title: '¡Bebé en camino!',
            subtitle: 'Preparándote para la llegada',
            desc: 'Estás en una hermosa etapa de preparación. Tu cuerpo y tu bebé se están alistando para conocerse.',
            milestones: [
                'Preparar el bolso de la pañalera con prendas básicas',
                'Elegir pañales especiales para recién nacidos (RN)',
                'Organizar el cuarto y espacio de sueño seguro',
                'Leer sobre posiciones y técnicas de lactancia materna'
            ],
            tips: 'Aprovecha este tiempo para descansar y cuidar tu piel. Las estrías y la resequedad son comunes, mantente muy hidratada.',
            diaperSize: 'RN'
        };
    }
    if (months === 0) {
        return {
            id: 'newborn',
            title: 'Bienvenido al Mundo',
            subtitle: 'Recién Nacido (0 meses)',
            desc: 'Tu bebé se está adaptando al ambiente exterior. Su piel es extremadamente delgada y sensible.',
            milestones: [
                'Mantiene las manos cerradas en puño la mayor parte del tiempo',
                'Reacciona a sonidos fuertes parpadeando o asustándose',
                'Sigue objetos en movimiento lento con la mirada por lapsos cortos',
                'Duerme entre 16 y 18 horas divididas en periodos cortos'
            ],
            tips: 'La piel del recién nacido es 5 veces más fina que la de un adulto. Te recomendamos usar toallitas húmedas con fibras naturales libres de alcohol y fragancias.',
            diaperSize: 'RN'
        };
    }
    if (months >= 1 && months <= 3) {
        return {
            id: '1-3m',
            title: 'Sonrisas y Descubrimiento',
            subtitle: 'Bebé de 1 a 3 meses',
            desc: '¡Comienzan las interacciones! Tu bebé está más alerta y empieza a regalarte sus primeras sonrisas sociales.',
            milestones: [
                'Sonríe de forma social cuando le hablas o juegas',
                'Sostiene la cabeza por unos segundos al estar acostado boca abajo (tummy time)',
                'Empieza a balbucear y a hacer sonidos de arrullo ("uuh", "aah")',
                'Abre las manos y trata de llevarse los dedos a la boca'
            ],
            tips: 'Dedica unos minutos al día a ponerlo boca abajo sobre una manta suave. Esto fortalecerá los músculos de su cuello y espalda.',
            diaperSize: 'P'
        };
    }
    if (months >= 4 && months <= 6) {
        return {
            id: '4-6m',
            title: 'Exploración y Movimiento',
            subtitle: 'Bebé de 4 a 6 meses',
            desc: 'Tu bebé está descubriendo la fuerza de sus extremidades y podría prepararse para los primeros sólidos.',
            milestones: [
                'Se da la vuelta por sí mismo (rueda boca abajo y boca arriba)',
                'Intenta agarrar objetos que están a su alcance y se los lleva a la boca',
                'Se sostiene sentado con ayuda o apoyo de almohadas',
                'Responde activamente a su propio nombre emitiendo sonidos'
            ],
            tips: 'Al iniciar la alimentación complementaria (alrededor de los 6 meses), las deposiciones del bebé cambiarán de consistencia. Elige pañales con barreras reforzadas.',
            diaperSize: 'M'
        };
    }
    if (months >= 7 && months <= 9) {
        return {
            id: '7-9m',
            title: 'Independencia y Curiosidad',
            subtitle: 'Bebé de 7 a 9 meses',
            desc: '¡Tu bebé ya se sienta solo! Su visión mejora notablemente y empieza a explorar su espacio de forma más activa.',
            milestones: [
                'Se mantiene sentado sin apoyo de forma estable',
                'Pasa objetos de una mano a la otra y los golpea entre sí',
                'Comienza a arrastrarse o a hacer intentos de gateo',
                'Reconoce rostros familiares y muestra timidez ante extraños'
            ],
            tips: 'Haz de tu hogar un espacio seguro. Asegura esquinas, cables y enchufes, ya que en cualquier momento tu bebé comenzará a desplazarse solo.',
            diaperSize: 'G'
        };
    }
    if (months >= 10 && months <= 12) {
        return {
            id: '10-12m',
            title: 'Primeros Pasos y Palabras',
            subtitle: 'Bebé de 10 a 12 meses',
            desc: '¡Está por cumplir su primer año! Se pone de pie sosteniéndose de muebles e intenta comunicarse más.',
            milestones: [
                'Se pone de pie por sí solo apoyándose de superficies',
                'Usa el agarre de "pinza" (dedo índice y pulgar) para tomar comida pequeña',
                'Dice "mamá" o "papá" de forma intencional para llamar tu atención',
                'Entiende instrucciones simples de una sola palabra como "dame" o "no"'
            ],
            tips: 'Promueve su autonomía dejándole comer alimentos blandos en trozos pequeños con sus propias manitas. Esto ejercita su motricidad fina.',
            diaperSize: 'G'
        };
    }
    // 12+ months
    return {
        id: '12m+',
        title: 'Pequeño Gran Explorador',
        subtitle: 'Bebé de 12+ meses',
        desc: '¡Tu bebé ya camina solo o está por lograrlo! Su energía es inagotable y explora todo a su paso.',
        milestones: [
            'Camina de forma independiente o sosteniéndose de una mano',
            'Imita gestos y tareas cotidianas simples que te ve hacer',
            'Puede apilar de 2 a 3 bloques de construcción',
            'Dice entre 3 y 6 palabras con significado claro'
        ],
        tips: 'Con tanta actividad, cambiar pañales con cintas adhesivas puede ser difícil. Te recomendamos cambiar a pañales tipo Pants auto-ajustables que se suben como ropa interior.',
        diaperSize: 'XG'
    };
};
