import { useEffect, useState } from "react";
import { getUserLocalStorage } from "../../../utils/userProvider";
import { api } from "../../../../services/api";
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
            <div className="rounded m-4 w-full">
                {statusDataLoading === "loaded" && (
                    <>
                        <div className="table-container w-[350px] flex flex-col items-start">
                            <button type="button" onClick={() => setIsModalAddPaymentTypeOpen(true)} className="bg-primary text-secundary px-3 py-1.5 mb-2 mt-4 rounded font-medium self-start">Adicionar forma de pagamento</button>
                            <table className="shadow-lg drop-shadow-lg py-3">
                                <thead className="">
                                    <tr className="bg-primary text-secundary">
                                        <th className="py-1 px-2 text-left">Descricão</th>
                                        <th className="py-1 px-2 text-left">Status</th>
                                        <th className="py-1 px-2 text-left text-primary">Editar</th>
                                        <th className="py-1 px-2 text-left text-primary">Excluir</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full max-w-[100%]">

                                    {paymentTypes.map((paymentType, index) => {
                                        return (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-primary/15" : ""} font-bold w-full`}>
                                                <td className="px-2 flex-1 py-1">{paymentType.descricao}</td>
                                                <td className="px-2 flex-1 py-1"> {paymentType ? "ATIVO" : "INATIVO"}</td>
                                                <td onClick={() => {
                                                    setPaymentTypeToEdit({...paymentType})
                                                    setIsModalEditPaymentTypeOpen(true);

                                                }} className="px-2 flex-1 py-1 font-normal"><button className="bg-primary text-secundary px-2 py-1 rounded">Editar</button></td>
                                                <td onClick={() => {
                                                    setPaymentDeleteId(paymentType.idFormPagamento);
                                                    setIsModalDeletePaymentTypeOpen(true);
                                                }} className="px-2 flex-1 py-1 font-normal"><button className={`${"bg-danger/70"} text-secundary px-1 rounded py-1`}>Deletar</button></td>
                                            </tr>)
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
            {isModalAddPaymentTypeOpen && (
                <ModalAddPaymentType setIsModalAddPaymentTypeOpen={setIsModalAddPaymentTypeOpen} paymentTypes={paymentTypes} setPaymentTypes={setPaymentTypes} ></ModalAddPaymentType>
            )}
            {isModalDeletePaymentTypeOpen && (
                <ModalDeletePaymentType paymentTypeDeleteId={paymentDeleteId} paymentTypes={paymentTypes} setIsModalDeletePaymentTypeOpen={setIsModalDeletePaymentTypeOpen} setPaymentTypes={setPaymentTypes}></ModalDeletePaymentType>
            )}
            {isModalEditPaymentTypeOpen && (
                <ModalEditPaymentType paymentTypeToEdit={paymentTypeToEdit} setIsModalEditPaymentTypeOpen={setIsModalEditPaymentTypeOpen} setPaymentTypes={setPaymentTypes} paymentTypes={paymentTypes} setPaymentTypeToEdit= {setPaymentTypeToEdit}></ModalEditPaymentType>
            )}
        </>
    )
}

export default FormasPagamento;