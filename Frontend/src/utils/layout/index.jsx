// Layout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userProvider';

const Layout = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Adicione um estado para controlar o carregamento

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user === null) {
        navigate('/login');
      } else {
        setLoading(false); // Marque o carregamento como concluído quando a autenticação for verificada
      }
    };

    checkAuthentication();
  }, [user, navigate]);

  // Se ainda estiver carregando, exiba uma mensagem de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver mais carregando e o usuário estiver autenticado, renderize o conteúdo da página
  return <div>{children}</div>;
};

export default Layout;