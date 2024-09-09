import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { getUserLocalStorage } from '../../utils/userProvider';
import ModalResetPasswordUser from '../admin/user/modalResetPasswordUser';
import ModalConfirmEditMyProfile from './modalConfirmEditMyProfile';
import { toast } from 'react-toastify';

const Users = () => {
  const [isDataLoaded, setIsDataLoaded] = useState();
  const [userData, setUserData] = useState();
  const [isModalResetPasswordOpen, setIsModalResetPasswordOpen] = useState();
  const [render, setRender] = useState(1);
  const [isModalConfirmEditMyProfileOpen, setIsModalConfirmEditMyProfileOpen] =
    useState(false);

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
          setUserData({
            nome: json.data.nome,
            cpf: json.data.cpf,
            email: json.data.email,
            login: json.data.login,
          });
          setIsDataLoaded(true);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  }, [render]);

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
            <>
              <form
                onSubmit={() => {
                  editUser;
                }}
                className='w-[290px] max-w-full md:w-[750px] flex flex-row flex-wrap gap-3 items-end justify-center lg:justify-start'
              >
                <h2 className='w-full text-center md:text-left text-2xl font-bold'>
                  Minhas informações
                </h2>
                <div className='flex flex-col w-[290px] md:w-auto gap-1'>
                  <label className='font-bold px-1' htmlFor=''>
                    Nome
                  </label>
                  <input
                    onChange={e => {
                      setUserData(prev => {
                        return { ...prev, nome: e.target.value };
                      });
                    }}
                    name='nome'
                    id='nome'
                    className='shadow-lg drop-shadow-lg  md:w-[300px] py-2 rounded px-2'
                    value={capitalizeFirstLetter(userData.nome)}
                    htmlFor=''
                    type='text'
                  ></input>
                </div>
                <div className='flex flex-col w-[290px] md:w-auto gap-1'>
                  <label className='font-bold px-1' htmlFor=''>
                    Login
                  </label>
                  <input
                    onChange={e =>
                      setUserData(prev => {
                        return { ...prev, login: e.target.value };
                      })
                    }
                    name='login'
                    id='login'
                    className='shadow-lg drop-shadow-lg py-2  px-2 rounded md:w-[250px]'
                    value={userData.login}
                    htmlFor=''
                  ></input>
                </div>
                <div className='flex flex-col w-[290px] md:w-auto opacity-70 gap-1'>
                  <label className='font-bold px-1' htmlFor=''>
                    CPF
                  </label>
                  <input
                    disabled
                    name='cpf'
                    id='cpf'
                    className='shadow-lg drop-shadow-lg p-2 rounded md:w-[150px]'
                    value={userData.cpf}
                    htmlFor=''
                  ></input>
                </div>
                <div className='flex  justify-center items-center'>
                  <button
                    type='button'
                    onClick={() => { if (!userData.login || !userData.nome) { toast.error("Não pode haver campos em branco", { isLoading: false, autoClose: 2500, style: { fontWeight: 'bold' } }); return; } setIsModalConfirmEditMyProfileOpen(true) }}
                    className='bg-primary px-3 py-1 text-lg font-medium w-full lg:w-auto rounded text-secundary '
                  >
                    Salvar
                  </button>
                </div>
              </form>
              <div className=' w-[290px] max-w-full md:w-[750px] text-left flex flex-col items-start'>
                <h3 className='mb-4 mt-10 text-2xl self-center md:self-auto font-bold'>Segurança</h3>
                <div className='flex flex-col my-2 opacity-70'>
                  <label className='font-bold px-1' htmlFor=''>
                    Email
                  </label>
                  <input
                    disabled
                    className='shadow-lg drop-shadow-lg rounded p-2 w-[400px]'
                    value={userData.email}
                    type='text'
                  />
                </div>
                <div className='flex flex-row items-end gap-3'>
                  <button className='bg-primary roundex px-2 py-1 text-secundary rounded text-lg font-medium'>
                    Alterar email
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setIsModalResetPasswordOpen(true);
                    }}
                    className='text-lg font-medium bg-primary roundex px-2 py-1 text-secundary rounded '
                  >
                    Alterar senha
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
      {isModalResetPasswordOpen && (
        <ModalResetPasswordUser
          setIsModalRessetPasswordUserOpen={setIsModalResetPasswordOpen}
        ></ModalResetPasswordUser>
      )}
      {isModalConfirmEditMyProfileOpen && (
        <ModalConfirmEditMyProfile
          setRender={setRender}
          setIsModalConfirmEditMyProfileOpen={
            setIsModalConfirmEditMyProfileOpen
          }
          userInfo={userData}
        ></ModalConfirmEditMyProfile>
      )}
    </>
  );
};

export default Users;
