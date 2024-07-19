import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalDeleteSport = ({ setIsModalDeleteSportOpen, idSport, sportList, setSportList }) => {

    const deleteSport = (idSport) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };
        const fetchData = async () => {
            const toastId = toast.loading("Excluindo esporte");
            await api.delete(`esporte/${idSport}`, {headers }).then(() => {
                toast.update(toastId, {
                    render: "Esporte deletado com sucesso",
                    type: "success",
                    theme: "colored",
                    style: {
                        fontWeight: "bold",
                    },
                    isLoading: false,
                    autoClose: 2000
                })

                let sportListAux = [...sportList];
                sportListAux = sportListAux.filter((sport) => sport.idEsporte != idSport);
                setSportList(sportListAux);
                setIsModalDeleteSportOpen(false)
            }).catch((error) => {
                toast.update(toastId, {
                    render: error.response.data.message,
                    theme: "colored",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                })
            });
        };
        fetchData();
    }

    return (

        <>
            <div className="w-screen h-screen fixed top-0 left-0 bg-third/10 flex flex-col justify-center md:justify-start items-center">
                <div className="bg-secundary px-3 w-[400px] md:w-[500px] max-w-[95%] flex flex-col items-start md:mt-40 rounded shadow-lg drop-shadow-lg">
                    <h1 className="font-bold my-6">Você deseja realmente deletar esse esporte?</h1>
                    <div className="self-end flex flex-row gap-2 my-4">
                        <button type="button" onClick={() => setIsModalDeleteSportOpen(false)} className="bg-primary text-secundary rounded px-2 py-1">Cancelar</button>
                        <button type="button" onClick={() => deleteSport(idSport)} className="bg-danger/70 text-secundary px-2 py-1 rounded">Deletar</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ModalDeleteSport;