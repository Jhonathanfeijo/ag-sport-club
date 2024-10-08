import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
const UserContext = createContext();

export const setUserLocalStorage = data => {
  if (data === null) {
    localStorage.removeItem('ag-token');
  } else {
    localStorage.setItem('ag-token', JSON.stringify(data));
  }
};

export const getUserLocalStorage = () => {
  const jsonToken = localStorage.getItem('ag-token');
  if (jsonToken === null) return null;
  const tokenDecoded = jwtDecode(jsonToken);
  const user = {
    nome: tokenDecoded.nome,
    idUser: tokenDecoded.id,
    login: tokenDecoded.login,
    cpf: tokenDecoded.cpf,
    email: tokenDecoded.email,
    permissao: tokenDecoded.permissao,
    token: jsonToken,
  };
  return user;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUserLocalStorage());
  const navigate = useNavigate();

  const login = async (userData, setIsLoginSucess) => {
    console.log('a');
    try {
      const response = await api.post('/auth/login', {
        login: userData.login,
        senha: userData.senha,
      });
      if (response.data) {
        toast.success('Logado com sucesso');
        let timeoutId;
        timeoutId = setTimeout(() => {
          setUserLocalStorage(response.data.token);
          setUser(response.data);
          navigate('/');
        }, 3700);
      } else if (response.data === '') {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 400)
        toast.error('Credenciais inválidas');
      if (error.response.status === 500) toast.error('Opa, algo deu errado!');
    }
  };

  const logout = () => {
    setUser(null);
    setUserLocalStorage(null);
    navigate('/login');
  };

  const register = async (data, setRegisterSuccess) => {
    // Declaração do timeoutId fora do bloco if
    let timeoutId;

    await api.post('/auth/register', {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      login: data.login,
      senha: data.senha,
    }).then(() => { toast.success("Usuário cadastrado com sucesso", { isLoading: false, autoClose: 2500, style: { fontWeight: 'bold' } }) }).catch((error) => {
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0].defaultMessage, { isLoading: false, autoClose: 2500, style: { fontWeight: 'bold' } })
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
