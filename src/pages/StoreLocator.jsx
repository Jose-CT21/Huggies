import React, { useState, useMemo, useRef } from 'react';
import Button from '../components/ui/Button';
import './StoreLocator.css';

// Affiliated stores selling Huggies in Costa Rica
const AFFILIATED_STORES = [
    {
        id: 's1',
        name: 'Walmart Escazú',
        chain: 'Walmart',
        type: 'Supermercado',
        province: 'San José',
        canton: 'Escazú',
        address: 'Costado oeste de Multiplaza Escazú, sobre Autopista Próspero Fernández',
        phone: '+506 2208-4000',
        hours: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas', 'Cuidado'],
        mapX: 48,
        mapY: 53,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walmart+Escazu+Costa+Rica'
    },
    {
        id: 's2',
        name: 'Auto Mercado Los Yoses',
        chain: 'Auto Mercado',
        type: 'Supermercado',
        province: 'San José',
        canton: 'San Pedro',
        address: '300 metros este de la rotonda de la Hispanidad, Los Yoses',
        phone: '+506 2280-2929',
        hours: 'Lunes a Domingo: 8:00 AM - 9:00 PM',
        productsAvailable: ['Pañales', 'Toallitas', 'Cuidado'],
        mapX: 53,
        mapY: 54,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Auto+Mercado+Los+Yoses+Costa+Rica'
    },
    {
        id: 's3',
        name: 'Masxmenos Novacentro',
        chain: 'Masxmenos',
        type: 'Supermercado',
        province: 'San José',
        canton: 'Goicoechea',
        address: 'Centro Comercial Novacentro, Guadalupe',
        phone: '+506 2283-4900',
        hours: 'Lunes a Domingo: 8:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas'],
        mapX: 55,
        mapY: 51,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mas+x+Menos+Novacentro+Costa+Rica'
    },
    {
        id: 's4',
        name: 'Farmacia Fischel San Pedro',
        chain: 'Fischel',
        type: 'Farmacia',
        province: 'San José',
        canton: 'Montes de Oca',
        address: 'Frente al costado sur del Parque de San Pedro',
        phone: '+506 2224-2424',
        hours: 'Lunes a Domingo: 24 horas',
        productsAvailable: ['Toallitas', 'Cuidado'],
        mapX: 54,
        mapY: 55,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Farmacia+Fischel+San+Pedro+Costa+Rica'
    },
    {
        id: 's5',
        name: 'Walmart Alajuela',
        chain: 'Walmart',
        type: 'Supermercado',
        province: 'Alajuela',
        canton: 'Alajuela Centro',
        address: 'Frente a la rotonda de la Katherine, Radial Francisco J. Orlich',
        phone: '+506 2441-2000',
        hours: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas', 'Cuidado'],
        mapX: 42,
        mapY: 46,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walmart+Alajuela+Costa+Rica'
    },
    {
        id: 's6',
        name: 'Auto Mercado Plaza Real',
        chain: 'Auto Mercado',
        type: 'Supermercado',
        province: 'Alajuela',
        canton: 'Alajuela',
        address: 'Centro Comercial Plaza Real, Alajuela Este',
        phone: '+506 2443-4212',
        hours: 'Lunes a Domingo: 8:00 AM - 9:00 PM',
        productsAvailable: ['Pañales', 'Toallitas', 'Cuidado'],
        mapX: 43,
        mapY: 45,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Auto+Mercado+Plaza+Real+Alajuela+Costa+Rica'
    },
    {
        id: 's7',
        name: 'Walmart Cartago',
        chain: 'Walmart',
        type: 'Supermercado',
        province: 'Cartago',
        canton: 'El Molino',
        address: 'De las ruinas de Cartago 1km al oeste, sobre Carretera Nacional 2',
        phone: '+506 2551-9200',
        hours: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas', 'Cuidado'],
        mapX: 61,
        mapY: 57,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walmart+Cartago+Costa+Rica'
    },
    {
        id: 's8',
        name: 'Masxmenos Cartago Centro',
        chain: 'Masxmenos',
        type: 'Supermercado',
        province: 'Cartago',
        canton: 'Cartago Centro',
        address: 'Avenida 2, Calle 4, frente al Mercado Municipal de Cartago',
        phone: '+506 2552-3211',
        hours: 'Lunes a Domingo: 8:00 AM - 9:30 PM',
        productsAvailable: ['Pañales', 'Toallitas', 'Cuidado'],
        mapX: 63,
        mapY: 56,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mas+x+Menos+Cartago+Costa+Rica'
    },
    {
        id: 's9',
        name: 'Farmacia La Bomba Cartago',
        chain: 'La Bomba',
        type: 'Farmacia',
        province: 'Cartago',
        canton: 'Cartago Centro',
        address: 'Costado oeste de la Basílica de Los Ángeles',
        phone: '+506 2276-8000',
        hours: 'Lunes a Domingo: 8:00 AM - 10:00 PM',
        productsAvailable: ['Toallitas', 'Cuidado'],
        mapX: 65,
        mapY: 57,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Farmacia+La+Bomba+Cartago+Costa+Rica'
    },
    {
        id: 's10',
        name: 'Walmart Heredia',
        chain: 'Walmart',
        type: 'Supermercado',
        province: 'Heredia',
        canton: 'San Francisco',
        address: 'Frente al Mall Paseo de las Flores, Heredia',
        phone: '+506 2261-3900',
        hours: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas', 'Cuidado'],
        mapX: 51,
        mapY: 47,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walmart+Heredia+Costa+Rica'
    },
    {
        id: 's11',
        name: 'Auto Mercado Heredia',
        chain: 'Auto Mercado',
        type: 'Supermercado',
        province: 'Heredia',
        canton: 'San Francisco',
        address: 'Dentro del Centro Comercial Plaza Bratsi, Heredia',
        phone: '+506 2262-4215',
        hours: 'Lunes a Domingo: 8:00 AM - 9:00 PM',
        productsAvailable: ['Pañales', 'Toallitas', 'Cuidado'],
        mapX: 49,
        mapY: 46,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Auto+Mercado+Heredia+Costa+Rica'
    },
    {
        id: 's12',
        name: 'Walmart Liberia',
        chain: 'Walmart',
        type: 'Supermercado',
        province: 'Guanacaste',
        canton: 'Liberia',
        address: 'Frente a la entrada principal de la Universidad de Costa Rica, Liberia',
        phone: '+506 2665-2400',
        hours: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas', 'Cuidado'],
        mapX: 23,
        mapY: 28,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walmart+Liberia+Costa+Rica'
    },
    {
        id: 's13',
        name: 'Super Compro Playas del Coco',
        chain: 'Super Compro',
        type: 'Minisuper',
        province: 'Guanacaste',
        canton: 'Carrillo',
        address: '150 metros oeste de la Fuerza Pública, Playas del Coco',
        phone: '+506 2670-0812',
        hours: 'Lunes a Domingo: 7:00 AM - 9:00 PM',
        productsAvailable: ['Pañales', 'Toallitas'],
        mapX: 18,
        mapY: 26,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Super+Compro+Playas+del+Coco+Costa+Rica'
    },
    {
        id: 's14',
        name: 'Walmart Limón',
        chain: 'Walmart',
        type: 'Supermercado',
        province: 'Limón',
        canton: 'Limón Centro',
        address: 'Frente a la entrada de JAPDEVA, sobre la ruta 32',
        phone: '+506 2798-2500',
        hours: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Pants', 'Toallitas', 'Cuidado'],
        mapX: 82,
        mapY: 51,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Walmart+Limon+Costa+Rica'
    },
    {
        id: 's15',
        name: 'Masxmenos Jacó',
        chain: 'Masxmenos',
        type: 'Supermercado',
        province: 'Puntarenas',
        canton: 'Garabito',
        address: 'Avenida Pastor Díaz, entrada norte de Jacó Centro',
        phone: '+506 2643-4122',
        hours: 'Lunes a Domingo: 8:00 AM - 10:00 PM',
        productsAvailable: ['Pañales', 'Toallitas', 'Cuidado'],
        mapX: 41,
        mapY: 62,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mas+x+Menos+Jaco+Costa+Rica'
    }
];

const PROVINCES = ['Todas', 'San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];
const CHAINS = ['Todas', 'Walmart', 'Auto Mercado', 'Masxmenos', 'Farmacias', 'Otros'];
const PRODUCT_TYPES = ['Todos', 'Pañales', 'Pants', 'Toallitas', 'Cuidado'];

const StoreLocator = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('Todas');
    const [selectedChain, setSelectedChain] = useState('Todas');
    const [selectedProductType, setSelectedProductType] = useState('Todos');
    
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map' (for mobile responsive toggle)
    const listContainerRef = useRef(null);

    // Filter stores based on selection
    const filteredStores = useMemo(() => {
        return AFFILIATED_STORES.filter(store => {
            const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                store.canton.toLowerCase().includes(searchTerm.toLowerCase()) ||
                store.address.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesProvince = selectedProvince === 'Todas' || store.province === selectedProvince;
            
            let matchesChain = true;
            if (selectedChain !== 'Todas') {
                if (selectedChain === 'Farmacias') {
                    matchesChain = store.chain === 'Fischel' || store.chain === 'La Bomba';
                } else if (selectedChain === 'Otros') {
                    matchesChain = store.chain !== 'Walmart' && store.chain !== 'Auto Mercado' && store.chain !== 'Masxmenos' && store.chain !== 'Fischel' && store.chain !== 'La Bomba';
                } else {
                    matchesChain = store.chain === selectedChain;
                }
            }
            
            const matchesProduct = selectedProductType === 'Todos' || store.productsAvailable.includes(selectedProductType);

            return matchesSearch && matchesProvince && matchesChain && matchesProduct;
        });
    }, [searchTerm, selectedProvince, selectedChain, selectedProductType]);

    // Derived selected store active state without useEffect
    const activeStore = useMemo(() => {
        if (!selectedStoreId) return null;
        return filteredStores.find(s => s.id === selectedStoreId) || null;
    }, [filteredStores, selectedStoreId]);



    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedProvince('Todas');
        setSelectedChain('Todas');
        setSelectedProductType('Todos');
        setSelectedStoreId(null);
    };

    return (
        <div className="store-locator-page">
            <div className="store-locator-hero">
                <div className="container">
                    <h1 className="store-locator-title">Puntos de Venta Huggies</h1>
                    <p className="store-locator-subtitle">Encuentra los comercios afiliados y supermercados más cercanos en Costa Rica donde adquirir toda la protección y suavidad de Huggies para tu bebé.</p>
                </div>
            </div>

            <div className="container store-locator-container">
                {/* Search & Filters Dashboard */}
                <div className="filter-dashboard animate-slide-up">
                    <div className="search-bar-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por cantón, dirección o nombre de comercio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>×</button>
                        )}
                    </div>

                    <div className="filters-grid">
                        <div className="filter-group">
                            <label>Provincia</label>
                            <select 
                                value={selectedProvince} 
                                onChange={(e) => setSelectedProvince(e.target.value)}
                                className="filter-select"
                            >
                                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Cadena / Comercio</label>
                            <select 
                                value={selectedChain} 
                                onChange={(e) => setSelectedChain(e.target.value)}
                                className="filter-select"
                            >
                                {CHAINS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Línea de Productos</label>
                            <select 
                                value={selectedProductType} 
                                onChange={(e) => setSelectedProductType(e.target.value)}
                                className="filter-select"
                            >
                                {PRODUCT_TYPES.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                            </select>
                        </div>

                        <div className="filter-actions-group">
                            <label>&nbsp;</label>
                            <Button 
                                variant="outline" 
                                size="small"
                                onClick={handleClearFilters}
                                className="clear-filters-btn"
                                disabled={searchTerm === '' && selectedProvince === 'Todas' && selectedChain === 'Todas' && selectedProductType === 'Todos'}
                            >
                                Limpiar Filtros
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile View Toggle Buttons */}
                <div className="mobile-view-toggle">
                    <button 
                        className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        📝 Ver Lista ({filteredStores.length})
                    </button>
                    <button 
                        className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                        onClick={() => setViewMode('map')}
                    >
                        🗺️ Ver Mapa
                    </button>
                </div>

                {/* Main Content Layout */}
                <div className="locator-layout animate-slide-up delay-100">
                    
                    {/* Left Panel: Store list */}
                    <div className={`store-list-panel ${viewMode === 'list' ? '' : 'mobile-hide'}`}>
                        <div className="panel-header">
                            <h2>Establecimientos ({filteredStores.length})</h2>
                            <p>Haz clic en una tienda para ubicarla en el mapa</p>
                        </div>

                        {filteredStores.length === 0 ? (
                            <div className="no-results-panel">
                                <span className="no-results-icon">📍</span>
                                <h3>No se encontraron comercios</h3>
                                <p>Prueba ajustando los filtros de búsqueda o restableciendo los parámetros.</p>
                                <Button variant="primary" size="small" onClick={handleClearFilters}>Ver todas las tiendas</Button>
                            </div>
                        ) : (
                            <div className="store-list-cards" ref={listContainerRef}>
                                {filteredStores.map(store => {
                                    const isSelected = activeStore?.id === store.id;
                                    return (
                                        <div 
                                            key={store.id}
                                            id={`store-card-${store.id}`}
                                            className={`store-card hover-lift ${isSelected ? 'store-card--selected' : ''}`}
                                            onClick={() => {
                                                setSelectedStoreId(store.id);
                                                if (window.innerWidth <= 768) {
                                                    setViewMode('map'); // switch to map on mobile to show marker
                                                }
                                            }}
                                        >
                                            <div className="store-card__header">
                                                <span className={`store-badge store-badge--${store.chain.toLowerCase().replace(/\s+/g, '-')}`}>
                                                    {store.chain}
                                                </span>
                                                <span className="store-province-badge">{store.province}</span>
                                            </div>
                                            <h3 className="store-card__name">{store.name}</h3>
                                            <p className="store-card__address">📍 {store.address}</p>
                                            <p className="store-card__hours">⏰ {store.hours}</p>
                                            <p className="store-card__phone">📞 {store.phone}</p>
                                            
                                            <div className="store-card__products">
                                                <strong>Disponibles:</strong>
                                                <div className="products-tags">
                                                    {store.productsAvailable.map(p => (
                                                        <span key={p} className="product-tag">{p}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="store-card__actions">
                                                <a 
                                                    href={store.googleMapsUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="directions-link"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    🚀 Cómo llegar
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Simulated Interactive Map */}
                    {/* Right Panel: Google Maps Iframe */}
                    <div className={`map-panel ${viewMode === 'map' ? '' : 'mobile-hide'}`}>
                        <iframe
                            title="Google Maps"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: 'var(--border-radius-lg)', display: 'block' }}
                            src={
                                activeStore
                                    ? `https://maps.google.com/maps?q=${encodeURIComponent(
                                          `${activeStore.name}, ${activeStore.canton}, ${activeStore.province}, Costa Rica`
                                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                                    : `https://maps.google.com/maps?q=Costa%20Rica&t=&z=8&ie=UTF8&iwloc=&output=embed`
                            }
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StoreLocator;
