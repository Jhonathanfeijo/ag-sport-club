import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export const setUserLocalStorage = (data) => {
    if (data === null) {
        localStorage.removeItem('u');
    } else {
        localStorage.setItem('u', JSON.stringify(data));
    }
}

export const getUserLocalStorage = () => {
    const json = localStorage.getItem('u');
    if (!json)
        return null

    const user = JSON.parse(json);
    return user;
}
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUserLocalStorage()); // Inicializa o estado com base no localStorage
    const navigate = useNavigate();

    const login = (userData) => {
        setUserLocalStorage(userData);
        setUser(userData);
        navigate('/')
    };

    const logout = () => {
        setUser(null);
        setUserLocalStorage(null)
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

// Hook personalizado para acessar o contexto do usuário
export const useUser = () => useContext(UserContext);
