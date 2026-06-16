import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button';
import './AIAssistant.css';
import { getAIResponse, getHumanAgentResponse } from '../../utils/aiChatService';

// Helper functions defined outside the component to preserve rendering purity
const getUniqueId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
const getNow = () => new Date();

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => [
        {
            id: 'init-1',
            sender: 'bot',
            text: '¡Hola! 👶 Soy Huggy, el asistente virtual de Huggies Costa Rica. Estoy aquí para resolver tus dudas sobre pañales, tallas, recompensas o nuestra página.',
            timestamp: getNow(),
            quickReplies: [
                '¿Qué pañal es mejor para recién nacido?',
                '¿Cómo funciona Huggies Rewards?',
                '¿Dónde puedo comprar?',
                'Hablar con un agente humano 👤'
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatMode, setChatMode] = useState('ai'); // 'ai' | 'handover_loading' | 'human'
    const [agentName, setAgentName] = useState('Huggy (Asistente IA)');
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

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

    // Handle Human Handover Sequence
    const startHandover = () => {
        setChatMode('handover_loading');
        setAgentName('Conectando...');
        
        setTimeout(() => {
            // Add system message
            setMessages(prev => [
                ...prev,
                {
                    id: getUniqueId('sys'),
                    sender: 'system',
                    text: 'Sofía (Servicio al Cliente) se ha unido al chat.',
                    timestamp: getNow()
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
                        id: getUniqueId('agent'),
                        sender: 'agent',
                        text: '¡Hola! Mi nombre es Sofía, de Servicio al Cliente de Huggies Costa Rica. Lamento el inconveniente y con gusto te atenderé de forma personalizada. ¿En qué te puedo ayudar hoy?',
                        timestamp: getNow()
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
            id: getUniqueId('user'),
            sender: 'user',
            text: text,
            timestamp: getNow()
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
                            id: getUniqueId('bot'),
                            sender: 'bot',
                            text: response.text,
                            timestamp: getNow()
                        }
                    ]);
                    startHandover();
                } else {
                    // Standard bot response
                    setMessages(prev => [
                        ...prev,
                        {
                            id: getUniqueId('bot'),
                            sender: 'bot',
                            text: response.text,
                            timestamp: getNow(),
                            quickReplies: response.quickReplies
                        }
                    ]);
                }
            } else if (chatMode === 'human') {
                const responseText = getHumanAgentResponse(text);
                setMessages(prev => [
                    ...prev,
                    {
                        id: getUniqueId('agent'),
                        sender: 'agent',
                        text: responseText,
                        timestamp: getNow()
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
            <div className={`chat-window ${isOpen ? 'chat-window--open' : ''}`}>
                
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
