import { motion } from 'framer-motion';
import { useState } from 'react';
import Courts from './court';
import FormasPagamento from './pagamentos';
import SportsAdmin from './sports';
import TiposQuadras from './tipo_quadra';
import Users from './user';

const AdminConfig = () => {
  const [option, setOption] = useState('');

  return (
    <motion.div
      style={{ width: '100%', height: '100vh' }}
      initial={{ opacity: 0, x: -5 }}
      exit={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-col h-screen w-full items-center px-4'>
        <h1 className='text-primary text-4xl font-bold my-5 text-center lg-text-left lg:my-9'>
          Ajustes
        </h1>
        <div className='hidden lg:grid lg:grid-flow-col lg:w-[720px] gap'>
          <div
            onClick={() => setOption('esportes')}
            className={`${
              option === 'esportes' ? 'opacity-80' : ''
            } bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 rounded-l`}
          >
            <span>Esportes</span>
          </div>
          <div
            onClick={() => setOption('pagamentos')}
            className={`${
              option === 'pagamentos' ? 'opacity-80' : ''
            } bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}
          >
            <span>Formas de pagamento</span>
          </div>
          <div
            onClick={() => setOption('quadras')}
            className={`${
              option === 'quadras' ? 'opacity-80' : ''
            } bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}
          >
            <span>Quadras</span>
          </div>
          <div
            onClick={() => setOption('reservas')}
            className={`${
              option === 'reservas' ? 'opacity-80' : ''
            } bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}
          >
            <span>Reservas</span>
          </div>
          <div
            onClick={() => setOption('tipos_quadra')}
            className={`${
              option === 'tipos_quadra' ? 'opacity-80' : ''
            } bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}
          >
            <span>Tipos de quadra</span>
          </div>
          <div
            onClick={() => setOption('usuarios')}
            className={`${
              option === 'usuarios' ? 'opacity-80' : ''
            } bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 rounded-r`}
          >
            <span>Usuário</span>
          </div>
        </div>
        <div className=' w-[350px] max-w-full flex flex-row lg:hidden'>
          <select
            onChange={e => {
              setOption(e.target.value);
            }}
            name=''
            id=''
            className='bg-primary text-secundary w-full border px-1 py-1 mt-5 text-center text-xl rounded'
          >
            <option className='bg-secundary text-primary' value=''>
              Selecione
            </option>
            <option className='bg-secundary text-primary' value='esportes'>
              Esporte
            </option>
            <option className='bg-secundary text-primary' value='pagamentos'>
              Formas de pagamento
            </option>
            <option className='bg-secundary text-primary' value='quadras'>
              Quadra
            </option>
            <option className='bg-secundary text-primary' value='tipos_quadra'>
              Tipos de quadra
            </option>
            <option className='bg-secundary text-primary' value='usuarios'>
              Usuários
            </option>
          </select>
        </div>
        <div className='w-full sm:w-[600px] lg:w-[720px] flex flex-col items-center'>
          {option === 'pagamentos' && <FormasPagamento></FormasPagamento>}
          {option === 'tipos_quadra' && <TiposQuadras></TiposQuadras>}
          {option === 'esportes' && <SportsAdmin></SportsAdmin>}
          {option === 'quadras' && <Courts editable={true}></Courts>}
          {option === 'usuarios' && <Users type={'admin'}></Users>}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminConfig;
