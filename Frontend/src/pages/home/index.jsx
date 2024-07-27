import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import H1 from '../../components/h1';
import Header from '../../components/header';
import Table from '../../components/table';
import { useUser } from '../../utils/userProvider';

const Home = () => {
  const { user } = useUser();

  const quadras = [
    { 'Quadras favoritas': 'D10' },
    { 'Quadra favoritas': 'A10' },
  ];
  const esportes = [
    { 'Esportes em destaque': 'Futebol' },
    { 'Esportes em destaque': 'Volei' },
  ];

  return (
    <motion.div
      style={{ width: '100%', height: '100vh' }}
      initial={{ opacity: 0, x: -15 }}
      exit={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='h-full md:pt-20 flex-1 flex flex-col items-center text-left lg:items-center lg:justify-start mb-2'>
        <h1 className='text-3xl md:text-5xl font-medium'>{`Olá, ${user.nome}`} </h1>
        <div className='w-[330px] hidden md:block mt-3 border'></div>
        <h2 className='text-xl font-medium md:text-2xl mb-8 md:mb-14 '>Seja bem vindo!</h2>
        <section className='mb-5 md:mb-12 flex flex-col gap-2'>
          <p className='text-xl md:text-2xl font-medium'>Você não possui reservas próximas</p>
          <Link to={'/reservas'}>
            <button className='bg-primary rounded px-2 text-secundary py-2 text-lg md:text-xl font-medium w-full'>Reserve agora</button>
          </Link>
        </section>
        <h2 className='text-2xl mb-2'>Sobre você</h2>
        <section className='w-[95%] md:w-full max-w-[100%] flex flex-col items-center lg:flex-row lg:justify-center flex-wrap gap-5'>
          <Table data={quadras} />
          <Table data={esportes} />
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
