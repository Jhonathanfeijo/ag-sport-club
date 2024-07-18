import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";
import ModalAddPaymentType from "./modalAddPaymentType";
import ModalDeletePaymentType from "./modalDeletePaymentType";
import ModalEditPaymentType from "./modalEditPaymentType";

const FormasPagamento = () => {

    const [paymentTypes, setPaymentTypes] = useState([]);
    const [statusDataLoading, setStatusDataLoading] = useState("loading");
    const [isModalAddPaymentTypeOpen, setIsModalAddPaymentTypeOpen] = useState(false);
    const [isModalDeletePaymentTypeOpen, setIsModalDeletePaymentTypeOpen] = useState(false);
    const [paymentDeleteId, setPaymentDeleteId] = useState();
    const [paymentTypeToEdit, setPaymentTypeToEdit] = useState();
    const [isModalEditPaymentTypeOpen, setIsModalEditPaymentTypeOpen] = useState();
    useEffect(() => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token.repeat('"', '').repeat('"', '')}`,
        };
        const fetchData = async () => {
            await api.get('form_pagamento', headers).then(json => {
                console.log(json)
                setPaymentTypes(json.data);
                setStatusDataLoading("loaded")
            }).catch((error) => {
                console.log(error);
                setStatusDataLoading("failed")
            });
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="rounded w-full flex flex-col items-center">
                {statusDataLoading === "loaded" && (
                    <>
                        <div className="table-container max-w-[100%] my-3 w-[350px] lg:w-[600px] max-h-[320px]  lg:items-start overflow-auto flex flex-col items-center">
                            <table className="shadow-lg drop-shadow-lg w-full">
                                <thead className="font-bold">
                                    <tr className="bg-primary text-secundary">
                                        <th className="py-2 px-2 text-left rounded-bl">Descricão</th>
                                        <th className="py-2 px-2 text-left">Status</th>
                                        <th className="py-2 px-2 text-left text-primary rounded-br"></th>
                                    </tr>
                                </thead>
                                <tbody className="rounded-b" >
                                    {paymentTypes.map((paymentType, index) => {
                                        return (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-primary/15" : ""} font-bold w-full`}>
                                                <td className="px-2 py-1 break-words">{paymentType.descricao}</td>
                                                <td className={`px-2 py-1 break-words ${paymentType.ativo ? "" : " text-danger/80"}`}>{paymentType.ativo ? "Ativo" : "Inativo"}</td>
                                                <td
                                                    className="px-2 py-1 font-normal flex flex-row justify-end gap-2 break-words"
                                                >
                                                    <button onClick={() => {
                                                        setPaymentTypeToEdit({ ...paymentType })
                                                        setIsModalEditPaymentTypeOpen(true);
                                                    }} className="bg-primary text-secundary px-2 py-1 rounded">Editar</button>
                                                    <button onClick={() => {
                                                        setPaymentDeleteId(paymentType.idFormPagamento);
                                                        setIsModalDeletePaymentTypeOpen(true);
                                                    }} className="bg-danger/70 text-secundary px-1 rounded py-1">Deletar</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                    </>
                )}
                <button type="button" onClick={() => setIsModalAddPaymentTypeOpen(true)} className="bg-primary text-secundary px-2 py-1.5 mb-2 w-full lg:w-[600px] rounded font-medium text-lg lg:text-xl">Adicionar forma de pagamento</button>
            </div>
            {isModalAddPaymentTypeOpen && (
                <ModalAddPaymentType setIsModalAddPaymentTypeOpen={setIsModalAddPaymentTypeOpen} paymentTypes={paymentTypes} setPaymentTypes={setPaymentTypes} ></ModalAddPaymentType>
            )}
            {isModalDeletePaymentTypeOpen && (
                <ModalDeletePaymentType paymentTypeDeleteId={paymentDeleteId} paymentTypes={paymentTypes} setIsModalDeletePaymentTypeOpen={setIsModalDeletePaymentTypeOpen} setPaymentTypes={setPaymentTypes}></ModalDeletePaymentType>
            )}
            {isModalEditPaymentTypeOpen && (
                <ModalEditPaymentType paymentTypeToEdit={paymentTypeToEdit} setIsModalEditPaymentTypeOpen={setIsModalEditPaymentTypeOpen} setPaymentTypes={setPaymentTypes} paymentTypes={paymentTypes} setPaymentTypeToEdit={setPaymentTypeToEdit}></ModalEditPaymentType>
            )}
        </>
    )
}

export default FormasPagamento;