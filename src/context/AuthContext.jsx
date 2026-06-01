import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [childData, setChildData] = useState(null);

    // Initial load
    useEffect(() => {
        const storedAuth = localStorage.getItem('huggies_auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setUser({ name: 'Usuario Prueba', email: 'usuario@ejemplo.com' });
        }

        const storedChild = localStorage.getItem('huggies_child_data');
        if (storedChild) {
            try {
                setChildData(JSON.parse(storedChild));
            } catch (e) {
                console.error("Error parsing child data", e);
            }
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

    const updateChildData = (newData) => {
        if (!newData) {
            setChildData(null);
            localStorage.removeItem('huggies_child_data');
            localStorage.removeItem('huggies_onboarding_completed');
        } else {
            const updated = { ...childData, ...newData };
            setChildData(updated);
            localStorage.setItem('huggies_child_data', JSON.stringify(updated));
            localStorage.setItem('huggies_onboarding_completed', 'true');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, childData, updateChildData }}>
            {children}
        </AuthContext.Provider>
    );
};
