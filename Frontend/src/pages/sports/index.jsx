import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { api } from '../../../services/api';
import H1 from '../../components/h1';
import { getUserLocalStorage } from '../../utils/userProvider';

const Sports = () => {
  const [sportList, setSportList] = useState([]);
  const [statusDataSports, setStatusDataSportes] = useState('loading');

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };
    const fetchData = async () => {
      await api
        .get('esporte/active', headers)
        .then(json => {
          setSportList(json.data);
          setStatusDataSportes('loaded');
        })
        .catch(error => {
          console.log(error);
          setStatusDataSportes('failed');
        });
    };
    fetchData();
  }, [sportList]);



  return (
    <motion.div
      style={{ width: '100%' }}
      initial={{ opacity: 0, x: -15 }}
      exit={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='md:mt-20 flex flex-col items-center w-full max-w-full'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-bold'>Esportes</h1>
        </div>
        <div className='flex flex-col items-center my-8 lg:my-10 w-full lg:w-auto lg:max-w-[850px] px-2'>
          {statusDataSports === 'loaded' && (
            <>{sportList.length === 0 && (
              <>
                <h2 className='text-lg md:text-3xl font-medium'>Não há esportes cadastrados</h2>
              </>)}
              {sportList.length > 0 && (<>
                <div className={`max-w-full lg:w-full max-h-[450px] overflow-auto md:max-h-[500px] grid ${ sportList.length === 1?"grid-cols-1" :"max-[300px]:grid-cols-1 grid-cols-2 lg:grid-cols-4"} lg:flex-wrap  lg:flex-col items-center justify-center gap-2 `}>
                  {sportList.map(sport => {
                    return (
                      <div className='bg-primary lg:w-[190px] rounded text-secundary text-lg lg:text-xl p-4 text-center flex items-center justify-center hover:cursor-pointer duration-200 hover:opacity-80 my-1'>
                        <span>{sport.descricao}</span>
                      </div>
                    );
                  })}
                </div>
              </>)}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sports;
