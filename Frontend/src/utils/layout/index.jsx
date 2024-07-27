// Layout.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../userProvider';
import Header from '../../components/header';
import { getUserLocalStorage } from '../userProvider';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { setUser, user, logout } = useUser();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getUserLocalStorage();
      if (token === null) {
        logout();
      } else {
        setUser(token)
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-screen max-w-[100%] lg:h-screen flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-start text-primary gap-10 md:gap-0">
      <Header nivel_permissao={user.permissao} />
      {children}
    </div>
  )
};

export default Layout;