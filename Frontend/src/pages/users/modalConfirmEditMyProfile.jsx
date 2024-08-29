import { motion } from 'framer-motion'
import { getUserLocalStorage } from '../../utils/userProvider';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
const ModalConfirmEditMyProfile = ({ setIsModalConfirmEditMyProfileOpen, userInfo, setRender }) => {

  const editUser = () => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'applcation/json',
      Authorization: `Bearer ${user.token.replace('"').replace('"')}`,
    };


    const putData = async () => {
      const toastId = toast.loading('Atualizando informacoes', {
        style: { fontWeight: 'bold' },
      });
      await api
        .put('usuario/'+user.idUser, userInfo, headers)
        .then(() => {
          toast.update(toastId, {
            render: 'Informacoes atualizadas com sucesso',
            autoClose: 2500,
            type: 'success',
            isLoading: false,
            style: { fontWeight: 'bold' },
          });
          setIsModalConfirmEditMyProfileOpen(false);
          setRender((prev) => prev+1);
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
    putData();
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-third/15 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          exit={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-secundary rounded p-4 flex flex-col w-[550px] max-w-[95vw] shadow-lg drop-shadow" >
            <h2 className="mb-4 font-bold text-xl">Voce tem certeza que deseja atualizar seus dados ?</h2>
            <span className='max-w-full break-words font-bold'>{`Nome: ${userInfo.nome}`}</span>
            <span className='max-w-full break-words font-bold'>{`CPF: ${userInfo.cpf}`}</span>
            <span className='max-w-full break-words font-bold'>{`Login: ${userInfo.login}`}</span>
            <div className="flex flex-row items-center font-medium self-end gap-2 mt-4"><button className='rounded px-2 py-1' onClick={() => setIsModalConfirmEditMyProfileOpen(false)}>Fechar</button><button onClick={() => editUser()} className='rounded px-2 py-1'>Atualizar</button></div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default ModalConfirmEditMyProfile