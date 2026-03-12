export const initialPosts = [
    {
        id: 'post-1',
        author: {
            name: 'Laura Méndez',
            avatar: 'https://i.pravatar.cc/150?u=laura',
            isPremium: true
        },
        date: 'Hace 2 horas',
        category: 'Tips de Padres',
        content: 'Descubrí que poner un poco de música suave y mantener una luz muy tenue durante el cambio de pañal nocturno ayuda muchísimo a que el bebé no se desvele. ¡Desde que lo hago, mi niña vuelve a dormir casi enseguida!',
        likes: 124,
        replies: 15,
        tags: ['Huggies Supreme Care', 'Sueño']
    },
    {
        id: 'post-2',
        author: {
            name: 'Carlos Ruiz',
            avatar: 'https://i.pravatar.cc/150?u=carlos',
            isPremium: false
        },
        date: 'Ayer',
        category: 'Dudas',
        content: 'Hola comunidad, soy papá primerizo. Mi bebé tiene 3 semanas y he notado que la talla RN le está quedando algo justa en las piernitas, pero aún pesa 3.5kg. ¿Debería pasar a la talla P (Pequeño) o esperar un poco más?',
        likes: 45,
        replies: 28,
        tags: ['Pañales', 'Tallas']
    },
    {
        id: 'post-3',
        author: {
            name: 'Andrea Gómez',
            avatar: 'https://i.pravatar.cc/150?u=andrea',
            isPremium: true
        },
        date: 'Ayer',
        category: 'Recomendaciones',
        content: '¡No puedo recomendar lo suficiente los Huggies Active Sec Pants! Mi niño de 1 año no se queda quieto ni un segundo al cambiarlo. Con los pants es solo subir y listo, literalmente me cambió la vida. Si tienen bebés inquietos, tienen que probarlos.',
        likes: 312,
        replies: 42,
        tags: ['Active Sec Pants', 'Movimiento']
    },
    {
        id: 'post-4',
        author: {
            name: 'Sofía Navarro',
            avatar: 'https://i.pravatar.cc/150?u=sofia',
            isPremium: false
        },
        date: 'Hace 3 días',
        category: 'Recomendaciones',
        content: 'Para la pañalera siempre llevo dos paquetes pequeños de toallitas húmedas Limpieza Cotidiana. Huelen delicioso y son súper resistentes (las uso hasta para limpiarle las manitas después del parque).',
        likes: 89,
        replies: 5,
        tags: ['Toallitas']
    },
    {
        id: 'post-5',
        author: {
            name: 'Miguel Ángel',
            avatar: 'https://i.pravatar.cc/150?u=miguel',
            isPremium: true
        },
        date: 'Hace 1 semana',
        category: 'Tips de Padres',
        content: 'Un tip que me dio mi pediatra y me salvó: si hay derrames constantes por la espalda, asegúrense de que las aletitas internas de las piernas del pañal estén bien sacadas hacia afuera y de ajustar la cintura apuntando ligeramente hacia abajo.',
        likes: 540,
        replies: 112,
        tags: ['Derrames', 'Supreme Care']
    }
];

export const postCategories = ['Tips de Padres', 'Dudas', 'Recomendaciones'];
