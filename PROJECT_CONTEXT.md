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
| Estilos        | Vanilla CSS (sin Tailwind)          | —         |
| Tipografía     | Google Fonts — Inter                | —         |
| Linting        | ESLint + eslint-plugin-react-hooks  | ^9.39.1   |
| Lenguaje       | JavaScript (JSX) — **NO TypeScript**| —         |

---

## 📁 Estructura del Proyecto y Mapa de Archivos

```
huggies-web/
├── index.html                    # Punto de entrada HTML principal
├── vite.config.js                # Configuración de Vite con React
├── package.json                  # Dependencias y scripts npm (dev, build, lint)
├── eslint.config.js              # Reglas de linting de ESLint
│
├── public/                       # Assets estáticos (imágenes de fondo y productos)
│   └── product_images/           # Imágenes de productos (Supreme, Active Sec, Pants, Toallitas)
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
    │   └── dummyData.js          # Datos estáticos para landing, categorías y blogs
    │
    ├── components/               # 🧩 Componentes Reutilizables
    │   ├── home/                 # Componentes exclusivos de la página de inicio
    │   │   ├── Hero.jsx / .css                        # Banner principal con CTA
    │   │   ├── PersonalizedRecommendations.jsx / .css # Recomendaciones personalizadas según la edad del bebé
    │   │   ├── ProductCategories.jsx / .css           # Tarjetas de categorías principales
    │   │   ├── Features.jsx / .css                    # Beneficios principales de los productos
    │   │   ├── RewardsPromo.jsx / .css                # Banner promocional del programa de recompensas
    │   │   └── ArticleCarousel.jsx / .css             # Carrusel de artículos del blog
    │   │
    │   ├── layout/               # Componentes estructurales persistentes
    │   │   ├── Navbar.jsx / .css          # Barra de navegación superior
    │   │   ├── Footer.jsx / .css          # Pie de página
    │   │   └── BottomNav.jsx / .css       # Barra de navegación inferior móvil
    │   │
    │   └── ui/                   # Componentes de interfaz de usuario genéricos
    │       ├── Button.jsx / .css          # Botón personalizado con variantes
    │       ├── Card.jsx / .css            # Tarjetas contenedor con efecto hover
    │       ├── CartModal.jsx / .css       # Drawer lateral del carrito de compras
    │       ├── OnboardingWizard.jsx / .css # Modal interactivo de 5 pasos para registrar al bebé
    │       └── ScrollToTopButton.jsx / .css # Botón flotante para subir
    │
    └── pages/                    # 📄 Vistas Principales (Cargadas mediante lazy loading)
        ├── Home.jsx              # Landing Page compuesta
        ├── Products.jsx / .css   # Catálogo interactivo con filtros
        ├── ProductDetail.jsx / .css # Ficha de detalle de producto
        ├── Community.jsx / .css  # Red social (posts, likes, comentarios, crear posts)
        ├── Login.jsx / .css      # Registro e inicio de sesión
        ├── ForgotPassword.jsx / .css # Recuperación de contraseña
        ├── Account.jsx / .css    # Perfil del usuario e información editable del bebé
        ├── Rewards.jsx / .css    # Dashboard de Huggies Rewards (canje de puntos)
        ├── Checkout.jsx / .css   # Pasarela de pago simulada
        └── OrderSuccess.jsx / .css # Confirmación de compra exitosa
```

---

## 🎨 Convenciones de Diseño y CSS

1. **Vanilla CSS**: El proyecto utiliza Vanilla CSS puro y estructurado. **NO se debe usar TailwindCSS**, frameworks utilitarios o librerías de componentes (como Material UI o Bootstrap) a menos que sea explícitamente requerido.
2. **Variables de Diseño (Design Tokens)**:
   - Todo color, espaciado, sombra o radio de borde debe obtenerse de `src/styles/variables.css` mediante `var(--...)`.
   - **No quemar códigos hexadecimales** en los archivos `.css` locales de componentes (ej. usar `var(--color-primary)` en lugar de `#D32F2F`).
3. **Responsive Web Design**:
   - Todo componente debe verse excelente en un rango de pantallas desde 320px hasta 1440px.
   - Evitar `white-space: nowrap` en textos descriptivos o etiquetas que puedan empujar el ancho del contenedor en pantallas pequeñas.
   - Apilar elementos que usen `flex` o `grid` horizontal en dispositivos móviles usando `@media (max-width: 480px)`.
   - Los modales o tarjetas overlay en móviles deben ajustar su padding a `var(--spacing-md)` (16px) y definir límites de altura con scroll (`overflow-y: auto`).

---

## ₡ Reglas de Negocio Específicas

1. **Precios en Colones Costarricenses**:
   - La moneda del sitio es el colón costarricense (`₡`).
   - Los precios deben formatearse utilizando el formato local en español (`es-CR`), es decir, separador de miles con punto o coma apropiados.
   - Utilizar la función de formateo común:
     ```javascript
     const formatPrice = (amount) => `₡${amount.toLocaleString('es-CR')}`;
     ```
2. **Productos sin Talla**:
   - Ciertas categorías de productos (como *Toallitas húmedas* y artículos de *Cuidado de la piel*) tienen `size: null`.
   - Si se filtra por una categoría sin tallas, el filtro de tallas debe ocultarse dinámicamente y con transiciones visuales limpias.
   - En las vistas de producto y carrito, no debe mostrarse el texto de Talla ni Rangos de peso si el valor es nulo.

---

## ⚡ Calidad de Código y Estándares de React 19

1. **Componentes Puros (Idempotencia)**:
   - Evitar el uso de funciones impuras (como `Math.random()`, `new Date()`) directamente en el cuerpo del renderizado, ya que producen resultados inestables entre renders y activan advertencias estrictas en React 19.
   - Las claves aleatorias o identificadores únicos dinámicos deben inicializarse en un hook `useEffect` o generarse como constantes externas al ciclo de render.
2. **Gestión Eficiente del Estado (Evitar bucles de renderizado)**:
   - Evitar llamar a funciones de cambio de estado (`setState`) de forma síncrona dentro de un `useEffect` si esto puede solucionarse inicializando el estado con valores por defecto o mediante eventos directos de interacción. Esto previene re-renderizados en cascada ineficientes.
3. **Fast Refresh y Exports**:
   - Los archivos de componentes React (`.jsx`) deben exportar únicamente componentes React. Las constantes comunes o funciones auxiliares pesadas deben ubicarse en archivos JavaScript dedicados (como `src/data/` o funciones helper) para no romper el mecanismo de Fast Refresh de Vite.
4. **Optimización de Carga (Lazy Loading)**:
   - Las páginas principales dentro de `src/App.jsx` deben cargarse perezosamente utilizando `React.lazy` combinado con `<Suspense>` para mantener el bundle inicial lo más ligero y rápido posible.
5. **SEO y Semántica HTML**:
   - Utilizar etiquetas semánticas de HTML5 (`<header>`, `<section>`, `<main>`, `<article>`, `<footer>`).
   - Mantener títulos descriptivos por página y asegurar que los elementos interactivos tengan identificadores lógicos o roles accesibles.
