import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api"
import { jwtDecode } from "jwt-decode";
const UserContext = createContext();

export const setUserLocalStorage = (data) => {
    if (data === null) {
        localStorage.removeItem('ag-token');
    } else {
        localStorage.setItem('ag-token', JSON.stringify(data));
    }
}

export const getUserLocalStorage = () => {
    const jsonToken = localStorage.getItem('ag-token');
    if (jsonToken === null )
        return null;
    const tokenDecoded = jwtDecode(jsonToken)
    const user = {
        nome: tokenDecoded.nome,
        idUser: tokenDecoded.id,
        login: tokenDecoded.login,
        permissao: tokenDecoded.permissao,
        token: jsonToken
    }
    return user;
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUserLocalStorage());
    const navigate = useNavigate();

    const login = async (userData, setIsLoginSucess) => {
        try {
            const response = await api.post(
                "/auth/login",
                {
                    login: userData.login,
                    senha: userData.senha
                }
            );
            if (response.data) {
                setIsLoginSucess(true)
                let timeoutId;
                timeoutId = setTimeout(() => {
                    setIsLoginSucess(false)
                    setUserLocalStorage(response.data.token);
                    setUser(response.data);
                    navigate('/')
                }, 3000);
            } else if (response.data === '') {
                alert('Credenciais inválidas');
            }
        } catch (error) {
            if (error.response.status === 403 || error.response.status === 400)
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

    const register = async (data, setRegisterSuccess) => {
        // Declaração do timeoutId fora do bloco if
        let timeoutId;

        const response = await api.post("/auth/register", {
            nome: data.nome,
            cpf: data.cpf,
            email: data.email,
            login: data.login,
            senha: data.senha,
        });

        if (response.status === 200) {
            setRegisterSuccess(true);
            timeoutId = setTimeout(() => {
                setRegisterSuccess(false);
                navigate('/home');
            }, 3000);

        } else {
            clearTimeout(timeoutId);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
