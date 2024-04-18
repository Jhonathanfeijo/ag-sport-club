import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api"

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

    const login = async (userData) => {
        console.log(userData)
        try {
            const response = await api.post(
                "/auth/login",
                {
                    login: userData.login, // Obtendo o valor do campo de login
                    senha: userData.senha // Obtendo o valor do campo de senha
                }
            );
            if (response.data) {
                setUserLocalStorage(response.data);
                setUser(response.data);
                navigate('/')
            } else if (response.data === '') {
                alert('Credenciais inválidas');
            }
        } catch (error) {
            if (error.response.status === 403)
                alert('Credenciais inválidas')
            if (error.response.status === 500)
                alert('Houve um erro na conexão')
        }
    };

    const logout = () => {
        setUser(null);
        setUserLocalStorage(null)
        navigate('/login');
    };

    const register = async (data) => {
        const response = await api.post("/auth/register",
            {
                primeironome: data.primeironome,
                sobrenome : data.sobrenome,
                cpf : data.cpf,
                email :  data.email,
                login : data.login,
                senha : data.senha
            }
        );
        if (response.data) {
            setUserLocalStorage(response.data);
            setUser(response.data);
            navigate('/')
        }
    }

    return (
        <UserContext.Provider value={{ user, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

// Hook personalizado para acessar o contexto do usuário
export const useUser = () => useContext(UserContext);
