import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import './ForgotPassword.css'; // We can reuse most styles from Login.css, but we'll import its own file for specifics

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) return 'El correo electrónico es obligatorio';
        if (!emailRegex.test(val)) return 'Ingresa un correo electrónico válido';
        return '';
    };

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        setEmailError(validateEmail(val));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateEmail(email);
        if (error) {
            setEmailError(error);
            return;
        }

        // Simular envío de correo
        console.log('Enviando enlace de recuperación a:', email);
        setSubmitted(true);
    };

    return (
        <div className="auth-page forgot-password-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Recuperar Contraseña</h1>
                    <p>
                        {submitted
                            ? 'Revisa tu bandeja de entrada'
                            : 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.'}
                    </p>
                </div>

                {submitted ? (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <p>Hemos enviado un correo a <strong>{email}</strong> con instrucciones para restablecer tu contraseña.</p>
                        <Link to="/login" className="back-link-btn">
                            <Button variant="primary" className="full-width mt-4">Volver al inicio de sesión</Button>
                        </Link>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={handleEmailChange}
                                className={emailError ? 'input-error' : ''}
                            />
                            {emailError && <span className="error-text">{emailError}</span>}
                        </div>

                        <Button variant="primary" size="large" className="submit-btn" type="submit">
                            Enviar Enlace
                        </Button>
                    </form>
                )}

                {!submitted && (
                    <div className="auth-footer mt-4">
                        <p>
                            ¿Recuerdas tu contraseña? <Link to="/login" className="toggle-btn" style={{ textDecoration: 'none' }}>Inicia sesión</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
