import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';
import ModalAddTipoQuadra from './modalAddTipoQuadra';
import ModalDeleteTipoQuadra from './modalDeleteTipoQuadra';
import ModalEditTipoQuadra from './modalEditTipoQuadra';

const TiposQuadras = () => {
  const [tiposQuadra, setTiposQuadra] = useState([]);
  const [statusDataLoading, setStatusDataLoading] = useState('loading');
  const [isModalAddTipoQuadraOpen, setIsModalAddTipoQuadraOpen] =
    useState(false);
  const [isModalDeleteTipoQuadraOpen, setIsModalDeleteTipoQuadraOpen] =
    useState(false);
  const [tipoQuadraDeleteId, setTipoQuadraDeleteId] = useState();
  const [tipoQuadraToEdit, setTipoQuadraToEdit] = useState();
  const [isModalEditTipoQuadraOpen, setIsModalEditTipoQuadraOpen] = useState();
  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token.repeat('"', '').repeat('"', '')}`,
    };
    const fetchData = async () => {
      await api
        .get('tipo_quadra', headers)
        .then(json => {
          console.log(json);
          setTiposQuadra(json.data);
          setStatusDataLoading('loaded');
        })
        .catch(error => {
          console.log(error);
          setStatusDataLoading('failed');
        });
    };
    fetchData();
  }, []);

  return (
    <motion.div
      style={{ width: '100%', height: '100vh' }}
      initial={{ opacity: 0, x: -15 }}
      exit={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='rounded w-full flex flex-col items-center'>
        {statusDataLoading === 'loaded' && (
          <>
            {tiposQuadra.length === 0 && (
              <>
                <h2 className='text-lg lg:text-2xl font-medium mt-2 mb-5'>Não há tipos de quadra cadastrado</h2>
              </>
            )}
            {tiposQuadra.length > 0 && (
              <>
                <div className='table-container max-w-[100%] w-full max-h-[320px] my-3  lg:items-start overflow-auto flex flex-col items-center'>
                  <table className='shadow-lg w-full drop-shadow-lg mb-2 '>
                    <thead className='sticky'>
                      <tr className='bg-primary sticky text-secundary rounded-b'>
                        <th className='py-2 px-2 sticky text-left rounded-bl'>
                          Descricão
                        </th>
                        <th className='py-1 sticky text-left text-primary rounded-br'>
                          Editar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiposQuadra.map((tipoQuadra, index) => {
                        return (
                          <tr
                            key={index}
                            className={`${index % 2 === 1 ? 'bg-primary/15' : ''
                              } font-bold w-full`}
                          >
                            <td className='px-2 py-2 break-words max-w-[200px]'>
                              {tipoQuadra.descricao}
                            </td>
                            <td className='px-2 py-1 font-normal break-words flex flex-row justify-end gap-2'>
                              <button
                                onClick={() => {
                                  setTipoQuadraToEdit({ ...tipoQuadra });
                                  setIsModalEditTipoQuadraOpen(true);
                                }}
                                className='bg-primary text-secundary px-2 py-1 rounded'
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => {
                                  setTipoQuadraDeleteId(tipoQuadra.idTipoQuadra);
                                  setIsModalDeleteTipoQuadraOpen(true);
                                }}
                                className='bg-danger/70 text-secundary px-1 rounded py-1'
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
              type='button'
              onClick={() => setIsModalAddTipoQuadraOpen(true)}
              className='bg-primary w-full text-secundary px-2 py-1.5 mb-2 rounded font-medium text-lg lg:text-xl'
            >
              Adicionar tipo de quadra
            </button>
          </>
        )}
            {statusDataLoading === 'failed' && (
            <h2 className='text-xl font-bold my-2'>Estamos tendo problemas internos.<br/> Por favor, tente novamente mais tarde</h2>
          )}
      </div>
      {isModalAddTipoQuadraOpen && (
        <ModalAddTipoQuadra
          setIsModalAddTipoQuadraOpen={setIsModalAddTipoQuadraOpen}
          tiposQuadra={tiposQuadra}
          setTiposQuadra={setTiposQuadra}
        ></ModalAddTipoQuadra>
      )}
      {isModalDeleteTipoQuadraOpen && (
        <ModalDeleteTipoQuadra
          tipoQuadraDeleteId={tipoQuadraDeleteId}
          tiposQuadra={tiposQuadra}
          setIsModalDeleteTipoQuadraOpen={setIsModalDeleteTipoQuadraOpen}
          setTiposQuadra={setTiposQuadra}
        ></ModalDeleteTipoQuadra>
      )}
      {isModalEditTipoQuadraOpen && (
        <ModalEditTipoQuadra
          tipoQuadraToEdit={tipoQuadraToEdit}
          tiposQuadra={tiposQuadra}
          setIsModalEditTipoQuadraOpen={setIsModalEditTipoQuadraOpen}
          setTipoQuadraToEdit={setTipoQuadraToEdit}
          setTiposQuadra={setTiposQuadra}
        ></ModalEditTipoQuadra>
      )}
    </motion.div>
  );
};

export default TiposQuadras;
