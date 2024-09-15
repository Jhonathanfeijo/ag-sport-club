import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';
import ModalAddSport from './modalAddSport';
import ModalDeleteSport from './modalDeleteSport';
import ModalEditSport from './modalEditSport';

const SportsAdmin = () => {
  const [render, setRender] = useState(1);
  const [sportList, setSportList] = useState([]);
  const [statusDataSports, setStatusDataSportes] = useState('loading');
  const [isModalAddSportOpen, setIsModalAddSportOpen] = useState(false);
  const [isModalDeleteSportOpen, setIsModalDeleteSportOpen] = useState(false);
  const [sportToDelete, setSporteIdToDelete] = useState(null);
  const [sportToEdit, setSportToEdit] = useState();
  const [isModalEditSportOpen, setIsModalEditSportOpen] = useState(false);

  useEffect(() => {
    console.log('a');
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };
    const fetchData = async () => {
      await api
        .get('esporte', headers)
        .then(json => {
          setSportList(json.data);
          setStatusDataSportes('loaded');
        })
        .catch(error => {
          console.log(error);
          setStatusDataSportes('failed');
        });
    };
    fetchData();
  }, []);

  const setDeleteSport = idSport => {
    setSporteIdToDelete(idSport);
    setIsModalDeleteSportOpen(true);
  };

  return (
    <motion.div
      style={{ width: '100%' }}
      initial={{ opacity: 0, x: -15 }}
      exit={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-col items-center w-full max-w-full'>
        <div className='flex flex-col items-center my-2 w-full'>
          {statusDataSports === 'loaded' && (
            <>
              {sportList.length === 0 && (
                <>
                  <h2 className='text-lg md:text-2xl font-medium mb-3'>
                    Não há esportes cadastrados
                  </h2>
                </>
              )}
              {sportList.length > 0 && (
                <>
                  <div className='table-container overflow-auto max-h-[500px] w-full'>
                    <table className='my-1 w-full border-collapse shadow-lg drop-shadow-lg mb-2'>
                      <thead className='sticky'>
                        <tr className='bg-primary sticky text-left'>
                          <th className='pl-2 py-2 sticky rounded-bl text-secundary '>
                            Nome
                          </th>
                          <th className='pl-2 py-2 sticky text-secundary '>
                            Ativo
                          </th>
                          <th className='pl-2 py-2 sticky rounded-br text-secundary '></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sportList.map((sport, index) => {
                          return (
                            <tr
                              key={index}
                              className={`${
                                index % 2 !== 0 ? 'bg-primary/15' : ''
                              } font-bold`}
                            >
                              <td className='pl-2 py-2 text-left'>
                                {sport.descricao.toUpperCase()}
                              </td>
                              <td
                                className={`pl-2 py-2 text-left ${
                                  !sport.ativo ? 'text-danger/80' : ''
                                }`}
                              >
                                {sport.ativo ? 'Ativo' : 'Inativo'}
                              </td>
                              <td className='flex py-1 flex-row items-center justify-end px-2 gap-2 text-secundary font-normal'>
                                <button
                                  onClick={() => {
                                    setSportToEdit(sport),
                                      setIsModalEditSportOpen(true);
                                  }}
                                  className=' py-1 px-2 rounded bg-primary text-medium'
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteSport(sport);
                                  }}
                                  className=' py-1 px-1 rounded bg-danger/70 text-medium'
                                >
                                  Excluir
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
              <button
                onClick={() => setIsModalAddSportOpen(true)}
                className='px-2 py-1.5 w-full bg-primary text-lg lg:text-xl font-medium  mt-2 text-secundary rounded'
              >
                Adicionar esporte
              </button>
            </>
          )}
          {statusDataSports === 'failed' && (
            <h2 className='text-xl font-bold my-2'>
              Estamos tendo problemas internos.
              <br /> Por favor, tente novamente mais tarde.
            </h2>
          )}
        </div>
      </div>
      {isModalAddSportOpen && (
        <ModalAddSport
          setRender={setRender}
          setSportList={setSportList}
          sportList={sportList}
          setIsModalAddSportOpen={setIsModalAddSportOpen}
        ></ModalAddSport>
      )}
      {isModalDeleteSportOpen && (
        <ModalDeleteSport
          setRender={setRender}
          sportList={sportList}
          setSportList={setSportList}
          setIsModalDeleteSportOpen={setIsModalDeleteSportOpen}
          sportToDelete={sportToDelete}
        ></ModalDeleteSport>
      )}
      {isModalEditSportOpen && (
        <ModalEditSport
          setRender={setRender}
          setIsModalEditSportOpen={setIsModalEditSportOpen}
          setSportList={setSportList}
          sportList={sportList}
          setSportToEdit={setSportToEdit}
          sportToEdit={sportToEdit}
        ></ModalEditSport>
      )}
    </motion.div>
  );
};

export default SportsAdmin;
