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
      authorization: `Bearer ${user.token.repeat('"', '').repeat('"', '')}`,
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
      <div className='mt-10 lg:mt-20 ml-4 w-max-full'>
        <div className='flex flex-col'>
          <H1 text={'Esportes'}></H1>
        </div>
        <div className='flex flex-col my-5 able-container w-max-[85%]'>
          {statusDataSports === "loaded" && (
            <>
              <div className='table-container w-max-[85%]'>
                      <button onClick={() => setIsModalAddSportOpen(true)} className='px-2 py-1 self-end bg-primary text-secundary rounded'>Adicionar esporte</button>
                <table className='my-1 w-max-full border-collapse'>
                  <tr className='bg-primary text-left'>
                    <th className='pl-[0.5rem] border-collapse md:pr-[5rem] py-1 text-secundary '>Nome</th>
                    <th className='pl-[0.5rem] border-collapse md:pl-[2rem] pr-[0.5rem] text-primary'>Editar</th>
                    <th className='py-1 border-collapse text-primary '>Excluir</th>
                  </tr>
                  {sportList.map((sport, index) => {
                    return <tr key={index} className={`${index % 2 !== 0 ? 'bg-primary/15' : ''} font-medium`}>
                      <td className='pl-[0.5rem] md:pr-[5rem] py-2 text-left'>{sport.descricao}</td>
                      <td className='pl-[0.5rem] md:pl-[2rem] pr-[0.5rem] text-left'><button onClick={() =>{setSportToEdit({...sport}); setIsModalEditSportOpen(true)}} className='bg-primary text-secundary px-2 py-0.5 rounded'>Editar</button></td>
                      <td className='text-left'><button onClick={() => deleteSport(sport.idEsporte)} className='bg-danger/70 text-secundary px-2 py-0.5 rounded'>Deletar</button></td>
                    </tr>
                  })}
                </table>
              </div>
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
        <ModalEditSport setIsModalEditSportOpen={setIsModalEditSportOpen} setSportList={setSportList} sportList={sportList} setSportToEdit = {setSportToEdit} sportToEdit = {sportToEdit}></ModalEditSport>
      )}
    </>
  );
};

export default Sports;
