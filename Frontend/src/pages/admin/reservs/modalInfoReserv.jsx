import { motion } from "framer-motion";
const ModalInfoReserv = ({ reservInfo, setIsModalInfoOpen }) => {


    return (<>
        <div className="flex justify-center items-center top-0 left-0 w-screen h-screen bg-third/15 fixed">
            <motion.div
                initial={{ opacity: 0, x: -15 }}
                exit={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-[550px] max-w-[90vw] rounded shadow-lg drop-shadow-lg flex flex-col p-4 bg-secundary">
                    <h2 className="text-xl font-bold">Informações sobre reserva</h2>
                    <form action="" className="flex flex-row flex-wrap gap-3 font-medium my-3">
                        <div className="flex flex-col flex-1">
                            <label className="font-bold" htmlFor="">Data</label>
                            <input className="py-1 px-2 border rounded" value={reservInfo.dataLocacao} type="text" name="" id="" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold" htmlFor="">Horario</label>
                            <input className="py-1 px-2 border rounded" value={`${reservInfo.horarioInicial < 10 ? '0' + reservInfo.horarioInicial : reservInfo.horarioInicial}:00 - ${(reservInfo.horarioInicial + 1) < 10 ? "0" + (reservInfo.horarioInicial + 1) : reservInfo.horarioInicial + 1}:00`} type="text" name="" id="" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold" htmlFor="">Quadra</label>
                            <input className="py-1 px-2 border rounded" value={reservInfo.quadraLoc} type="text" name="" id="" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold" htmlFor="">Esporte</label>
                            <input className="py-1 px-2 border rounded" value={reservInfo.esporteReserva} type="text" name="" id="" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold" htmlFor="">Valor/Hora</label>
                            <input className="py-1 px-2 border rounded" value={`R$ ${parseFloat(reservInfo.valorReserva).toFixed(2)}`} type="text" name="" id="" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold" htmlFor="">Hora que foi realizada a reserva</label>
                            <input className="py-1 px-2 border rounded" value={reservInfo.realizacaoReserva} type="text" name="" id="" />
                        </div>
                        <div>
                            <div className="flex flex-col flex-1">
                                <label className="font-bold" htmlFor="">Status</label>
                                <input className="py-1 px-2 border rounded" value={reservInfo.status.toUpperCase()} type="text" name="" id="" />
                            </div>
                        </div>
                        
                    </form>
                    <div className="self-end">
                        <button type="button" onClick={() => setIsModalInfoOpen(false)} className="rounded py-1 px-2 text-lg font-medium"> Fechar</button>
                    </div>
                </div>
            </motion.div>
        </div>
    </>)
}

export default ModalInfoReserv;