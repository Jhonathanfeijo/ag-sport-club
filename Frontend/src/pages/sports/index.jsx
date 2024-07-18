import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import H1 from '../../components/h1';
import { getUserLocalStorage } from '../../utils/userProvider';
import ModalAddSport from './modalAddSport';
import ModalDeleteSport from './modalDeleteSport';
import ModalEditSport from './modalEditSport';
import { set } from 'react-hook-form';

const Sports = () => {
  const [sportList, setSportList] = useState([]);
  const [statusDataSports, setStatusDataSportes] = useState("loading");
  const [isModalAddSportOpen, setIsModalAddSportOpen] = useState(false);
  const [isModalDeleteSportOpen, setIsModalDeleteSportOpen] = useState(false)
  const [sportIdToDelete, setSporteIdToDelete] = useState(null)
  const [sportToEdit, setSportToEdit] = useState();
  const [isModalEditSportOpen, setIsModalEditSportOpen] = useState(false);
  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };
    const fetchData = async () => {
      await api.get('esporte', headers).then(json => {
        setSportList(json.data);
        setStatusDataSportes("loaded")
      }).catch((error) => {
        console.log(error);
        setStatusDataSportes("failed")
      });
    };
    fetchData();
  }, [sportList]);

  const deleteSport = (idSport) => {
    setSporteIdToDelete(idSport);
    setIsModalDeleteSportOpen(true);
  }

  return (
    <>
      <div className='mt-5 lg:mt-9 flex flex-col items-center w-full w-max-full'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-bold' >Esportes</h1>
        </div>
        <div className='flex flex-col items-center my-8 lg:my-10 w-full lg:w-[800px] px-2'>
          {statusDataSports === "loaded" && (
            <>

              <div className='w-[300px] max-w-full lg:w-full grid grid-cols-2 lg:grid-cols-4 gap-1'>
                {sportList.map((sport) => {
                  return (<div className='bg-primary lg:w-[190px] rounded text-secundary text-lg lg:text-xl p-4 text-center flex items-center justify-center hover:cursor-default duration-200 hover:opacity-80'><span>{sport.descricao}</span></div>);
                })}
              </div>
              { /*<div className='table-container w-full'>
                <table className='my-1 w-full border-collapse shadow-lg drop-shadow-lg'>
                  <thead className=''>
                    <tr className='bg-primary text-left'>
                      <th className='pl-2 py-2 rounded-b text-secundary '>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sportList.map((sport, index) => {
                      return <tr key={index} className={`${index % 2 !== 0 ? 'bg-primary/15' : ''} font-medium`}>
                        <td className='pl-2 py-2 text-left'>{sport.descricao}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
                <button onClick={() => setIsModalAddSportOpen(true)} className='hidden px-2 py-1.5 w-full bg-primary text-lg lg:text-xl mt-2 text-secundary rounded'>Adicionar esporte</button>
              </div>*/}
            </>)
          }
        </div>
      </div>
      {isModalAddSportOpen && (
        <ModalAddSport setSportList={setSportList} sportList={sportList} setIsModalAddSportOpen={setIsModalAddSportOpen}></ModalAddSport>
      )}
      {isModalDeleteSportOpen && (
        <ModalDeleteSport sportList={sportList} setSportList={setSportList} setIsModalDeleteSportOpen={setIsModalDeleteSportOpen} idSport={sportIdToDelete}></ModalDeleteSport>
      )}
      {isModalEditSportOpen && (
        <ModalEditSport setIsModalEditSportOpen={setIsModalEditSportOpen} setSportList={setSportList} sportList={sportList} setSportToEdit={setSportToEdit} sportToEdit={sportToEdit}></ModalEditSport>
      )}
    </>
  );
};

export default Sports;
