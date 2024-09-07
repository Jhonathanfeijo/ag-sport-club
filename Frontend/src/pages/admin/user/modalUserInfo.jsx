import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import ModalConfirmAlterUserRole from './modalConfirmAlterUserRole';
import { useEffect, useState } from 'react';

const ModalUserInfo = ({ setIsModalUserInfoOpen, userInfo, setRender, setUserInfo }) => {

  const [isModalAlterUserRoleOpen, setIsModalAlterUserRoleOpen] = useState(false);
  const [userEditable, setUserEditable] = useState();

  useEffect(() => {
    setUserEditable(userInfo)
  }, [])

  return (
    <>
      {userEditable &&
        (<>
          <div className='w-screen h-screen bg-third/15 fixed top-0 left-0 flex justify-center items-center'>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              exit={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='bg-secundary w-[500px] max-w-[100vw] rounded shadow-lg drop-shadow-lg flex flex-col p-3'>
                <h1 className='text-xl font-bold'>Informações do usuário</h1>
                <form
                  className='w-full flex flex-row gap-3 items-center my-3 font-medium flex-wrap'
                  action=''
                >
                  <div className='flex flex-col flex-1 opacity-70'>
                    <label className='font-bold' htmlFor=''>
                      Nome
                    </label>
                    <input
                      disabled
                      className='p-1 rounded border'
                      value={capitalizeFirstLetter(userEditable.nome)}
                      type='text'
                    />
                  </div>
                  <div className='flex flex-col flex-1 opacity-70'>
                    <label className='font-bold' htmlFor=''>
                      CPF
                    </label>
                    <input
                      disabled
                      className='rounded border p-1'
                      value={userEditable.cpf}
                      type='text'
                    />
                  </div>
                  <div className='flex flex-col flex-1 opacity-70'>
                    <label className='font-bold' htmlFor=''>
                      Email
                    </label>
                    <input
                      disabled
                      className='rounded border p-1'
                      value={userEditable.email}
                      type='text'
                    />
                  </div>
                  <div className='flex flex-col flex-1 opacity-70'>
                    <label className='font-bold' htmlFor=''>
                      Login
                    </label>
                    <input
                      disabled
                      className='rounded border p-1'
                      value={userEditable.login}
                      type='text'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-bold' htmlFor=''>
                      Nivel de permissão
                    </label>
                    <select
                      onChange={(e) => setUserEditable((prev) => { return { ...prev, nivelPermissao: e.target.value } })}
                      className='rounded border p-1'
                      value={userEditable.nivelPermissao.toUpperCase()}
                      type='text'
                    >
                      <option value="USER">Usuário</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>
                </form>
                <div className='self-end'>
                  <button
                    onClick={() => setIsModalUserInfoOpen(false)}
                    className='rounded px-2 py-1 font-medium text-lg'
                    type='button'
                  >
                    Fechar
                  </button>
                  <button onClick={() => setIsModalAlterUserRoleOpen(true)} className='rounded px-2 py-1 font-medium text-lg'>Salvar</button>
                </div>
              </div>
            </motion.div>
            {isModalAlterUserRoleOpen && userEditable && <ModalConfirmAlterUserRole setIsModalOpen={setIsModalAlterUserRoleOpen} userToEdit={userEditable} setRender={setRender}></ModalConfirmAlterUserRole>}
          </div>
        </>)}
    </>
  );
};

export default ModalUserInfo;
