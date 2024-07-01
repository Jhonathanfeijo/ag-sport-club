import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import H1 from '../../components/h1';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { getUserLocalStorage } from '../../utils/userProvider';
import modalAddSport from './modalAddSport';

const Sports = () => {
  const [sportList, setSportList] = useState([]);
  const [sportAdded, setSportAdded] = useState({
    name: '',
  });
  const [sportsIsLoaded, setSportesIsLoaded] = useState(false);

  useEffect(() => {
    const token = getUserLocalStorage();
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const fetchData = async () => {
      await api.get('/esporte', headers).then(json => {
        console.log('deu certo');
        console.log(json);
        setSportList(json.data.content);
        setSportesIsLoaded(true);
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <div className=' mt-20 ml-4'>
        <div className='flex flex-col'>
          <H1 text={'Esportes'}></H1>
        </div>
        <button onClick={() => modalAddSport} className='mt-5 rounded bg-primary text-secundary py-1.5 px-2.5 text-lg'>
          Adicionar esporte
        </button>
        {!sportsIsLoaded || sportList.length === 0 ? (
          <>
            <h2 className='text-primary text-lg font-medium my-3'>
              Nenhum esporte na lista, adicione um novo esporte
            </h2>
          </>
        ) : (
          <>
            {sportList.map(sport => {
              return <div>{capitalizeFirstLetter(sport.descricao)}</div>;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Sports;
