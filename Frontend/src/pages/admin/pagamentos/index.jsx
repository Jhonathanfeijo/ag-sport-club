import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';
import ModalAddPaymentType from './modalAddPaymentType';
import ModalDeletePaymentType from './modalDeletePaymentType';
import ModalEditPaymentType from './modalEditPaymentType';

const FormasPagamento = () => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [statusDataLoading, setStatusDataLoading] = useState('loading');
  const [isModalAddPaymentTypeOpen, setIsModalAddPaymentTypeOpen] =
    useState(false);
  const [isModalDeletePaymentTypeOpen, setIsModalDeletePaymentTypeOpen] =
    useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState();
  const [paymentTypeToEdit, setPaymentTypeToEdit] = useState();
  const [isModalEditPaymentTypeOpen, setIsModalEditPaymentTypeOpen] =
    useState();
  const [render, setRender] = useState(0);

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token.repeat('"', '').repeat('"', '')}`,
    };
    const fetchData = async () => {
      await api
        .get('form_pagamento', headers)
        .then(json => {
          console.log(json);
          setPaymentTypes(json.data);
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
      style={{ width: '100%' }}
      initial={{ opacity: 0, x: -5 }}
      exit={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-col items-center w-full '>
        {statusDataLoading === 'loaded' && (
          <>
            {paymentTypes.length === 0 && (
              <h2 className='font-medium text-lg md:text-2xl mt-2 mb-5'>
                Não há formas de pagamento cadastradas
              </h2>
            )}
            {paymentTypes.length > 0 && (
              <>
                <div className='table-container max-w-[100%] max-h-[500px] my-3 w-full lg:items-start overflow-auto flex flex-col items-center shadow-lg drop-shadow'>
                  <table className='shadow-lg drop-shadow-lg w-full'>
                    <thead className='font-bold sticky'>
                      <tr className='bg-primary sticky text-secundary'>
                        <th className='py-2 px-2 sticky text-left rounded-bl'>
                          Descricão
                        </th>
                        <th className='py-2 px-2 sticky text-left'>Status</th>
                        <th className='py-2 px-2 sticky text-left text-primary rounded-br'></th>
                      </tr>
                    </thead>
                    <tbody className='rounded-b'>
                      {paymentTypes.map((paymentType, index) => {
                        return (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 1 ? 'bg-primary/10' : ''
                            } font-bold w-full`}
                          >
                            <td className='px-2 py-1 break-words'>
                              {paymentType.descricao.toUpperCase()}
                            </td>
                            <td
                              className={`px-2 py-1 break-words ${
                                paymentType.ativo ? '' : ' text-danger/80'
                              }`}
                            >
                              {paymentType.ativo ? 'Ativo' : 'Inativo'}
                            </td>
                            <td className='px-2 py-1 font-normal flex flex-row justify-end gap-2 break-words'>
                              <button
                                onClick={() => {
                                  setPaymentTypeToEdit({ ...paymentType });
                                  setIsModalEditPaymentTypeOpen(true);
                                }}
                                className='bg-primary text-secundary px-2 py-1 rounded'
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => {
                                  setPaymentToDelete(paymentType);
                                  setIsModalDeletePaymentTypeOpen(true);
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
              onClick={() => setIsModalAddPaymentTypeOpen(true)}
              className='bg-primary text-secundary px-2 py-1.5 my-2 w-full rounded font-medium text-lg lg:text-xl'
            >
              Adicionar forma de pagamento
            </button>
          </>
        )}
        {statusDataLoading === 'failed' && (
          <h2 className='text-xl font-bold my-4'>
            Estamos tendo problemas internos.
            <br /> Por favor, tente novamente mais tarde.
          </h2>
        )}
      </div>
      {isModalAddPaymentTypeOpen && (
        <ModalAddPaymentType
          setRender={setRender}
          setIsModalAddPaymentTypeOpen={setIsModalAddPaymentTypeOpen}
          paymentTypes={paymentTypes}
          setPaymentTypes={setPaymentTypes}
        ></ModalAddPaymentType>
      )}
      {isModalDeletePaymentTypeOpen && (
        <ModalDeletePaymentType
          setRender={setRender}
          paymentToDelete={paymentToDelete}
          paymentTypes={paymentTypes}
          setIsModalDeletePaymentTypeOpen={setIsModalDeletePaymentTypeOpen}
          setPaymentTypes={setPaymentTypes}
        ></ModalDeletePaymentType>
      )}
      {isModalEditPaymentTypeOpen && (
        <ModalEditPaymentType
          setRender={setRender}
          paymentTypeToEdit={paymentTypeToEdit}
          setIsModalEditPaymentTypeOpen={setIsModalEditPaymentTypeOpen}
          setPaymentTypes={setPaymentTypes}
          paymentTypes={paymentTypes}
          setPaymentTypeToEdit={setPaymentTypeToEdit}
        ></ModalEditPaymentType>
      )}
    </motion.div>
  );
};

export default FormasPagamento;
