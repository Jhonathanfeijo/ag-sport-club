const ModalConfirmAlterReservStatus = ({ myReservs, action, setMyReservs, reserv, setIsModalConfirmAlterReservStatusOpen }) => {


    const alterReservsState = (action) => {
        let reservAux = { ...reserv };
        reservAux.status = action === "delete" ? "CANCELADO" : "PAGO";
        console.log(reservAux);
        setIsModalConfirmAlterReservStatusOpen(false)
    }

    return (<>

        <div className="w-full h-full absolute flex flex-row justify-center items-center top-0 left-0 bg-third/15">
            <div className="px-10 py-6 bg-secundary rounded drop-shadow-lg shadow-lg flex flex-col">
                <h1 className="font-bold text-left text-2xl text-primary mb-2">{`Você deseja realmente ${action === "pay" ? "pagar" : "cancelar"} essa reserva?`}</h1>
                <span className="self-center underline my-4 text-lg">{`Quadra ${reserv.quadraLoc} - Data: ${reserv.dataLocacao} às ${reserv.horarioInicial}:00 - ${reserv.horarioInicial + 1}:00`}</span>
                <div className="flex flex-row self-end items-end mt-3 gap-2 font-normal">
                    <button className="bg-primary text-secundary rounded px-3 py-1" type="button" onClick={() => setIsModalConfirmAlterReservStatusOpen(false)}>Fechar</button>
                    <button className={`${action === 'delete'? 'bg-danger/70':'bg-sucess'} text-secundary rounded px-3 py-1`} type="button" onClick={() => alterReservsState(action)}>{`${action === "delete"?"Cancelar":"Pagar"}`}</button>
                </div>
            </div>
        </div>
    </>)
}

export default ModalConfirmAlterReservStatus