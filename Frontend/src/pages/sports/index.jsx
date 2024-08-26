import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { getUserLocalStorage } from '../../utils/userProvider';
import { Search } from 'lucide-react';

const Sports = () => {
  const [sportList, setSportList] = useState([]);
  const [statusDataSports, setStatusDataSportes] = useState('loading');
  const [sportListFilter, setSportListFilter] = useState();


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
          setSportListFilter(json.data)
          setStatusDataSportes('loaded');
        })
        .catch(error => {
          console.log(error);
          setStatusDataSportes('failed');
        });
    };
    fetchData();
  }, []);

  const handleFilter = (value) => {
    if (value === '') {

      setSportListFilter([...sportList]);
      return;
    }
    let aux = [...sportList];
    aux = aux.filter((sport) => sport.descricao.toUpperCase().includes(value.toUpperCase()));
    setSportListFilter(aux);
  }

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
        <div className='flex flex-col items-center my-8 lg:my-10 w-full lg:w-[850px] lg:max-w-[850px] px-2'>
          {statusDataSports === 'loaded' && (
            <>
              <div className='self-center lg:self-start mb-3 flex flex-row justify-between items-center rounded border'>
                <input onChange={(e) => handleFilter(e.target.value)} placeholder='Digite o nome do esporte' className=' rounded  p-1' type="text" />
                <div className='px-2 opacity-30'>
                  <Search width={'20px'}></Search>
                </div>
              </div>
              {sportList.length === 0 && (
                <>
                  <h2 className='text-lg md:text-3xl font-medium'>
                    Não há esportes cadastrados
                  </h2>
                </>
              )}
              {sportListFilter.length > 0 && (
                <>
                  <div
                    className={`max-w-full lg:w-full max-h-[450px] overflow-auto md:max-h-[500px] grid ${sportList.length === 1
                      ? 'grid-cols-1'
                      : 'max-[300px]:grid-cols-1 grid-cols-2 lg:grid-cols-4'
                      } lg:flex-wrap  lg:flex-col items-center justify-center gap-2 `}
                  >
                    {sportListFilter.map(sport => {
                      return (
                        <div className='bg-primary lg:w-[190px] rounded text-secundary text-lg lg:text-xl p-4 text-center flex items-center justify-center hover:cursor-pointer duration-200 hover:opacity-80 my-1'>
                          <span>{sport.descricao.toUpperCase()}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {sportListFilter.length === 0 && (
                <h2 className='w-[300px] lg:w-[500px] max-w-screen text-xl font-medium break-words'>Nenhum esporte encontrado com esse nome</h2>
              )}
            </>
          )}
          {statusDataSports === 'failed' && (
            <h2 className='font-medium text-2xl'>
              {' '}
              Erro de sistema. Por favor, tente mais tarde.
            </h2>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sports;
