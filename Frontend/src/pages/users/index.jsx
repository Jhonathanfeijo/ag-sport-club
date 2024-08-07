import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';

import { getUserLocalStorage, useUser } from '../../utils/userProvider';
import ModalResetPasswordUser from '../admin/user/modalResetPasswordUser';

const Users = () => {
  const [isDataLoaded, setIsDataLoaded] = useState();
  const [userData, setUserData] = useState();
  const [isModalResetPasswordOpen, setIsModalResetPasswordOpen] = useState();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const user = getUserLocalStorage();
    console.log(user);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api
        .get(`usuario/${user.idUser}`, headers)
        .then(json => {
          console.log(json);
          setUserData(json.data);
          setIsDataLoaded(true);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const editUser = data => {};
  return (
    <>
      <motion.div
        style={{ width: '100%', height: '100vh' }}
        initial={{ opacity: 0, x: -15 }}
        exit={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='w-full md:mt-20 flex flex-col items-center'>
          <h2 className='text-4xl font-bold md:mb-10'>Meu perfil</h2>
          {isDataLoaded && isDataLoaded === true && (
            <form
              onSubmit={handleSubmit(editUser)}
              className='w-[290px] max-w-full md:w-[750px] flex flex-row flex-wrap gap-3 items-end justify-center lg:justify-start'
            >
              <div className='flex flex-col w-[290px] md:w-auto '>
                <label className='font-bold' htmlFor=''>
                  Nome
                </label>
                <input
                  onChange={e =>
                    setUserData({
                      nome: e.target.value,
                      cpf: prev.cpf,
                      email: prev.cpf,
                      login: prev,
                    })
                  }
                  {...register('nome')}
                  name='nome'
                  id='nome'
                  className='border  md:w-[300px] py-1 roundex px-2 rounded'
                  value={userData.nome}
                  htmlFor=''
                ></input>
              </div>
              <div className='flex flex-col w-[290px] md:w-auto '>
                <label className='font-bold' htmlFor=''>
                  CPF
                </label>
                <input
                  disabled
                  {...register('cpf')}
                  name='cpf'
                  id='cpf'
                  className='border py-1 roundex px-2 rounded md:w-[150px]'
                  value={userData.cpf}
                  htmlFor=''
                ></input>
              </div>
              <div className='flex flex-col w-[290px] md:w-auto '>
                <label className='font-bold' htmlFor=''>
                  Login
                </label>
                <input
                  {...register('login')}
                  name='login'
                  id='login'
                  className='border py-1 roundex px-2 rounded md:w-[250px]'
                  value={userData.login}
                  htmlFor=''
                ></input>
              </div>
              <div className='flex flex-col w-[290px] md:w-auto '>
                <label className='font-bold' htmlFor=''>
                  Email
                </label>
                <input
                  {...register('email')}
                  name='email'
                  id='email'
                  className='border py-1 roundex px-2 rounded  md:w-[300px]'
                  value={userData.email}
                  htmlFor=''
                ></input>
              </div>
              <div className='flex justify-center items-center'>
                <button className='bg-primary px-3 py-1 rounded text-secundary w-full lg:w-auto'>
                  Gravar
                </button>
              </div>
            </form>
          )}
          <div className=' w-[290px] max-w-full md:w-[750px] text-left flex flex-col items-start'>
            <h3 className='mb-4 mt-10 text-2xl font-bold'>Privacidade</h3>
            <div className='flex flex-row items-end gap-3'>
              <button className='bg-primary roundex px-2 py-1 text-secundary rounded '>
                Alterar email
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsModalResetPasswordOpen(true);
                }}
                className='bg-primary roundex px-2 py-1 text-secundary rounded '
              >
                Alterar senha
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {isModalResetPasswordOpen && (
        <ModalResetPasswordUser setIsModalRessetPasswordUserOpen={setIsModalResetPasswordOpen}></ModalResetPasswordUser>
      )}
    </>
  );
};

export default Users;
