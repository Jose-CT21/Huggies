import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Initial load
    useEffect(() => {
        const storedAuth = localStorage.getItem('huggies_auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setUser({ name: 'Usuario Prueba', email: 'usuario@ejemplo.com' });
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        setUser({ name: 'Usuario Prueba', email: 'usuario@ejemplo.com' });
        localStorage.setItem('huggies_auth', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('huggies_auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
