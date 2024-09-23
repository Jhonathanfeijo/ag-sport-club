import { useEffect, useState } from "react";
import { getUserLocalStorage } from "../../utils/userProvider";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from 'framer-motion'
import { normalizaDataParaInicioDoDia } from "../../utils/formatDate/formatDate";

const ModalRegisterMyReserv = ({ setRender, setMyReservs, myReservs, setIsModalRegisterMyReservsOpen }) => {

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [courtList, setCourtList] = useState([]);
    const [payments, setPayments] = useState([]);
    const [statusDateAvailable, setStatusDateAvailable] = useState("quit");
    const [hoursAvailable, setHoursAvailable] = useState([]);
    const [reserv, setReserv] = useState({
        idQuadra: "",
        idFormPagamento: "",
        dataReserva: "",
        horarioInicial: ''
    })


    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const user = getUserLocalStorage();

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        };

        const fetchData = async () => {
            try {
                const [quadraResponse, formPagamentoResponse] = await Promise.all([
                    api.get("quadra/all/available", { headers }),
                    api.get("form_pagamento/active", { headers })
                ]);
                setCourtList(quadraResponse.data);
                setPayments(formPagamentoResponse.data);
                setIsDataLoaded(true);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        fetchData();
    }, []);

    const postMyReserv = () => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        };
        if (!reserv.idQuadra || !reserv.idFormPagamento || !reserv.horarioInicial || !reserv.dataReserva) {
            toast.error('Preencha todas as informações', {
                style: { fontWeight: 'bold' },
                autoClose: 2500,
                isLoading: false,
            })
            return;
        }

        const dataAtual = normalizaDataParaInicioDoDia(new Date());
        const dataReserva = reserv.dataReserva;
        console.log(dataAtual);
        console.log(reserv.dataReserva)

        if (dataReserva < dataAtual) {
            toast.error("Não pode adicionar datas passadas", {
                style: { fontWeight: 'bold' },
                autoClose: 2500,
                isLoading: false,
            });
            return;
        }
        if (dataReserva === dataAtual) {
            toast.error("A data selecionada precisa ser no mínimo um dia após o dia atual", {
                style: { fontWeight: 'bold' },
                autoClose: 2500,
                isLoading: false,
            });
            return;
        }
        const reservJson = {
            idUsuario: user.idUser,
            idQuadra: reserv.idQuadra,
            idFormPagamento: reserv.idFormPagamento,
            horarioInicial: reserv.horarioInicial,
            dataReserva: reserv.dataReserva
        }

        const postData = async () => {
            const toastId = toast.loading("Registrando reserva", { isLoading: true })
            await api.post("reserva", reservJson, headers)
                .then((json) => {
                    console.log(json.data)
                    console.log(myReservs)
                    let myReservsAux = [...myReservs];
                    myReservsAux = [...myReservsAux, json.data];
                    setMyReservs(myReservsAux);
                    setIsModalRegisterMyReservsOpen(false);
                    toast.update(toastId, {
                        render: "A reserva foi registrada com sucesso",
                        type: "success",
                        autoClose: 2500,
                        isLoading: false,
                        style: {
                            fontWeight: "bold"
                        }
                    })
                    setRender((prev) => prev + 1);
                })
                .catch((error) => {
                    if (error.response) {
                        toast.update(toastId, {
                            render: error.response.data.message,
                            type: "error",
                            autoClose: 2500,
                            isLoading: false,
                            style: {
                                fontWeight: "bold"
                            }
                        })
                    }
                }
                )
        }
        postData()
    };

    const verifyReservsAvailableByDay = async (data, idQuadra) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        };

        setStatusDateAvailable("loading");
        try {
            const response = await api.get(`reserva/verify?dataReserva=${data}&idQuadra=${idQuadra}`, { headers });
            setHoursAvailable(response.data);
            setStatusDateAvailable("available");
        } catch (error) {
            console.error("Erro ao verificar reservas disponíveis:", error);
            setStatusDateAvailable("notFound");
        }
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        console.log('aq')
        console.log(reserv)
        if (e.target.value != '' && reserv.idQuadra) {
            console.log('aqui')
            verifyReservsAvailableByDay(value, reserv.idQuadra);
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-screen bg-third/15 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    exit={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-secundary rounded drop-shadow-xl shadow-lg p-4 sm:w-[400px] lg:w-[500px] font-bold">
                        <h1 className="text-2xl my-2 text-left font-bold">Registrar reserva</h1>
                        {isDataLoaded && (
                            <>
                                <form onSubmit={handleSubmit(postMyReserv)} className="flex flex-col">
                                    <label htmlFor="idQuadra">Quadra</label>
                                    <select onChange={(e) => { setReserv((prev) => { return { ...prev, idQuadra: e.target.value } }) }} className="border rounded p-1" name="idQuadra" id="idQuadra">
                                        <option value="">Selecione</option>
                                        {courtList.map((court) => (
                                            <option key={court.idQuadra} value={court.idQuadra}>
                                                {`${court.locQuadra.toUpperCase()} - ${court.esporte.descricao.toUpperCase()} - R$ ${parseFloat(court.valorHora).toFixed(2)} /Hora`}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="mt-2" htmlFor="idFormPagamento">Forma de pagamento</label>
                                    <select onChange={(e) => { setReserv((prev) => { return { ...prev, idFormPagamento: e.target.value } }) }} className="border rounded p-1" name="idFormPagamento" id="idFormPagamento">
                                        <option value="">Selecione</option>
                                        {payments.map((payment, index) => (
                                            <option key={index} value={payment.idFormPagamento}>
                                                {payment.descricao.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="mt-2" htmlFor="dataReserva">Data</label>
                                    <input onChange={(e) => { setReserv((prev) => { return { ...prev, dataReserva: e.target.value } }); handleDateChange(e) }} className="rounded border p-1" type="date" name="dataReserva" id="dataReserva" />
                                    {reserv.dataReserva && reserv.idQuadra &&
                                        (<>
                                            {statusDateAvailable === "notFound" && (
                                                <span>Nenhum disponível encontrado</span>
                                            )}
                                            {statusDateAvailable === "loading" && (
                                                <span>Carregando horários...</span>
                                            )}
                                            {statusDateAvailable === "available" && (
                                                <>
                                                    <label className="font-bold mt-2" htmlFor="horarioReserva">Horários</label>
                                                    <select onChange={(e) => { setReserv((prev) => { return { ...prev, horarioInicial: e.target.value } }) }} className="border rounded p-1" name="horarioInicial" id="horarioInicial">
                                                        <option value="">Selecione</option>
                                                        {hoursAvailable.map((hour, index) => (
                                                            <option key={index} value={hour}>
                                                                {`${hour}:00 - ${hour + 1}:00`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </>
                                            )}
                                        </>)}
                                    <div className="self-end flex flex-row gap-2 my-3 font-medium">
                                        <button type="button" onClick={() => setIsModalRegisterMyReservsOpen(false)} className="bg-secundary px-2 py-1 rounded border text-primary">Cancelar</button>
                                        <button type="submit" className="bg-primary text-secundary rounded px-2 py-1">Registrar</button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ModalRegisterMyReserv;
