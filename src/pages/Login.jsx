import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        remember: false
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Clean form and errors when switching
        setFormData({ name: '', email: '', password: '', confirmPassword: '', remember: false });
        setErrors({ name: '', email: '', password: '', confirmPassword: '' });
    };

    const validateField = (name, value, currentFormData = formData) => {
        let errorMsg = '';

        if (name === 'name' && !isLogin) {
            if (!value.trim()) errorMsg = 'El nombre es obligatorio';
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) errorMsg = 'El correo es obligatorio';
            else if (!emailRegex.test(value)) errorMsg = 'Ingresa un correo electrónico válido';
        }

        if (name === 'password') {
            if (!value) errorMsg = 'La contraseña es obligatoria';
            else if (value.length < 8) errorMsg = 'La contraseña debe tener al menos 8 caracteres';

            // If in register mode and we change password, we should also validate if it matches existing confirmPassword
            if (!isLogin && currentFormData.confirmPassword && value !== currentFormData.confirmPassword) {
                // We handle this cross-validation implicitly or during submit, but let's keep it simple here
            }
        }

        if (name === 'confirmPassword' && !isLogin) {
            if (!value) errorMsg = 'Debes confirmar tu contraseña';
            else if (value !== currentFormData.password) errorMsg = 'Las contraseñas no coinciden';
        }

        return errorMsg;
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const newData = { ...prev, [id]: val };

            // Real-time validation
            if (type !== 'checkbox') {
                const error = validateField(id, val, newData);
                setErrors(errs => ({ ...errs, [id]: error }));

                // Cross-validation: If we change 'password' while in register mode, re-validate 'confirmPassword' if it has a value
                if (id === 'password' && !isLogin && newData.confirmPassword) {
                    setErrors(errs => ({
                        ...errs,
                        confirmPassword: newData.password !== newData.confirmPassword ? 'Las contraseñas no coinciden' : ''
                    }));
                }
            }
            return newData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation
        const nameError = validateField('name', formData.name, formData);
        const emailError = validateField('email', formData.email, formData);
        const passError = validateField('password', formData.password, formData);
        const confirmPassError = validateField('confirmPassword', formData.confirmPassword, formData);

        if (emailError || passError || (!isLogin && (nameError || confirmPassError))) {
            setErrors({
                name: !isLogin ? nameError : '',
                email: emailError,
                password: passError,
                confirmPassword: !isLogin ? confirmPassError : ''
            });
            return;
        }

        console.log(isLogin ? 'Iniciando sesión con:' : 'Registrando usuario:', formData);
    };

    return (
        <div className="auth-page login-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>{isLogin ? 'Bienvenido a Huggies' : 'Únete a la Familia Huggies'}</h1>
                    <p>{isLogin ? 'Ingresa a tu cuenta para ver tus recompensas y pedidos' : 'Crea una cuenta para obtener beneficios exclusivos y recompensas'}</p>
                </div>

                <div className="auth-social">
                    <button className="social-btn google-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                            </g>
                        </svg>
                        <span>Continuar con Google</span>
                    </button>

                    <button className="social-btn apple-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.68.727-1.303 2.193-1.121 3.56 1.353.104 2.676-.533 3.408-1.548z" />
                        </svg>
                        <span>Continuar con Apple</span>
                    </button>
                </div>

                <div className="auth-divider">
                    <span>O ingresa con tu email</span>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Nombre completo</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ej. María Pérez"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'input-error' : ''}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Mínimo 8 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Repite tu contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'input-error' : ''}
                            />
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>
                    )}

                    {isLogin && (
                        <div className="form-options">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                Recordarme
                            </label>
                            <Link to="/forgot-password" className="forgot-link">¿Olvidaste tu contraseña?</Link>
                        </div>
                    )}

                    <Button variant="primary" size="large" className="submit-btn" type="submit">
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </Button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                        <button className="toggle-btn" onClick={toggleMode} type="button">
                            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
