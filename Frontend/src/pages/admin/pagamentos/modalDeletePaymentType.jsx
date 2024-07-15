import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalDeletePaymentType = ({paymentTypeDeleteId, setIsModalDeletePaymentTypeOpen, paymentTypes, setPaymentTypes}) => {



    const deletePaymentType = () => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };
        const fetchData = async () => {
            const toastId = toast.loading("Excluindo tipo de pagamento");
            await api.delete(`form_pagamento/${paymentTypeDeleteId}`, {headers }).then(() => {
                toast.update(toastId, {
                    render: "Tipo de pagamento deletado com sucesso",
                    type: "success",
                    theme: "colored",
                    style: {
                        fontWeight: "bold",
                    },
                    isLoading: false,
                    autoClose: 2000
                })

                let paymentTypesAux = [...paymentTypes];
                paymentTypesAux = paymentTypesAux.filter((paymentType) => paymentType.idFormPagamento != paymentTypeDeleteId);
                setPaymentTypes(paymentTypesAux);
                setIsModalDeletePaymentTypeOpen(false)
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
            <div className="fixed top-0 left-0 w-screen h-screen bg-third/15 flex flex-col justify-center items-center">
                <div className="bg-secundary rounded w-[350px] max-w-[95%] flex flex-col drop-shadow-lg shadow-lg items-start font-bold p-3">
                    <h1>Você tem certeza que deseja apagar esse tipo de pagamento?</h1>
                    <div className="self-end flex flex-row gap-2 mt-5">
                        <button onClick={() => setIsModalDeletePaymentTypeOpen(false)} className="bg-primary text-secundary rounded px-2 py-1">Cancelar</button>
                        <button onClick={() => deletePaymentType()} className="bg-danger/70 text-secundary rounded px-2 py-1">Deletar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDeletePaymentType;