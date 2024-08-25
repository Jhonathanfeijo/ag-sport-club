import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalDeleteCourt = ({ setIsModalDeleteCourtOpen, idCourtDelete, courtList, setCourtList }) => {


    const deleteCourt = () => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "applcation/json",
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        }
        const toastId = toast.loading("Deletando quadra", { isLoading: true })
        const fetchData = async () => {
            await api.delete(`quadra/${idCourtDelete}`, headers)
                .then((json) => {
                    console.log(json);
                    setIsModalDeleteCourtOpen(false);
                    let courtListAux = [...courtList];
                    courtListAux = courtListAux.filter((court) => court.idQuadra != idCourtDelete);
                    setCourtList(courtListAux);
                    toast.update(toastId, {
                        type: "success",
                        autoClose: 2500,
                        render: "A quadra foi deletada com sucesso",
                        isLoading: false
                    })
                })
                .catch((error) => {
                    if(error.response){

                        toast.update(toastId, {
                            type: "error",
                            autoClose: 2500,
                            isLoading: false,
                            render: error.response.data.message,
                            style:{fontWeight:"bold"}
                        })
                    }
                })
        }
        fetchData();
    }

    return (
        <>
            <div className="w-screen h-screen fixed top-0 left-0 bg-third/10 flex flex-col justify-center md:justify-start items-center">
            <div className="bg-secundary px-3 w-[400px] md:w-[500px] max-w-[95%] flex flex-col items-start md:mt-40 rounded shadow-lg drop-shadow-lg">
                    <h2 className="font-bold text-lg mb-8 mt-2 px-2">Você deseja realmente Excluir essa quadra?</h2>
                    <div className="flex flex-row flex-wrap items-center gap-2 self-end text-secundary my-4">
                        <button type="button" className="px-2 py-1 rounded bg-primary" onClick={() => setIsModalDeleteCourtOpen(false)}>Cancelar</button>
                        <button type="button" className="px-2 py-1 rounded bg-danger/70" onClick={() => deleteCourt()}>Excluir</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDeleteCourt;