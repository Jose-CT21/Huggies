# 📋 Huggies Web — Contexto del Proyecto

Este archivo contiene la arquitectura completa, estructura de archivos, estándares de calidad del código y reglas de optimización para el proyecto **huggies-web**. Está optimizado para que los modelos de IA y desarrolladores entiendan rápidamente el estado actual de la aplicación y eviten errores repetitivos.

---

## 🏗️ Stack Tecnológico

| Capa           | Tecnología                          | Versión   |
|----------------|-------------------------------------|-----------|
| Framework      | React (con Vite)                    | ^19.2.0   |
| Build Tool     | Vite                                | ^7.3.1    |
| Routing        | react-router-dom                    | ^7.13.1   |
| Alertas/Modals | sweetalert2 + sweetalert2-react-content | ^11.26.25 |
| Iconos         | lucide-react                        | ^1.18.0   |
| Estilos        | Vanilla CSS (sin Tailwind)          | —         |
| Tipografía     | Google Fonts — Inter                | —         |
| Linting        | ESLint + eslint-plugin-react-hooks  | ^9.39.1   |
| Lenguaje       | JavaScript (JSX) — **NO TypeScript**| —         |

---

## 📁 Estructura del Proyecto y Mapa de Archivos

```text
huggies-web/
├── index.html                    # Punto de entrada HTML principal
├── vite.config.js                # Configuración de Vite con React
├── package.json                  # Dependencias y scripts npm (dev, build, lint)
├── eslint.config.js              # Reglas de linting de ESLint
│
├── public/                       # Assets estáticos (imágenes de fondo y productos)
│   └── product_images/           # Imágenes de productos
│
└── src/
    ├── main.jsx                  # Renderizado principal y envoltura de la App
    ├── App.jsx                   # Ruteo principal, shell de layout y Navbar/Footer
    ├── App.css                   # Estilos generales del contenedor del app
    ├── index.css                 # Importa las hojas de estilos globales del Design System
    │
    ├── styles/                   # 🎨 Design System (Variables y Tokens)
    │   ├── variables.css         # Definición de tokens de diseño (colores, espaciados, bordes, sombras)
    │   ├── globals.css           # Reset CSS básico, tipografía base y clase .container
    │   └── animations.css        # Keyframes de animaciones (fadeIn, slideUp, bounce)
    │
    ├── context/                  # ⚡ Manejo de Estado (React Context)
    │   ├── AuthContext.jsx       # Gestión de sesión de usuario y datos del bebé (childData)
    │   └── CartContext.jsx       # Gestión del carrito (productos, cantidades, puntos y checkout)
    │
    ├── data/                     # 📊 Datos Estáticos
    │   ├── huggiesCatalog.js     # Catálogo con 20 productos de pañales, pants, toallitas y cuidado
    │   ├── communityData.js      # Datos iniciales para la comunidad de padres
    │   ├── dummyData.js          # Datos estáticos para landing, categorías y blogs
    │   ├── developmentalStages.js# Datos de etapas de desarrollo del bebé
    │   ├── hugsData.js           # Datos para la funcionalidad de Hugs (comunidad)
    │   └── onboardingData.js     # Datos de soporte para el proceso de onboarding
    │
    ├── hooks/                    # 🎣 Custom Hooks
    │   └── useProductFilters.js  # Lógica de filtrado de productos
    │
    ├── utils/                    # 🛠️ Utilidades y Servicios
    │   └── aiChatService.js      # Servicio del asistente virtual de IA
    │
    ├── components/               # 🧩 Componentes Reutilizables
    │   ├── ProductSidebar.jsx    # Barra lateral de filtros para el catálogo
    │   │
    │   ├── home/                 # Componentes de la página de inicio
    │   │   ├── Hero.jsx / .css
    │   │   ├── BabyDashboard.jsx / .css               # Panel de control de la etapa del bebé
    │   │   ├── PersonalizedRecommendations.jsx / .css
    │   │   ├── ProductCategories.jsx / .css
    │   │   ├── Features.jsx / .css
    │   │   ├── RewardsPromo.jsx / .css
    │   │   ├── ArticleCarousel.jsx / .css
    │   │   ├── ProductMarquee.jsx / .css              # Carrusel de productos en movimiento
    │   │   └── UserRegistrationPromo.jsx / .css
    │   │
    │   ├── layout/               # Componentes estructurales persistentes
    │   │   ├── Navbar.jsx / .css
    │   │   ├── Footer.jsx / .css
    │   │   └── BottomNav.jsx / .css
    │   │
    │   ├── ui/                   # Componentes de interfaz genéricos
    │   │   ├── Button.jsx / .css
    │   │   ├── Card.jsx / .css
    │   │   ├── CartModal.jsx / .css
    │   │   ├── OnboardingWizard.jsx / .css
    │   │   ├── AppTutorial.jsx / .css                 # Tutorial introductorio de la App
    │   │   ├── CustomDatePicker.jsx                   # Selector de fecha personalizado
    │   │   ├── ScrollToTopButton.jsx / .css
    │   │   ├── AIAssistant.jsx / .css
    │   │   └── icons/                                 # Iconos SVG
    │   │
    │   └── hugs/                 # Componentes para la red "Hugs"
    │       ├── HugCard.jsx                            # Tarjeta de publicación de un "Hug"
    │       └── HugComments.jsx / .css                 # Sección de comentarios de un "Hug"
    │
    └── pages/                    # 📄 Vistas Principales
        ├── Home.jsx              # Landing Page
        ├── Products.jsx / .css   # Catálogo interactivo con filtros
        ├── ProductDetail.jsx / .css # Ficha de detalle de producto
        ├── Community.jsx / .css  # Red social (posts, likes, comentarios)
        ├── Hugs.jsx / .css       # Sección interactiva "Hugs" (evolución de comunidad)
        ├── Login.jsx / .css      # Registro e inicio de sesión
        ├── ForgotPassword.jsx / .css # Recuperación de contraseña
        ├── Account.jsx / .css    # Perfil del usuario
        ├── Rewards.jsx / .css    # Dashboard de Huggies Rewards
        ├── Checkout.jsx / .css   # Pasarela de pago simulada
        ├── OrderSuccess.jsx / .css # Confirmación de compra exitosa
        ├── ArticleDetail.jsx / .css # Detalle para artículos del blog
        └── StoreLocator.jsx / .css # Localizador de tiendas físicas
```

---

## 🎨 Convenciones de Diseño y CSS

1. **Vanilla CSS**: El proyecto utiliza Vanilla CSS puro y estructurado. **NO se debe usar TailwindCSS**, frameworks utilitarios o librerías de componentes.
2. **Variables de Diseño (Design Tokens)**:
   - Todo color, espaciado, sombra o radio de borde debe obtenerse de `src/styles/variables.css` mediante `var(--...)`.
   - **No quemar códigos hexadecimales** en los `.css`.
3. **Responsive Web Design**:
   - Todo componente debe verse excelente desde 320px hasta 1440px.
   - Apilar elementos en móviles usando `@media (max-width: 480px)`.
   - Los modales en móviles deben ajustar padding y definir límites de altura con scroll.

---

## ₡ Reglas de Negocio Específicas

1. **Precios en Colones Costarricenses**:
   - Moneda: Colón costarricense (`₡`). Formato: `es-CR`.
   - `const formatPrice = (amount) => "₡" + amount.toLocaleString('es-CR');`
2. **Productos sin Talla**:
   - Categorías como *Toallitas húmedas* y *Cuidado de la piel* tienen `size: null`.
   - El filtro de tallas debe ocultarse dinámicamente si se seleccionan estas categorías.
3. **Sección "Hugs" (Zona Restringida)**:
   - El apartado de Hugs (comunidad de estilo feed vertical) no debe tener Footer.
   - **REGLA ESTRICTA**: NO se debe añadir ningún elemento, componente, o lógica adicional a este apartado a menos que el usuario lo confirme y solicite personal y explícitamente.

---

## ⚡ Calidad de Código y Estándares de React 19

1. **Componentes Puros**: Evitar llamadas impuras (`Date.now()`, `Math.random()`) dentro del render.
2. **Gestión de Estado Eficiente**: Evitar setters de estado síncronos en `useEffect` que puedan causar re-renders en cascada.
3. **Fast Refresh**: Exportar solo componentes de React en archivos `.jsx`. Lógicas, constantes, y hooks se extraen a `/utils`, `/data` y `/hooks`.
4. **Lazy Loading**: Rutas grandes con `React.lazy` y `<Suspense>`.

---

## 🚀 Últimos Cambios y Avances Recientes

1. **Sección "Hugs" (`Hugs.jsx`, `HugCard.jsx`, `HugComments.jsx`)**:
   - Introducción de un entorno tipo red social interactivo para la comunidad de padres, con tarjetas de posteos de otros padres (Hugs) y secciones de comentarios independientes.
2. **Componentes Home Evolucionados**:
   - Se agregaron `BabyDashboard`, `ProductMarquee` y `UserRegistrationPromo` para hacer la página de inicio más dinámica, interactiva y enfocada en el crecimiento actual del bebé.
3. **Tutorial y Utilidades Visuales (`AppTutorial`, `CustomDatePicker`)**:
   - Introducción de un tutorial guiado (`AppTutorial`) para que los usuarios aprendan a usar la app.
   - Selector de fechas optimizado (`CustomDatePicker`) para registro de nacimiento.
4. **Modularización Avanzada**:
   - Extracción de toda la lógica de filtrado a `src/hooks/useProductFilters.js`.
   - Extracción de la lógica de IA a `src/utils/aiChatService.js`.
   - Nuevos archivos de datos (`developmentalStages.js`, `hugsData.js`) para sostener las nuevas características de la app.
5. **Manejo de Errores y UI**:
   - Se mantienen las mejoras en estabilidad con `ErrorBoundary` y la compatibilidad estricta con React 19. Incorporación de iconos con `lucide-react`.
