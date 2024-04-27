// Layout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userProvider';
import Header from '../../components/header';

const Layout = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (user === null) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [user, navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-screen max-w-[100%] lg:h-screen flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-start text-primary gap-10">
      <Header />
      {children}
    </div>
  )};

export default Layout;