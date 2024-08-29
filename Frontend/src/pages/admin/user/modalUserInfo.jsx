import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';
import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

const ModalUserInfo = ({ setIsModalUserInfoOpen, userInfo, setRender }) => {


    return (<>
        <div className='w-screen h-screen bg-third/15 fixed top-0 left-0 flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, x: -15 }}
                exit={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className='bg-secundary w-[500px] max-w-[100vw] rounded shadow-lg drop-shadow-lg flex flex-col p-3'>
                    <h1 className='text-xl font-bold'>Informações do usuario</h1>
                    <form className='w-full flex flex-row gap-3 items-center my-3 font-medium flex-wrap' action="">
                        <div className='flex flex-col'>
                            <label htmlFor="">Nome</label>
                            <input className='p-1 rounded border' value={capitalizeFirstLetter(userInfo.nome)} type="text" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">CPF</label>
                            <input className='rounded border p-1' value={userInfo.cpf} type="text" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Email</label>
                            <input className='rounded border p-1' value={userInfo.email} type="text" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Login</label>
                            <input className='rounded border p-1' value={userInfo.login} type="text" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Nivel de permissão</label>
                            <input className='rounded border p-1' value={userInfo.nivelPermissao.toUpperCase()} type="text" />
                        </div>
                    </form>
                    <div className='self-end'>
                        <button onClick={() => setIsModalUserInfoOpen(false)} className='rounded px-2 py-1 font-medium text-lg' type='button'>Fechar</button>
                    </div>
                </div>
            </motion.div>
        </div>
    </>)
}

export default ModalUserInfo;