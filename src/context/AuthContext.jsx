import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('huggies_auth') === 'true';
    });
    const [user, setUser] = useState(() => {
        return localStorage.getItem('huggies_auth') === 'true' 
            ? { name: 'Usuario Prueba', email: 'usuario@ejemplo.com' } 
            : null;
    });
    const [childData, setChildData] = useState(() => {
        const storedChild = localStorage.getItem('huggies_child_data');
        if (storedChild) {
            try {
                return JSON.parse(storedChild);
            } catch (e) {
                console.error("Error parsing child data", e);
            }
        }
        return null;
    });
    
    // Tutorial state
    const [hasSeenTutorial, setHasSeenTutorial] = useState(() => {
        return localStorage.getItem('huggies_tutorial_completed') === 'true';
    });

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
            localStorage.removeItem('huggies_tutorial_completed');
            setHasSeenTutorial(false);
        } else {
            const updated = { ...childData, ...newData };
            setChildData(updated);
            localStorage.setItem('huggies_child_data', JSON.stringify(updated));
            localStorage.setItem('huggies_onboarding_completed', 'true');
        }
    };

    const completeTutorial = () => {
        setHasSeenTutorial(true);
        localStorage.setItem('huggies_tutorial_completed', 'true');
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, user, login, logout, 
            childData, updateChildData,
            hasSeenTutorial, completeTutorial
        }}>
            {children}
        </AuthContext.Provider>
    );
};
