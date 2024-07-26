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
      initial={{ opacity: 0, x: -5 }}
      exit={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='h-full pt-20 flex-1 flex flex-col items-center text-left lg:items-center lg:justify-start mb-2'>
        <H1 text={`Olá, ${user.nome}`} />
        <p className='text-lg mb-5'>Seja bem vindo!</p>

        <section className='mb-12'>
          <p>Você não possui reservas próximas</p>
          <Link to={'/reservas'}>
            <Button
              text={'Reservar'}
              color={'bg-primary'}
              fontColor={'text-secundary'}
            />
          </Link>
        </section>
        <p className='text-2xl mb-2'>Sobre você</p>
        <section className='w-[500px] max-w-[100%] flex flex-col lg:flex-row flex-wrap gap-5'>
          <Table data={quadras} />
          <Table data={esportes} />
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
