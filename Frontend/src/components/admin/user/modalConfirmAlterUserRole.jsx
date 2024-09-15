import { toast } from "react-toastify";
import { getUserLocalStorage } from "../../../utils/userProvider";
import { api } from "../../../../services/api";
import { useEffect } from "react";

const ModalConfirmAlterUserRole = ({ userToEdit, setIsModalOpen, setRender }) => {

  useEffect(() => {
    console.log(userToEdit)
  }, [])

  const alterUserRole = () => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };
    const putData = async () => {
      let toastId = toast.loading('Alterando permissao de usuario', { loading: true });
      await api
        .put(`usuario/alterrole/${user.idUser}`, userToEdit.nivelPermissao, { headers })
        .then(json => {
          console.log(json);
          toast.update(toastId, {
            render: 'Usuário foi atualizado',
            type: 'success',
            isLoading: false,
            theme: 'colored',
            autoClose: 2000,
          });
          setIsModalOpen(false);
          setRender(prev => prev + 1);
        })
        .catch(error => {
          console.log(error);
          toast.update(toastId, {
            render: 'Algo deu errado',
            type: 'error',
            theme: 'colored',
            isLoading: false,
            autoClose: 2500,
          });
        });
    };
    putData();
  };


  return (<>
    {userToEdit && (<>
      <div className="fixed inset-0 bg-third/15 w-screen h-screen flex justify-center items-center">
        <div className="bg-secundary shadow-lg drop-shadow-lg w-[600px] max-w-[100vw] rounded p-4 flex flex-col ">
          <h2 className="text-xl font-medium">{`Você tem certeza que deseja mudar a permissão do usuário ${userToEdit.nome} para ${userToEdit.nivelPermissao === "ADMIN" ? 'administrador' : user.nivelPermissao === "USER" ? 'usuário' : ""}?`} </h2>
          <div className="mt-5 self-end flex flex-wrap flex-row gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className='rounded px-2 py-1 font-medium text-lg'
              type='button'
            >
              Voltar
            </button>
            <button onClick={() => alterUserRole()} className='rounded px-2 py-1 font-medium text-lg'>Salvar</button>
          </div>
        </div>
      </div>
    </>)}
  </>)

}

export default ModalConfirmAlterUserRole