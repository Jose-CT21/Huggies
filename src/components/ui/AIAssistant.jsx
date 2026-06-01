import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button';
import './AIAssistant.css';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatMode, setChatMode] = useState('ai'); // 'ai' | 'handover_loading' | 'human'
    const [agentName, setAgentName] = useState('Huggy (Asistente IA)');
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Initial messages when chatbot opens for the first time
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'init-1',
                    sender: 'bot',
                    text: '¡Hola! 👶 Soy Huggy, el asistente virtual de Huggies Costa Rica. Estoy aquí para resolver tus dudas sobre pañales, tallas, recompensas o nuestra página.',
                    timestamp: new Date(),
                    quickReplies: [
                        '¿Qué pañal es mejor para recién nacido?',
                        '¿Cómo funciona Huggies Rewards?',
                        '¿Dónde puedo comprar?',
                        'Hablar con un agente humano 👤'
                    ]
                }
            ]);
        }
    }, [messages]);

    // Scroll to bottom whenever messages list updates or typing status changes
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    // Open chat hook that can be called from global window event
    useEffect(() => {
        const handleOpenChat = () => {
            setIsOpen(true);
            setHasUnread(false);
        };
        window.addEventListener('open-huggies-chat', handleOpenChat);
        return () => window.removeEventListener('open-huggies-chat', handleOpenChat);
    }, []);

    // Toggle chat window open/closed
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setHasUnread(false);
        }
    };

    // Simulated AI response logic
    const getAIResponse = (userText) => {
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
    const getHumanAgentResponse = (userText) => {
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

    // Handle Human Handover Sequence
    const startHandover = () => {
        setChatMode('handover_loading');
        setAgentName('Conectando...');
        
        setTimeout(() => {
            // Add system message
            setMessages(prev => [
                ...prev,
                {
                    id: `sys-${Date.now()}`,
                    sender: 'system',
                    text: 'Sofía (Servicio al Cliente) se ha unido al chat.',
                    timestamp: new Date()
                }
            ]);
            setChatMode('human');
            setAgentName('Sofía (Soporte Huggies)');
            setIsTyping(true);

            // Sofia's introduction message
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [
                    ...prev,
                    {
                        id: `agent-${Date.now()}`,
                        sender: 'agent',
                        text: '¡Hola! Mi nombre es Sofía, de Servicio al Cliente de Huggies Costa Rica. Lamento el inconveniente y con gusto te atenderé de forma personalizada. ¿En qué te puedo ayudar hoy?',
                        timestamp: new Date()
                    }
                ]);
                if (!isOpen) {
                    setHasUnread(true);
                }
            }, 1000);

        }, 2500);
    };

    // Send Message handler
    const handleSendMessage = (textToSend) => {
        const text = textToSend || inputValue;
        if (!text.trim()) return;

        // Add user message to history
        const userMsg = {
            id: `user-${Date.now()}`,
            sender: 'user',
            text: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Process response after delay to simulate typing
        setTimeout(() => {
            setIsTyping(false);

            if (chatMode === 'ai') {
                const response = getAIResponse(text);
                
                if (response.type === 'trigger_handover') {
                    // Send transfer notice and start handover
                    setMessages(prev => [
                        ...prev,
                        {
                            id: `bot-${Date.now()}`,
                            sender: 'bot',
                            text: response.text,
                            timestamp: new Date()
                        }
                    ]);
                    startHandover();
                } else {
                    // Standard bot response
                    setMessages(prev => [
                        ...prev,
                        {
                            id: `bot-${Date.now()}`,
                            sender: 'bot',
                            text: response.text,
                            timestamp: new Date(),
                            quickReplies: response.quickReplies
                        }
                    ]);
                }
            } else if (chatMode === 'human') {
                const responseText = getHumanAgentResponse(text);
                setMessages(prev => [
                    ...prev,
                    {
                        id: `agent-${Date.now()}`,
                        sender: 'agent',
                        text: responseText,
                        timestamp: new Date()
                    }
                ]);
            }
        }, 1200);
    };

    // Render text with markdown link support manually
    const renderMessageText = (text) => {
        // Simple regex to parse [Label](/route) links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        // Process markdown links in response
        while ((match = linkRegex.exec(text)) !== null) {
            const matchIndex = match.index;
            // Add prefix text
            if (matchIndex > lastIndex) {
                parts.push(text.substring(lastIndex, matchIndex));
            }
            
            const linkText = match[1];
            const linkUrl = match[2];

            // Add link component
            if (linkUrl.startsWith('/')) {
                parts.push(
                    <Link 
                        key={`link-${matchIndex}`} 
                        to={linkUrl} 
                        onClick={() => setIsOpen(false)}
                        className="chat-embedded-link"
                    >
                        {linkText}
                    </Link>
                );
            } else {
                parts.push(
                    <a 
                        key={`link-${matchIndex}`} 
                        href={linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="chat-embedded-link"
                    >
                        {linkText}
                    </a>
                );
            }
            
            lastIndex = linkRegex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        // Also handle bold tags (**text**)
        return parts.length > 0 ? parts : text.split('\n').map((line, idx) => {
            const boldParts = line.split(/\*\*([^*]+)\*\*/g);
            return (
                <div key={idx} style={{ marginBottom: idx < text.split('\n').length - 1 ? '6px' : '0' }}>
                    {boldParts.map((bPart, bIdx) => {
                        if (bIdx % 2 === 1) {
                            return <strong key={bIdx}>{bPart}</strong>;
                        }
                        return bPart;
                    })}
                </div>
            );
        });
    };

    return (
        <div className="huggies-chat-widget">
            {/* Floating Bubble Button */}
            <button 
                className={`chat-bubble-btn hover-lift ${isOpen ? 'chat-bubble-btn--open' : ''}`}
                onClick={toggleChat}
                title="¿Dudas? Chat con Huggies"
                aria-label="Abrir asistente de chat"
            >
                {isOpen ? (
                    <span className="chat-bubble-icon close-icon">×</span>
                ) : (
                    <div className="bubble-content-wrap">
                        <span className="chat-bubble-icon">💬</span>
                        {hasUnread && <span className="unread-dot"></span>}
                    </div>
                )}
            </button>

            {/* Chat Window Panel */}
            <div className={`chat-window ${isOpen ? 'chat-window--open' : ''} animate-fade-in`}>
                
                {/* Chat Window Header */}
                <div className="chat-header">
                    <div className="chat-header__avatar">🧸</div>
                    <div className="chat-header__info">
                        <h3>{agentName}</h3>
                        <p className="chat-header__status">
                            <span className="status-dot"></span> {chatMode === 'human' ? 'Agente de Soporte' : 'Asistente de respuestas'}
                        </p>
                    </div>
                    <button className="chat-header__close-btn" onClick={toggleChat} title="Minimizar chat">
                        —
                    </button>
                </div>

                {/* Chat Messages Log */}
                <div className="chat-messages-container">
                    {messages.map((msg) => {
                        if (msg.sender === 'system') {
                            return (
                                <div key={msg.id} className="chat-msg chat-msg--system">
                                    <div className="chat-msg__text-wrapper">
                                        <p className="chat-msg__text">{msg.text}</p>
                                    </div>
                                </div>
                            );
                        }
                        
                        const isSelf = msg.sender === 'user';
                        return (
                            <div key={msg.id} className={`chat-msg ${isSelf ? 'chat-msg--user' : 'chat-msg--partner'}`}>
                                <div className="chat-msg__bubble">
                                    <div className="chat-msg__text">
                                        {renderMessageText(msg.text)}
                                    </div>
                                    <span className="chat-msg__time">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Handover connecting status loader */}
                    {chatMode === 'handover_loading' && (
                        <div className="chat-handover-loader animate-pulseSoft">
                            <div className="connecting-spinner"></div>
                            <span>Buscando un agente disponible...</span>
                        </div>
                    )}

                    {/* Typing bubble placeholder */}
                    {isTyping && (
                        <div className="chat-msg chat-msg--partner">
                            <div className="chat-msg__bubble typing-bubble">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick replies suggestion chips */}
                {chatMode === 'ai' && !isTyping && messages.length > 0 && messages[messages.length - 1].quickReplies && (
                    <div className="chat-quick-replies">
                        {messages[messages.length - 1].quickReplies.map((reply, index) => (
                            <button 
                                key={index} 
                                className="quick-reply-chip"
                                onClick={() => {
                                    if (reply.includes('humano') || reply.includes('agente')) {
                                        handleSendMessage('Hablar con un agente humano');
                                    } else if (reply.includes('catálogo') || reply.includes('pañales') || reply.includes('toallitas') || reply.includes('cuidado')) {
                                        navigate('/products');
                                        setIsOpen(false);
                                    } else if (reply.includes('cuenta')) {
                                        navigate('/cuenta');
                                        setIsOpen(false);
                                    } else if (reply.includes('Recompensas') || reply.includes('puntos')) {
                                        navigate('/recompensas');
                                        setIsOpen(false);
                                    } else if (reply.includes('Localizador') || reply.includes('tiendas') || reply.includes('comprar')) {
                                        navigate('/donde-comprar');
                                        setIsOpen(false);
                                    } else {
                                        handleSendMessage(reply.replace(' 👤', ''));
                                    }
                                }}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                {/* Human mode special options card */}
                {chatMode === 'human' && (
                    <div className="chat-human-contacts animate-slide-up">
                        <p>Atención directa disponible:</p>
                        <div className="contact-actions">
                            <a href="tel:+5068004844437" className="contact-action-btn phone-btn">
                                📞 800-HUGGIES
                            </a>
                            <a href="https://wa.me/50688884844" target="_blank" rel="noopener noreferrer" className="contact-action-btn whatsapp-btn">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                )}

                {/* Message input panel */}
                <form 
                    className="chat-input-area"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                >
                    <input
                        type="text"
                        placeholder={chatMode === 'handover_loading' ? 'Conectando...' : 'Escribe tu consulta aquí...'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="chat-input-field"
                        disabled={chatMode === 'handover_loading'}
                    />
                    <button 
                        type="submit" 
                        className="chat-send-btn"
                        disabled={!inputValue.trim() || chatMode === 'handover_loading'}
                        title="Enviar mensaje"
                    >
                        ➤
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIAssistant;
