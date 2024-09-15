import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';

const ModalAddPaymentType = ({
  paymentTypes,
  setPaymentTypes,
  setIsModalAddPaymentTypeOpen,
  setRender,
}) => {
  const { register, handleSubmit } = useForm();

  const postPaymentType = data => {
    if (!data.descricao) {
      toast.error('Todas as informações devem ser preenchidas', {
        style: { fontWeight: 'bold' },
        autoClose: 2500,
        isLoading: false,
      });
      return;
    }

    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    console.log(headers);
    let toastId = toast.loading('Adicionando forma de pagamento', {
      isLoading: true,
    });
    const postData = async () => {
      await api
        .post('form_pagamento', data, { headers })
        .then(json => {
          console.log(json);
          toast.update(toastId, {
            render: 'A forma de pagamento foi adicionada com sucesso',
            theme: 'colored',
            autoClose: 2000,
            isLoading: false,
            type: 'success',
          });
          let paymentTypesAux = [...paymentTypes];
          paymentTypesAux.push(json.data);
          setPaymentTypes(paymentTypesAux);
          setIsModalAddPaymentTypeOpen(false);
          setRender(prev => prev + 1);
        })
        .catch(error => {
          if (error.response) {
            toast.update(toastId, {
              render: error.response.data.message,
              isLoading: false,
              autoClose: 2500,
              type: 'error',
            });
          }
        });
    };
    postData();
  };

  return (
    <>
      <div className='fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center'>
        <div className='bg-secundary md:mt-40 px-5 w-full max-w-[95%] md:w-[450px] rounded shadow-xl drop-shadow-xl'>
          <h1 className='font-bold text-2xl my-5'>
            Adicionar forma de pagamento
          </h1>
          <form
            onSubmit={handleSubmit(postPaymentType)}
            className='flex flex-col my-3'
            action=''
          >
            <label className='font-bold' htmlFor=''>
              Descrição
            </label>
            <input
              {...register('descricao')}
              id='descricao'
              name='descricao'
              className='border rounded px-2 py-1'
              type='text'
            />
            <div className='flex flex-row items-center gap-3 my-3'>
              <label className='font-bold' htmlFor='ativo'>
                Ativo
              </label>
              <label class='inline-flex items-center cursor-pointer'>
                <input
                  name='ativo'
                  id='ativo'
                  {...register('ativo')}
                  type='checkbox'
                  class='sr-only peer'
                />
                <div class="relative w-11 h-6 bg-third/20 rounded-full peer peer-focus: peer-focus: dark:peer-focus:ring-primary dark:bg-third/40 peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:end-[2px] after:bg-secundary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary/90"></div>
              </label>
            </div>
            <div className='flex flex-row mt-2 gap-2 self-end'>
              <button
                type='button'
                onClick={() => setIsModalAddPaymentTypeOpen(false)}
                className='px-2 py-1 rounded font-medium  bg-third/5 text-[#000000] '
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='px-2 py-1 rounded  bg-primary font-medium text-secundary'
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalAddPaymentType;
