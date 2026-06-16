/**
 * Datos de demostración para la sección Hugs (Videos Cortos).
 * 
 * En producción, estos datos vendrían de un backend/CMS.
 * Los videos de ejemplo usan fuentes públicas de placeholder.
 * 
 * Referencias originales del cliente:
 * - https://www.instagram.com/reel/DVgjcFgERDw/
 * - https://www.instagram.com/reel/DURg6zVjwdS/
 * - https://www.instagram.com/reel/DUwgy9wDJlJ/
 */

export const hugsVideos = [
    {
        id: 'hug-1',
        // Video placeholder: bebé jugando (vertical)
        videoUrl: 'https://videos.pexels.com/video-files/3252004/3252004-sd_360_640_25fps.mp4',
        creator: 'Huggies CR',
        creatorAvatar: '🧸',
        verified: true,
        description: '5 tips para cambiar el pañal sin estrés 👶✨ ¡El tip #3 te va a encantar!',
        hashtags: ['#HuggiesTips', '#BebéFeliz', '#CambioDePañal'],
        likes: 342,
        commentsCount: 28,
        shares: 56,
        comments: [
            { id: 'c1', user: 'María López', avatar: '👩', text: '¡Excelente tip! Lo voy a probar con mi bebé 🥰', time: '2h' },
            { id: 'c2', user: 'Carlos R.', avatar: '👨', text: 'Funciona perfecto, gracias Huggies!', time: '4h' },
            { id: 'c3', user: 'Ana Mora', avatar: '👩‍🦱', text: 'Mi bebé ya no llora al cambiarle el pañal ❤️', time: '6h' },
        ],
        isLiked: false,
        isSaved: false,
    },
    {
        id: 'hug-2',
        videoUrl: 'https://videos.pexels.com/video-files/3209237/3209237-sd_360_640_25fps.mp4',
        creator: 'Dra. Sofía Wellness',
        creatorAvatar: '👩‍⚕️',
        verified: true,
        description: '¿Sabías que la piel de tu bebé es 5 veces más delgada? Así puedes protegerla 🛡️',
        hashtags: ['#PielDeBebé', '#CuidadoInfantil', '#DermatologíaPediátrica'],
        likes: 1205,
        commentsCount: 89,
        shares: 234,
        comments: [
            { id: 'c4', user: 'Laura G.', avatar: '👩‍🦰', text: 'No tenía idea, muy informativo 👏', time: '1h' },
            { id: 'c5', user: 'Pedro Sánchez', avatar: '👨‍🦲', text: 'Compartiré esto con mi esposa', time: '3h' },
        ],
        isLiked: false,
        isSaved: false,
    },
    {
        id: 'hug-3',
        videoUrl: 'https://videos.pexels.com/video-files/3196025/3196025-sd_360_640_25fps.mp4',
        creator: 'Mamá Primeriza CR',
        creatorAvatar: '🤱',
        verified: false,
        description: 'Rutina nocturna con mi bebé de 3 meses 🌙 El secreto está en el baño tibio + pañal Supreme Care',
        hashtags: ['#RutinaDeBebé', '#MamáPrimeriza', '#HuggiesSupreme'],
        likes: 876,
        commentsCount: 62,
        shares: 145,
        comments: [
            { id: 'c6', user: 'Valeria M.', avatar: '👩', text: '¡Qué hermoso! Mi bebé también ama el baño antes de dormir 🛁', time: '30m' },
            { id: 'c7', user: 'Diana Torres', avatar: '👩‍🦱', text: '¿Qué temperatura recomiendas para el agua?', time: '1h' },
            { id: 'c8', user: 'Mamá Primeriza CR', avatar: '🤱', text: '@Diana Torres entre 36-37°C, tibia al tacto ✨', time: '1h' },
        ],
        isLiked: false,
        isSaved: false,
    },
    {
        id: 'hug-4',
        videoUrl: 'https://videos.pexels.com/video-files/3255242/3255242-sd_360_640_25fps.mp4',
        creator: 'Huggies CR',
        creatorAvatar: '🧸',
        verified: true,
        description: '¿Tu bebé tiene rozaduras? 3 pasos para aliviarlas y prevenirlas 🩹💕',
        hashtags: ['#Rozaduras', '#CuidadoDePiel', '#HuggiesCuida'],
        likes: 2103,
        commentsCount: 156,
        shares: 412,
        comments: [
            { id: 'c9', user: 'Karla Jiménez', avatar: '👩', text: 'Esto me salvó la vida con mi segundo hijo', time: '5h' },
            { id: 'c10', user: 'Roberto A.', avatar: '👨', text: 'Mi pediatra recomendó lo mismo 👍', time: '8h' },
        ],
        isLiked: false,
        isSaved: false,
    },
    {
        id: 'hug-5',
        videoUrl: 'https://videos.pexels.com/video-files/3252002/3252002-sd_360_640_25fps.mp4',
        creator: 'Papá Moderno',
        creatorAvatar: '👨‍🍼',
        verified: false,
        description: 'POV: Primer cambio de pañal como papá primerizo 😂🍼 #LoLogramos',
        hashtags: ['#PapáPrimerizo', '#HumorDePadres', '#Pañales'],
        likes: 4521,
        commentsCount: 312,
        shares: 890,
        comments: [
            { id: 'c11', user: 'Jorge R.', avatar: '👨', text: '¡Jajaja me identifico al 100%! 😂', time: '15m' },
            { id: 'c12', user: 'Lucía Vargas', avatar: '👩', text: 'Mi esposo era igualito el primer día', time: '45m' },
            { id: 'c13', user: 'Papá Moderno', avatar: '👨‍🍼', text: '¡Gracias por el apoyo! Ya mejoramos bastante 💪', time: '1h' },
        ],
        isLiked: false,
        isSaved: false,
    },
    {
        id: 'hug-6',
        videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-sd_360_640_25fps.mp4',
        creator: 'Nutrición Bebé CR',
        creatorAvatar: '🍎',
        verified: true,
        description: 'Guía de alimentación complementaria: ¿Cuándo empezar? ¿Con qué alimentos? 🥑🍌',
        hashtags: ['#AlimentaciónBebé', '#BLW', '#NutriciónInfantil'],
        likes: 1567,
        commentsCount: 98,
        shares: 321,
        comments: [
            { id: 'c14', user: 'Stephanie P.', avatar: '👩‍🦰', text: 'Justo lo que necesitaba, mi bebé cumple 6 meses la próxima semana', time: '2h' },
            { id: 'c15', user: 'Dr. Ramírez', avatar: '👨‍⚕️', text: 'Muy buena información. Siempre consultar con el pediatra primero.', time: '4h' },
        ],
        isLiked: false,
        isSaved: false,
    },
];
