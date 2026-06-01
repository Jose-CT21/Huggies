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
        content: 'Descubrí que poner música suave y una luz muy tenue durante el cambio nocturno ayuda a que el bebé no se desvele. ¡Desde que lo hago, mi niña vuelve a dormir casi enseguida! 🌙',
        images: [
            'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
        ],
        likes: 124,
        replies: 15,
        tags: ['HuggiesSupremeCare', 'Sueño']
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
        content: 'Hola comunidad, soy papá primerizo 😅. Mi bebé tiene 3 semanas y la talla RN le está quedando algo justa en las piernitas, pero aún pesa 3.5 kg. ¿Paso a talla P o espero?',
        images: [],
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
        content: '¡No puedo recomendar lo suficiente los Huggies Active Sec Pants! Mi niño de 1 año no se queda quieto ni un segundo. Con los pants es solo subir y listo 🙌',
        images: [
            'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
        ],
        likes: 312,
        replies: 42,
        tags: ['ActiveSecPants', 'Movimiento']
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
        content: 'Para la pañalera siempre llevo dos paquetes pequeños de toallitas húmedas Limpieza Cotidiana. Huelen increíble y son súper resistentes 💛',
        images: [],
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
        content: 'Un tip que me dio mi pediatra y me salvó: si hay derrames por la espalda, asegúrense de que las aletitas internas del pañal estén bien hacia afuera y ajusten la cintura apuntando ligeramente hacia abajo 💡',
        images: [
            'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80',
        ],
        likes: 540,
        replies: 112,
        tags: ['Derrames', 'SupremeCare']
    }
];

export const postCategories = ['Tips de Padres', 'Dudas', 'Recomendaciones'];
