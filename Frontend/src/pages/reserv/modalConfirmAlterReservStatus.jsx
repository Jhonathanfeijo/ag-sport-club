import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { getUserLocalStorage } from "../../utils/userProvider";

const ModalConfirmAlterReservStatus = ({ myReservs, action, setMyReservs, reserv, setIsModalConfirmAlterReservStatusOpen, setIsModalSeeMoreAboutReservOpen}) => {


    const alterReservsState = (action) => {
        console.log(reserv)
        const data = { statusReserva: action === "delete"?"CANCELADO":"PAGO" };

        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        }
        const toastId = toast.loading("Atualizando reserva", { style: { fontWeight: "bold" } })
        const updateReserv = async () => {
            await api.put(`reserva/status/${reserv.idReserva}`, data, {headers})
                .then((json) => {
                    toast.update(toastId, {
                        render: `A reserva foi ${action === "delete" ? "cancelada" : "paga"} com sucesso`,
                        autoClose: 2500,
                        type: "success",
                        isLoading: false,
                        style: { fontWeight: 'bold' }
                    })
                    let myReservsAux = [...myReservs];
                    myReservsAux = myReservsAux.filter((myReservAux) => { myReservAux.idReserva != reserv.idReserva });
                    myReservsAux = [...myReservsAux, json.data];
                    setMyReservs(myReservs);
                    setIsModalSeeMoreAboutReservOpen(false);
                }).catch((error) => {
                    if (error.response) {
                        toast.update(toastId, {
                            render: error.response.data.message,
                            type: "error",
                            autoClose: 2500,
                            isLoading: false,
                            style: { fontWeight: 'bold' }
                        })
                    }
                    setIsModalConfirmAlterReservStatusOpen(false)
                })
        }
        updateReserv();
    }

    return (<>

        <div className="w-full h-full absolute flex flex-row justify-center items-center top-0 left-0 bg-third/15">
            <div className="px-10 py-6 bg-secundary rounded drop-shadow-lg shadow-lg flex flex-col">
                <h1 className="font-bold text-left text-2xl text-primary mb-2">{`Você deseja realmente ${action === "pay" ? "pagar" : "cancelar"} essa reserva?`}</h1>
                <span className="self-center underline my-4 text-lg">{`Quadra ${reserv.quadraLoc} - Data: ${reserv.dataLocacao} às ${reserv.horarioInicial}:00 - ${reserv.horarioInicial + 1}:00`}</span>
                <div className="flex flex-row self-end items-end mt-3 gap-2 font-normal">
                    <button className="bg-primary text-secundary rounded px-3 py-1" type="button" onClick={() => setIsModalConfirmAlterReservStatusOpen(false)}>Fechar</button>
                    <button className={`${action === 'delete' ? 'bg-danger/70' : 'bg-sucess'} text-secundary rounded px-3 py-1`} type="button" onClick={() => alterReservsState(action)}>{`${action === "delete" ? "Cancelar" : "Pagar"}`}</button>
                </div>
            </div>
        </div>
    </>)
}

export default ModalConfirmAlterReservStatus