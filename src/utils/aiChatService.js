// Simulated AI response logic
export const getAIResponse = (userText) => {
    const query = userText.toLowerCase();

    // Check if user is asking for human assistance
    if (query.includes('agente') || query.includes('humano') || query.includes('persona') || query.includes('atencion personalizada') || query.includes('soporte') || query.includes('contacto') || query.includes('soporte humano') || query.includes('hablar con alguien')) {
        return {
            type: 'trigger_handover',
            text: 'Comprendo que necesitas una atención personalizada. Te transferiré de inmediato con nuestro departamento de Servicio al Cliente. Un momento, por favor...'
        };
    }

    if (query.includes('recien nacido') || query.includes('rn') || query.includes('bebe recien') || query.includes('talla de pañal') || query.includes('calcular talla') || query.includes('pañales talla') || query.includes('peso')) {
        return {
            type: 'text',
            text: 'Para bebés recién nacidos, la línea premium **Huggies Supreme Care RN** es ideal ya que cuenta con orejas suaves y un corte especial para el cordón umbilical. Las tallas se basan en el peso:\n• **RN**: hasta 4 kg\n• **P**: 3.5 - 6 kg\n• **M**: 5.5 - 9.5 kg\n• **G**: 9 - 12.5 kg\n• **XG**: 12 - 15 kg\n• **XXG**: más de 14 kg.\n\nPuedes ver las opciones en la sección de [Productos](/products) o registrar a tu bebé en tu [Cuenta](/cuenta) para sugerencias personalizadas.',
            quickReplies: ['Ver catálogo de pañales', 'Ir a mi cuenta', 'Hablar con un agente humano 👤']
        };
    }

    if (query.includes('rewards') || query.includes('recompensa') || query.includes('puntos') || query.includes('canjear') || query.includes('acumular') || query.includes('puntos gratis') || query.includes('ganar')) {
        return {
            type: 'text',
            text: '¡Con **Huggies Rewards** tus compras tienen premio! Puedes acumular puntos cargando las facturas de tus compras de pañales o toallitas Huggies y luego canjearlos por grandes descuentos, pañales gratis o accesorios especiales. Consulta tus puntos acumulados en la pestaña de [Recompensas](/recompensas).',
            quickReplies: ['Ver mis Recompensas', '¿Dónde acumular puntos?', 'Hablar con un agente humano 👤']
        };
    }

    if (query.includes('tienda') || query.includes('comprar') || query.includes('donde') || query.includes('puntos de venta') || query.includes('sucursal') || query.includes('local') || query.includes('provincia') || query.includes('supermercado')) {
        return {
            type: 'text',
            text: '¡Encontrar pañales Huggies en Costa Rica es facilísimo! Estamos afiliados a supermercados importantes como **Walmart, Auto Mercado, Masxmenos** y farmacias de cadena como **Fischel y La Bomba**. \nPuedes ver la ubicación exacta, horarios de atención y números de teléfono en nuestra página interactiva de [Dónde Comprar / Puntos de Venta](/donde-comprar).',
            quickReplies: ['Ir al Localizador de tiendas', '¿Qué farmacias venden?', 'Hablar con un agente humano 👤']
        };
    }

    if (query.includes('toallitas') || query.includes('humedas') || query.includes('cuidado') || query.includes('crema') || query.includes('shampoo') || query.includes('piel')) {
        return {
            type: 'text',
            text: 'Además de pañales, ofrecemos toallitas húmedas como **Huggies Supreme Care** (con Eco-Fibras y 99% agua pura) y productos de cuidado infantil como nuestra crema protectora contra rozaduras y shampoo sin lágrimas. Descubre la gama completa en la categoría [Productos](/products).',
            quickReplies: ['Ver toallitas húmedas', 'Ver cremas y cuidado', 'Hablar con un agente humano 👤']
        };
    }

    if (query.includes('hola') || query.includes('buenos dias') || query.includes('buenas tardes') || query.includes('buenas noches') || query.includes('saludos') || query.includes('que tal')) {
        return {
            type: 'text',
            text: '¡Hola de nuevo! 😄 ¿En qué puedo colaborar contigo hoy? Dime si tienes dudas sobre tallas de pañales, programa de puntos, tiendas o compras.',
            quickReplies: ['¿Qué pañal es mejor para recién nacido?', '¿Cómo acumular puntos?', '¿Dónde hay tiendas?', 'Hablar con un agente humano 👤']
        };
    }

    if (query.includes('gracias') || query.includes('gracia') || query.includes('excelente') || query.includes('perfecto') || query.includes('ok') || query.includes('entendido')) {
        return {
            type: 'text',
            text: '¡Con muchísimo gusto! Si tienes alguna otra duda o consulta, aquí estaré. ¡Que pases un lindo día con tu bebé! 🧸✨',
            quickReplies: ['Hacer otra consulta', 'Hablar con un agente humano 👤']
        };
    }

    // Default response for unhandled queries
    return {
        type: 'text',
        text: 'Mmm, no estoy seguro de haber entendido tu pregunta del todo. 🧐 Recuerda que puedo ayudarte con información de pañales, el club de recompensas Huggies o los comercios afiliados.\n\nSi tu duda es muy particular, puedo ponerte en contacto inmediato con un **agente humano de atención al cliente**.',
        quickReplies: ['Hablar con un agente humano 👤', '¿Cómo calcular la talla?', '¿Dónde comprar?']
    };
};

// Simulated Support Agent responses
export const getHumanAgentResponse = (userText) => {
    const query = userText.toLowerCase();

    if (query.includes('factura') || query.includes('puntos') || query.includes('error') || query.includes('problema') || query.includes('no carga') || query.includes('recompensas')) {
        return 'Lamento mucho el inconveniente con tu registro de facturas o tus puntos de Recompensas. Para ayudarte a solucionarlo hoy mismo, ¿podrías brindarme el correo electrónico de tu cuenta Huggies y si tienes a mano el número de factura o comercio donde compraste?';
    }
    if (query.includes('compra') || query.includes('envio') || query.includes('pedido') || query.includes('llegar') || query.includes('checkout') || query.includes('pago')) {
        return 'Con gusto reviso el estado de tu pedido simulado. Para ubicarlo en el sistema, ¿podrías indicarme tu nombre completo y el correo electrónico con el que realizaste la transacción?';
    }
    if (query.includes('queja') || query.includes('malo') || query.includes('dañado') || query.includes('roto') || query.includes('alergia') || query.includes('irritacion') || query.includes('rozadura')) {
        return 'Para nosotros la salud de tu bebé y la calidad son lo más importante. Lamentamos este inconveniente. ¿Podrías indicarme tu nombre, número de teléfono y el número de lote del empaque (está impreso en la bolsa)? Esto para transferir el reporte directo a nuestro control médico de calidad y llamarte prioritariamente.';
    }
    if (query.includes('gracias') || query.includes('perfecto') || query.includes('entendido') || query.includes('listo')) {
        return '¡Ha sido todo un placer ayudarte! Quedo a tu total disposición. ¿Hay alguna otra consulta o detalle en el que te pueda servir?';
    }

    // General agent fallback
    return 'Entiendo perfectamente tu consulta. Para darte una solución formal y coordinar de ser necesario con el departamento correspondiente, ¿podrías dejarme tu correo electrónico de contacto y un número de teléfono? Estaré gestionando tu reporte de inmediato.';
};
