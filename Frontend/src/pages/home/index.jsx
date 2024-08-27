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
              <table className='mb-5 flex flex-col max-w-[90vw] overflow-auto shadow-lg pb-2'>
                <caption className='text-left text-lg font-medium'>Você tem reservas próximas</caption>
                <thead className='flex flex-row bg-primary rounded text-left sticky top-0'>
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
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px] '>{`${reserv.horarioInicial < 10? `0${reserv.horarioInicial}`:`${reserv.horarioInicial}`}:00 - ${reserv.horarioInicial + 1 < 10? `0${reserv.horarioInicial+1}`:`${reserv.horarioInicial+1}`}:00`}</td>
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px] '>{reserv.descricaoQuadra}</td>
                      <td className='bg-secundary text-primary font-bold px-2 p-1 text-lg w-[150px] '>{capitalizeFirstLetter(reserv.status)}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          )}
          {(!nearReservs || nearReservs.length === 0) && (<>
            <h2 className='text-2xl font-medium my-1'>Você nao possui reservas próximas</h2>
          </>)}
          <Link to={'/reservas'}>
            <button className='bg-primary rounded px-2 text-secundary py-2 text-lg md:text-xl font-medium w-full'>Ir para o menu de reservas</button>
          </Link>
        </section>
        <h2 className='text-2xl mb-2'>Sobre você</h2>

        <section className='w-[95%]  md:w-[500px] max-w-[90vw] flex flex-col items-center lg:flex-row lg:justify-center flex-wrap gap-5 self-center'>
          <div className='flex flex-col items-center md:flex-row jus flex-wrap gap-10 justify-between'>

            {(sports && sports.length > 0) && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                exit={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='h-[170px] shadow-lg'>
                  <table className='py-1 max-h-full'>
                    <caption className='text-left font-medium text-lg'>Esportes mais praticados</caption>
                    <thead className='rounded'>
                      <tr className='bg-primary text-secundary rounded'>
                        <th className='p-1 rounded-l w-[150px]'>Nome</th>
                        <th className='p-1 rounded-r w-[80px]'>Vezes</th>
                      </tr>
                    </thead>
                    <tbody className='font-medium'>
                      {sports.map((sport, index) => {
                        return (<tr key={index}>
                          <td className='p-1 w-[150px]'>{sport.descricao}</td>
                          <td className='p-1 w-[80px]'>{sport.quantidade}</td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {(quadras && quadras.length > 0) && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                exit={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='h-[170px] shadow-lg'>
                  <table className='py-1'>
                    <caption className='text-left font-medium text-lg'>Quadras recentes</caption>
                    <thead className='rounded bg-primary'>
                      <tr className='bg-primary text-secundary rounded'>
                        <th className='p-1 rounded bg-primary w-[200px]'>Nome da quadra</th>
                      </tr>
                    </thead>
                    <tbody className='font-medium'>
                      {quadras.map((quadra, index) => {
                        return (<tr key={index}>
                          <td className='p-1 w-[200px]'>{quadra}</td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {(!sports || sports.length === 0) && (
              <h2 className='text-xl font-bold self-center'>Nenhuma reserva foi feita até o momento</h2>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
