import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';
import ModalAddCourt from './modalAddCourt';
import ModalDeleteCourt from './modalDeleteCourt';
import ModalEditCourt from './modalEditCourt';

const Courts = ({ editable }) => {
  const [courtList, setCourtList] = useState([]);
  const [statusDataLoading, setStatusDataLoading] = useState();
  const [isModalAddCourtOpen, setIsModalAddCourtOpen] = useState(false);
  const [isModalDeleteCourtOpen, setIsModalDeleteCourtOpen] = useState(false);
  const [idCourtDelete, setIdCourtDelete] = useState();
  const [courtToEdit, setCourtToEdit] = useState();
  const [isModalEditCourtOpen, setIsModalEditCourtOpen] = useState(false);
  const [render, setRender] = useState(1);

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api
        .get('quadra', headers)
        .then(json => {
          console.log(json);
          setCourtList(json.data);
          setStatusDataLoading('loaded');
        })
        .catch(error => {
          console.log(error);
          setStatusDataLoading('failed');
        });
    };

    fetchData();
  }, [render]);

  return (
    <motion.div
      style={{ width: '100%', height: '100vh', zIndex: 0 }}
      initial={{ opacity: 0, x: -15 }}
      exit={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='w-full'>
        {statusDataLoading === 'loaded' && (
          <>
            {courtList.length > 0 ? (
              <>
                <div className='table-container max-h-[500px] overflow-auto w-full shadow-lg drop-shadow-lg '>
                  <table className='w-full mt-3 mb-2 '>
                    <thead className='sticky z-0'>
                      <tr className='bg-primary sticky text-secundary text-left'>
                        <th className='px-2 sticky py-2 rounded-bl'>
                          Descrição
                        </th>
                        <th className='px-2 py-2'>Esporte</th>
                        <th className='px-2 py-2'>Tipo</th>
                        <th className='px-2 py-2'>Valor / Hora</th>
                        <th className='px-2 py-2'>Status</th>
                        <th className='px-2 py-2 rounded-br'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {courtList.map((court, index) => (
                        <tr
                          className={`${
                            index % 2 == 1 ? 'bg-primary/10' : ''
                          } font-bold`}
                          key={index}
                        >
                          <td className='py-2 px-2'>
                            {court.locQuadra.toUpperCase()}
                          </td>
                          <td className='py-2 px-2'>
                            {court.esporte.descricao}
                          </td>
                          <td className='py-2 px-2'>
                            {court.tipoQuadra.descricao}
                          </td>
                          <td className='py-2 px-2'>
                            {`R$ ${parseFloat(court.valorHora).toFixed(2)}`}
                          </td>
                          <td
                            className={`py-2 px-2 ${
                              !court.ativo ? 'text-danger/70' : ''
                            }`}
                          >
                            {court.ativo ? 'Ativo' : 'Inativo'}
                          </td>
                          <td className='flex flex-row items-center py-1 justify-end text-secundary px-2 gap-2 font-normal'>
                            <button
                              onClick={() => {
                                setCourtToEdit({ ...court });
                                setIsModalEditCourtOpen(true);
                              }}
                              className='bg-primary rounded py-1 px-2'
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                setIdCourtDelete(court.idQuadra);
                                setIsModalDeleteCourtOpen(true);
                              }}
                              className='bg-danger/70 rounded py-1 px-1'
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h2 className='text-primary text-center text-lg lg:text-2xl font-medium my-2 lg:mb-5'>
                  Não há nenhuma quadra registrada
                </h2>
              </>
            )}
            <button
              onClick={() => setIsModalAddCourtOpen(true)}
              className='w-full py-1.5 my-3 font-medium text-lg md:text-xl text-secundary bg-primary rounded'
            >
              Adicionar quadra
            </button>
          </>
        )}
        {statusDataLoading === 'failed' && (
          <h2 className='text-xl font-bold my-4 text-center'>
            Estamos tendo problemas internos.
            <br /> Por favor, tente novamente mais tarde
          </h2>
        )}
      </div>

      {isModalAddCourtOpen && (
        <ModalAddCourt
          setRender={setRender}
          setIsModalAddCourtOpen={setIsModalAddCourtOpen}
          setCourtList={setCourtList}
          courtList={courtList}
        />
      )}

      {isModalDeleteCourtOpen && (
        <ModalDeleteCourt
          setRender={setRender}
          idCourtDelete={idCourtDelete}
          setIsModalDeleteCourtOpen={setIsModalDeleteCourtOpen}
          setCourtList={setCourtList}
          courtList={courtList}
        />
      )}

      {isModalEditCourtOpen && (
        <ModalEditCourt
          setRender={setRender}
          setIsModalEditCourtOpen={setIsModalEditCourtOpen}
          setCourtList={setCourtList}
          courtList={courtList}
          courtToEdit={courtToEdit}
          setCourtToEdit={setCourtToEdit}
        />
      )}
    </motion.div>
  );
};

export default Courts;
