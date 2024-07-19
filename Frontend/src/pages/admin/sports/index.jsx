import { useEffect, useState } from 'react';
import ModalAddSport from './modalAddSport';
import ModalDeleteSport from './modalDeleteSport';
import ModalEditSport from './modalEditSport';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';

const SportsAdmin = () => {
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
            <div className='flex flex-col items-center w-full max-w-full'>
                <div className='flex flex-col items-center my-2 w-full'>
                    {statusDataSports === "loaded" && (
                        <>
                            <div className='table-container w-full'>
                                <table className='my-1 w-full border-collapse shadow-lg drop-shadow-lg mb-2'>
                                    <thead className=''>
                                        <tr className='bg-primary text-left'>
                                            <th className='pl-2 py-2 rounded-bl text-secundary '>Nome</th>
                                            <th className='pl-2 py-2 rounded-br text-secundary '>Nome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sportList.map((sport, index) => {
                                            return <tr key={index} className={`${index % 2 !== 0 ? 'bg-primary/15' : ''} font-medium`}>
                                                <td className='pl-2 py-2 text-left'>{sport.descricao}</td>
                                                <td className='flex py-2 flex-row items-center justify-end px-2 gap-2 text-secundary'>
                                                    <button onClick={() => { setSportToEdit(sport), setIsModalEditSportOpen(true)}} className=' py-1 px-2 rounded bg-primary'>Editar</button>
                                                    <button onClick={() => {setSporteIdToDelete(sport.idEsporte), setIsModalDeleteSportOpen(true)}} className=' py-1 px-2 rounded bg-danger/70'>Deletar</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                <button onClick={() => setIsModalAddSportOpen(true)} className='px-2 py-1.5 w-full bg-primary text-lg lg:text-xl mt-2 text-secundary rounded'>Adicionar esporte</button>
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
                <ModalEditSport setIsModalEditSportOpen={setIsModalEditSportOpen} setSportList={setSportList} sportList={sportList} setSportToEdit={setSportToEdit} sportToEdit={sportToEdit}></ModalEditSport>
            )}
        </>
    );
};

export default SportsAdmin;
