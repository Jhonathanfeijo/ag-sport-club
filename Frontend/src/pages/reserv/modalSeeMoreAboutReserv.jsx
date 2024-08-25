import { useEffect, useState } from "react";
import ModalConfirmAlterReservStatus from "./modalConfirmAlterReservStatus";

const ModalSeeMoreAboutReserv = ({ reserv, setMyReservs, myReservs, setIsModalSeeMoreAboutReservOpen }) => {

    const [isModalConfirmAlterReservStatusOpen, setIsModalConfirmAlterReservStatusOpen] = useState(false);
    const [action, setAction] = useState();

    useEffect(() => {
        console.log(reserv)
    }, [])


    return (<>
        <div className="fixed top-0 left-0 h-screen w-screen bg-third/15 flex flex-col items-center justify-center">
            <div className="bg-secundary rounded drop-shadow-xl shadow-lg p-4 sm:w-[400px] lg:w-[900px] font-bold flex flex-col items-center relative">
                {isModalConfirmAlterReservStatusOpen && (
                    <ModalConfirmAlterReservStatus setIsModalSeeMoreAboutReservOpen={setIsModalSeeMoreAboutReservOpen} action={action} myReservs={myReservs} reserv={reserv} setIsModalConfirmAlterReservStatusOpen={setIsModalConfirmAlterReservStatusOpen} setMyReservs={setMyReservs} />
                )}
                <h1 className="text-2xl my-3 text-left font-bold">Detalhes sobre a reserva</h1>
                <div className="flex flex-row flex-wrap gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="">Quadra</label>
                        <input disabled className="rounded px-1 border py-1" value={reserv.quadraLoc} type="text" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="">Tipo</label>
                        <input disabled className="rounded px-1 border py-1" value={reserv.tipoQuadra} type="text" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="">Data reservada</label>
                        <input disabled className="rounded px-1 border py-1" value={reserv.dataLocacao} type="text" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="">Horario</label>
                        <input disabled className="rounded px-1 border py-1" value={`${reserv.horarioInicial}:00 - ${reserv.horarioInicial + 1}:00`} type="text" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="">Esporte</label>
                        <input disabled className="rounded px-1 border py-1" value={reserv.esporteReserva} type="text" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="">Data efetuação da reserva</label>
                        <input disabled className="rounded px-1 border py-1" value={reserv.realizacaoReserva} type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Status</label>
                        <input disabled className="rounded px-1 border py-1" value={reserv.status.toUpperCase()} type="text" />
                    </div>
                </div>
                <div className="self-end flex flex-row items-end justify-end gap-2 my-4 font-normal w-full">
                    <button type="button" onClick={() => setIsModalSeeMoreAboutReservOpen(false)} className="bg-primary text-secundary rounded px-3 py-1">Fechar</button>
                    {reserv.status.toUpperCase() === 'PENDENTE' ?
                        (<div className="flex flex-row items-end gap-2">
                            <button type="button" onClick={() => { setAction("pay"); setIsModalConfirmAlterReservStatusOpen(true) }} className="py-1 px-3 bg-sucess rounded text-secundary">Pagar</button>
                            <button type="button" onClick={() => { setAction("delete"); setIsModalConfirmAlterReservStatusOpen(true) }} className="py-1 px-2 bg-danger/70 rounded text-secundary">Cancelar</button>
                        </div>) : (<>
                        </>)
                    }
                </div>

            </div>
        </div>
    </>)
}

export default ModalSeeMoreAboutReserv;