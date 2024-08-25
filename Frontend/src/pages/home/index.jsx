import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUserLocalStorage, useUser } from '../../utils/userProvider';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

const Home = () => {
  const { user } = useUser();



  const [nearReservs, setNearReservs] = useState([]);
  const [sports, setSports] = useState([]);
  const [quadras, setQuadras] = useState([])

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api.get(`reserva/byUser/${user.idUser}/near`, headers).then(json => {
        console.log(json);
        setNearReservs(json.data);
      });
      await api.get(`esporte/byUser/${user.idUser}/popular`, headers).then(json => {
        console.log(json);
        setSports(json.data);
      });
      await api.get(`quadra/byUser/${user.idUser}/recent`, headers).then(json => {
        console.log(json);
        setQuadras(json.data);
      });
    };
    fetchData();
  }, []);

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
          {(nearReservs && nearReservs.length > 0) && (
            <div>
              <table className='mb-5 flex flex-col shadow-lg pb-2'>
                <caption className='text-left text-lg font-medium'>Você tem reservas próximas</caption>
                <thead className='flex flex-row bg-primary rounded text-left'>
                  <tr>
                    <th className='bg-primary text-secundary font-bold px-2 p-1 text-xl w-[150px] text-left rounded-l'>Data</th>
                    <th className='bg-primary text-secundary font-bold px-2 p-1 text-xl w-[150px] text-left'>Horario</th>
                    <th className='bg-primary text-secundary font-bold px-2 p-1 text-xl w-[150px] text-left'>Quadra</th>
                    <th className='bg-primary text-secundary font-bold px-2 p-1 text-xl w-[150px] text-left rounded-r'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {nearReservs.map((reserv, index) => {
                    return <tr key={index} className='text-left'>
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px]'>{reserv.data}</td>
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px] '>{`${reserv.horarioInicial}:00 - ${reserv.horarioInicial + 1}:00`}</td>
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px] '>{reserv.descricaoQuadra}</td>
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px] '>{capitalizeFirstLetter(reserv.status)}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          )}
          {(!nearReservs || nearReservs.length === 0) && (<>
            <h2 className='text-2xl font-medium my-1'>Você nao possui reservas proximas</h2>
          </>)}
          <Link to={'/reservas'}>
            <button className='bg-primary rounded px-2 text-secundary py-2 text-lg md:text-xl font-medium w-full'>Ir para o menu de reservas</button>
          </Link>
        </section>
        <h2 className='text-2xl mb-2'>Sobre você</h2>

        <section className='w-[95%] md:w-auto max-w-screen flex flex-col items-center lg:flex-row lg:justify-center flex-wrap gap-5 self-center'>
          <div className='flex flex-row flex-wrap gap-10'>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              exit={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(sports && sports.length > 0) && (
                <table className='py-1 shadow-lg'>
                  <caption className='text-left font-medium text-lg'>Esportes mais praticados</caption>
                  <thead className='rounded'>
                    <tr className='bg-primary text-secundary rounded'>
                      <th className='p-1 rounded-l w-[150px]'>Nome</th>
                      <th className='p-1 rounded-r w-[80px]'>Vezes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sports.map((sport, index) => {
                      return (<tr key={index}>
                        <td className='p-1 w-[150px]'>{sport.descricao}</td>
                        <td className='p-1 w-[80px]'>{sport.quantidade}</td>
                      </tr>)
                    })}
                  </tbody>
                </table>)}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              exit={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(quadras && quadras.length > 0) && (
                <table className='py-1 shadow-lg'>
                  <caption className='text-left font-medium text-lg'>Quadras recentes</caption>
                  <thead className='rounded bg-primary'>
                    <tr className='bg-primary text-secundary rounded'>
                      <th className='p-1 rounded bg-primary w-[200px]'>Nome da quadra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quadras.map((quadra, index) => {
                      return (<tr key={index}>
                        <td className='p-1 w-[200px]'>{quadra}</td>
                      </tr>)
                    })}
                  </tbody>
                </table>)}
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
