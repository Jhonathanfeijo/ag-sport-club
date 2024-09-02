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

    const postMyReserv = (data) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        };
        console.log(data)
        if (!data.idQuadra || !data.idFormPagamento || !data.horarioInicial || !data.dataReserva) {
            toast.error('Preencha todas as informações', {
                style: { fontWeight: 'bold' },
                autoClose: 2500,
                isLoading: false,
            })
            return;
        }

        const dataAtual = normalizaDataParaInicioDoDia(new Date());
        const dataReserva = data.dataReserva;
        console.log(dataAtual);
        console.log(data.dataReserva)

        if (dataReserva < dataAtual) {
            toast.error("Não pode adicionar datas passadas", {
                style: { fontWeight: 'bold' },
                autoClose: 2500,
                isLoading: false,
            });
            return;
        }
        const reserv = {
            idUsuario: user.idUser,
            idQuadra: data.idQuadra,
            idFormPagamento: data.idFormPagamento,
            horarioInicial: data.horarioInicial,
            dataReserva: data.dataReserva
        }


        const postData = async () => {
            const toastId = toast.loading("Registrando reserva", { isLoading: true })
            await api.post("reserva", reserv, headers)
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

    const verifyReservsAvailableByDay = async (data) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        };

        setStatusDateAvailable("loading");
        try {
            const response = await api.get(`reserva/verify?dataReserva=${data}`, { headers });
            setHoursAvailable(response.data);
            setStatusDateAvailable("available");
        } catch (error) {
            console.error("Erro ao verificar reservas disponíveis:", error);
            setStatusDateAvailable("notFound");
        }
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        if (e.target.value != '') {
            verifyReservsAvailableByDay(value);
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
                                    <select {...register("idQuadra")} className="border rounded p-1" name="idQuadra" id="idQuadra">
                                        <option value="">Selecione</option>
                                        {courtList.map((court) => (
                                            <option key={court.idQuadra} value={court.idQuadra}>
                                                {`${court.locQuadra} - ${court.esporte.descricao} - R$ ${parseFloat(court.valorHora).toFixed(2)} /Hora`}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="mt-2" htmlFor="idFormPagamento">Forma de pagamento</label>
                                    <select {...register("idFormPagamento")} className="border rounded p-1" name="idFormPagamento" id="idFormPagamento">
                                        <option value="">Selecione</option>
                                        {payments.map((payment, index) => (
                                            <option key={index} value={payment.idFormPagamento}>
                                                {payment.descricao}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="mt-2" htmlFor="dataReserva">Data</label>
                                    <input onSelect={(e) => { handleDateChange(e) }} onBlur={(e) => { handleDateChange(e) }} onChange={(e) => { handleDateChange(e) }} {...register("dataReserva")} className="rounded border p-1" type="date" name="dataReserva" id="dataReserva" />

                                    {statusDateAvailable === "notFound" && (
                                        <span>Nenhum disponível encontrado</span>
                                    )}
                                    {statusDateAvailable === "loading" && (
                                        <span>Carregando horários...</span>
                                    )}
                                    {statusDateAvailable === "available" && (
                                        <>
                                            <label className="font-bold mt-2" htmlFor="horarioReserva">Horários</label>
                                            <select {...register("horarioInicial")} className="border rounded p-1" name="horarioInicial" id="horarioInicial">
                                                <option value="">Selecione</option>
                                                {hoursAvailable.map((hour, index) => (
                                                    <option key={index} value={hour}>
                                                        {`${hour}:00 - ${hour + 1}:00`}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}
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
