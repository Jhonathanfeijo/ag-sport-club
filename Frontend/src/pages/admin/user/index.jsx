import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { getUserLocalStorage } from '../../../utils/userProvider';
import ModalUserInfo from './modalUserInfo';
import { Search } from 'lucide-react';

const Users = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [statusData, setStatusData] = useState();
  const [userToSee, setUserToSee] = useState();
  const [isModalToSeeMoreAboutUserOpen, setIsModalToSeeMoreAboutUserOpen] =
    useState(false);
  const [render, setRender] = useState();

  useEffect(() => {
    setStatusData('loading');
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api
        .get('usuario/all', headers)
        .then(json => {
          console.log(json);
          setUsers(json.data);
          setUsersFiltered(json.data)
          setStatusData('loaded');
        })
        .catch(error => {
          setStatusData('failed');
        });
    };
    fetchData();
  }, [render]);

  const handleFilter = (filterValue) =>{
    if(!filterValue || filterValue === ""){
      setUsersFiltered([...users])
      return;
    }
    const aux = [...users].filter((user) => user.nome.toUpperCase().includes(filterValue.toUpperCase()));
    setUsersFiltered(aux);
  }

  return (
    <>
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, x: -15 }}
        exit={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex flex-col items-center w-full max-w-full'>
          <div className='flex flex-col items-center my-2 w-full'>
            {statusData === 'loaded' && (
              <>
                {users.length === 0 && (
                  <>
                    <h2 className='text-lg md:text-2xl font-medium mb-3'>
                      Não há usuarios cadastrados
                    </h2>
                  </>
                )}
                {users.length > 0 && (
                  <>
                    <div className='flex flex-row items-center self-start rounded-lg shadow-lg drop-shadow-lg mb-2'>
                      <input onChange={(e) => handleFilter(e.target.value)} placeholder='Digite o nome' className='px-2 py-1.5' type="text" name="" id="" />
                      <div className='text-third/30 bg-secundary py-1.5 px-2'>
                        <Search width={'20px'}></Search>
                      </div>
                    </div>
                    <div className='table-container overflow-auto max-h-[500px] w-full'>
                      <table className='my-1 w-full border-collapse shadow-lg drop-shadow-lg mb-2'>
                        <thead className='sticky'>
                          <tr className='bg-primary sticky text-left'>
                            <th className='pl-2 py-2 sticky rounded-bl text-secundary '>
                              Nome
                            </th>
                            <th className='pl-2 py-2 sticky text-secundary '>
                              CPF
                            </th>
                            <th className='pl-2 py-2 sticky text-secundary '>
                              Login
                            </th>
                            <th className='pl-2 py-2 sticky rounded-br text-secundary '></th>
                          </tr>
                        </thead>
                        <tbody>
                          {usersFiltered.map((user, index) => {
                            return (
                              <tr
                                key={index}
                                className={`${index % 2 !== 0 ? 'bg-primary/15' : ''
                                  } font-bold`}
                              >
                                <td className='pl-2 py-2 text-left'>
                                  {capitalizeFirstLetter(user.nome)}
                                </td>
                                <td className={`pl-2 py-2 text-left `}>
                                  {user.cpf}
                                </td>
                                <td className={`pl-2 py-2 text-left `}>
                                  {user.login}
                                </td>
                                <td className='flex py-1 flex-row items-center justify-end px-2 gap-2 text-secundary font-normal'>
                                  <button
                                    onClick={() => {
                                      setIsModalToSeeMoreAboutUserOpen(true);
                                      setUserToSee(user);
                                    }}
                                    className='font-medium text-lg py-1 px-1 rounded bg-primary text-secundary'
                                  >
                                    Ver mais
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {/*
  <button
                onClick={() => setIsModalAddSportOpen(true)}
                className='px-2 py-1.5 w-full bg-primary text-lg lg:text-xl font-medium  mt-2 text-secundary rounded'
              >
                Adicionar usuario
              </button>
              */}
              </>
            )}
            {statusData === 'failed' && (
              <h2 className='text-xl font-bold my-2'>
                Estamos tendo problemas internos.
                <br /> Por favor, tente novamente mais tarde.
              </h2>
            )}
          </div>
        </div>
        {isModalToSeeMoreAboutUserOpen && (
          <ModalUserInfo
            setIsModalUserInfoOpen={setIsModalToSeeMoreAboutUserOpen}
            setRender={setRender}
            userInfo={userToSee}
          ></ModalUserInfo>
        )}
      </motion.div>
    </>
  );
};

export default Users;
