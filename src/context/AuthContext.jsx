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
    
    // Store an array of children
    const [childrenData, setChildrenData] = useState(() => {
        const storedChildren = localStorage.getItem('huggies_children_data');
        if (storedChildren) {
            try {
                return JSON.parse(storedChildren);
            } catch (e) {
                console.error("Error parsing children data", e);
            }
        }
        return [];
    });
    
    const [activeChildIndex, setActiveChildIndex] = useState(0);
    
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

    // Replaces the whole array
    const updateChildrenData = (newDataArray) => {
        if (!newDataArray || newDataArray.length === 0) {
            setChildrenData([]);
            setActiveChildIndex(0);
            localStorage.removeItem('huggies_children_data');
            localStorage.removeItem('huggies_onboarding_completed');
            localStorage.removeItem('huggies_tutorial_completed');
            setHasSeenTutorial(false);
        } else {
            setChildrenData(newDataArray);
            localStorage.setItem('huggies_children_data', JSON.stringify(newDataArray));
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
            childrenData, updateChildrenData,
            activeChildIndex, setActiveChildIndex,
            hasSeenTutorial, completeTutorial
        }}>
            {children}
        </AuthContext.Provider>
    );
};
