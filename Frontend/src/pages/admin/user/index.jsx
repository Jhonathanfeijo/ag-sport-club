import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';

const Users = ({ type }) => {
  const [user, setUsers] = useState([]);
  const [statusData, setStatusData] = useState();

  useEffect(() => {
    setStatusData('loading');
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api
        .get('user/', headers)
        .then(json => {
          setUsers(json.data);
          setIsDataLoaded(true);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  });

  return (
    <>
      <div className='px-2 w-[350px] max-w-full lg:w-full flex flex-col items-center '>
        <div className='mt-10 w-full sm:w-[600px] lg:w-[750px] flex flex-col items-center'>
          {statusData === 'loaded' && (
            <>
              {type === 'admin' && (
                <>
                  <div className='container-table overflow-auto w-full max-h-[500px] max-w-full flex flex-col items-center'>
                    <table className='border-collapse w-full max-w-full table-auto shadow-lg drop-shadow-lg font-bold '>
                      <thead>
                        <tr className='bg-primary text-secundary'>
                          <td className='pl-2 py-2 font-medium text-left rounded-bl'>
                            Nome
                          </td>
                          <td className='pl-2 py-2 font-medium text-left'>
                            CPF
                          </td>
                          <td className='pl-2 py-2 font-medium pr-2 text-left rounded-br'>
                            login
                          </td>
                          <td className='pl-2 py-2 font-medium pr-2 text-left rounded-br'></td>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {quadraList.map((quadra, index) => {
                          return (
                            <tr
                              className={`${
                                index % 2 === 1 ? 'bg-primary/10' : ''
                              } text-primary`}
                              key={index}
                            >
                              <td className='pl-2 py-2 pr-5 text-left'>
                                {quadra.locQuadra}
                              </td>
                              <td className='pl-2 py-2 pr-5 text-left'>
                                {quadra.tipoQuadra.descricao}
                              </td>
                              <td className='pl-2 py-2 pr-5 text-left'>
                                {quadra.esporte.descricao}
                              </td>
                              <td className='pl-2 py-2 pr-5 text-left'>{`R$ ${parseFloat(
                                quadra.valorHora,
                              ).toFixed(2)}`}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className='w-full'>
                      <Link to={'/reservas'}>
                        <button className='w-full bg-primary text-secundary rounded py-1 lg:text-xl my-2 lg:my-4 text-lg'>
                          Fazer reserva
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
