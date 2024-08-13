import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';

const ModalResetPasswordUser = ({ setIsModalRessetPasswordUserOpen }) => {
  const { handleSubmit, register } = useForm();

  const resetPassword = data => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'applcation/json',
      Authorization: `Bearer ${user.token.replace('"').replace('"')}`,
    };
    if (data.senhaNova != data.senhaNovaRepetida) {
      toast.error('Senhas não conferem', {
        style: { fontWeight: 'bold' },
        isLoading: false,
        autoClose: 2500,
      });
      return;
    }
    const dataReset = {
      idUsuario: user.idUser,
      senhaNova: data.senhaNova,
      senhaAtual: data.senhaAtual,
    };
    console.log(data);
    console.log(dataReset);
    const postReset = async () => {
      const toastId = toast.loading('Resetando senha', {
        style: { fontWeight: 'bold' },
      });
      await api
        .post('usuario/resetPassword', dataReset, headers)
        .then(() => {
          toast.update(toastId, {
            render: 'Senha atualizada com sucesso',
            autoClose: 2500,
            type: 'success',
            isLoading: false,
            style: { fontWeight: 'bold' },
          });
        })
        .catch(err => {
          console.log(err);
          toast.update(toastId, {
            type: 'error',
            render: err.response.data.message,
            autoClose: 2500,
            isLoading: false,
            style: { fontWeight: 'bold' },
          });
        });
    };
    postReset();
  };

  return (
    <>
      <div className='h-screen w-screen fixed top-0 left-0 bg-third/15 z-50 flex justify-center items-center'>
        <div className='w-[350px] bg-secundary rounded drop-shadow-lg shadow-lg max-w-[95%] px-4'>
          <h2 className='text-xl font-bold text-center my-6'>Resetar senha</h2>
          <div>
            <form
              onSubmit={handleSubmit(resetPassword)}
              className='font-medium flex flex-col gap-2'
            >
              <div className='flex flex-col'>
                <label className='font-bold' htmlFor=''>
                  Digite a senha atual
                </label>
                <input
                  {...register('senhaAtual')}
                  name='senhaAtual'
                  id='senhaAtual'
                  className='p-1 border rounded'
                  type='password'
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold' htmlFor=''>
                  Digite a senha nova
                </label>
                <input
                  {...register('senhaNova')}
                  id='senhaNova'
                  name='senhaNova'
                  className='p-1 border rounded'
                  type='password'
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold' htmlFor=''>
                  Repita a senha nova
                </label>
                <input
                  {...register('senhaNovaRepetida')}
                  id='senhaNovaRepetida'
                  name='senhaNovaRepetida'
                  className='p-1 border rounded'
                  type='password'
                />
              </div>
              <div className='w-full flex flex-row items-end gap-2 my-10'>
                <button
                  onClick={() => setIsModalRessetPasswordUserOpen(false)}
                  type='button'
                  className='flex-1 px-2 py-1 font-medium rounded bg-primary text-secundary'
                >
                  Cancelar
                </button>
                <button className='flex-1 px-2 py-1 font-medium rounded bg-primary text-secundary'>
                  Gravar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalResetPasswordUser;
