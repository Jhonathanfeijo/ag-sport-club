import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { getUserLocalStorage } from '../../utils/userProvider';
const Courts = () => {
  const [quadraList, setQuadraList] = useState([]);
  const [statusDataCourt, setStatusDataCourt] = useState('');

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'aplication/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };
    console.log(headers);
    const fetchData = async () => {
      await api
        .get('quadra/active', headers)
        .then(json => {
          console.log(json);
          setQuadraList(json.data);
          setStatusDataCourt('loaded')
        })
        .catch(() => {
          setStatusDataCourt('failed');
        });
    };
    fetchData();
  }, []);
  return (
    <div className='px-2 w-[350px] max-w-full lg:w-full flex flex-col items-center '>
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        exit={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='lg:mt-20 w-full sm:w-[600px] lg:w-[750px] flex flex-col items-center'>
          <h1 className='text-4xl font-bold text-center mb-5 lg:mb-9'>
            Quadras
          </h1>
          {statusDataCourt === 'loaded' && (
            <>
              {quadraList.length === 0 && (
                <h2 className='text-lg md:text-3xl font-medium '>
                  Não há quadras cadastradas
                </h2>
              )}
              {quadraList.length > 0 && (
                <>
                  <div className='grid w-full gap-2 max-[400px]:grid-cols-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[350px] overflow-auto'>
                    {quadraList.map((quadra, index) => {
                      return (
                        <div
                          className={
                            'text-secundary bg-primary rounded flex flex-col items-center justify-center hover:opacity-80 duration-200 hover:cursor-default py-6'
                          }
                          key={index}
                        >
                          <div className='text-left text-2xl font-bold'>
                            {quadra.locQuadra}
                          </div>
                          <div className='px-1'>{`${
                            quadra.esporte.descricao
                          } - R$ ${parseFloat(quadra.valorHora).toFixed(
                            2,
                          )}`}</div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <div className="w-full">
                                        <Link to={"/reservas"}>
                                            <button className="w-full bg-primary text-secundary rounded py-2 lg:text-xl my-3 lg:my-10 text-lg">Fazer reserva</button>
                                        </Link>
                                    </div>*/}
                </>
              )}
            </>
          )}
          {statusDataCourt === 'failed' && (
            <h2 className='font-medium text-2xl'>
              {' '}
              Erro de sistema. Por favor, tente mais tarde.
            </h2>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Courts;
