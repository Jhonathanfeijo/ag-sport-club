import { useForm } from "react-hook-form";
import { getUserLocalStorage } from "../../../utils/userProvider";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";

const ModalEditPaymentType = ({ paymentTypeToEdit, setPaymentTypeToEdit, setIsModalEditPaymentTypeOpen, paymentTypes, setPaymentTypes }) => {

    const {register, handleSubmit} = useForm();


    const editPaymentType = (data) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };
        console.log(data)
        const putData = async () => {
            let toastId = toast.loading("Editando esporte", { loading: true });
            await api.put(`form_pagamento/${paymentTypeToEdit.idFormPagamento}`, data,  headers )
                .then((json) => {
                    console.log(json)
                    toast.update(toastId, { render: "Esporte foi atualizado", type: "success", isLoading: false, theme: "colored", autoClose: 2000 });
                    let paymentTypesAux = [...paymentTypes];
                    paymentTypesAux = paymentTypesAux.filter((paymentTypeAux) => paymentTypeAux.idFormPagamento != paymentTypeToEdit.idFormPagamento);
                    paymentTypesAux.push(json.data);
                    setPaymentTypes(paymentTypesAux);
                    setIsModalEditPaymentTypeOpen(false);
                }).catch((error) => {
                    console.log(error)
                    toast.update(toastId, { render: 'Algo deu errado', type: "error", theme: "colored", isLoading: false, autoClose: 2000 });
                });
        };
        putData();
    };

    return (
        <>
            <div className="fixed top-0 left-0 bg-third/10 h-screen w-screen flex flex-col justify-center items-center">
                <div className="bg-secundary rounded w-[350px] max-w-[95%] px-2 py-4 drop-shadow-lg shadow-lg">
                    <h1 className="text-xl font-bold">Editar forma de pagamento</h1>
                    <form onSubmit={handleSubmit(editPaymentType)} className="flex flex-col" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} name="descricao" id="descricao" onChange={(e) => {
                            const newValue = e.target.value;
                            setPaymentTypeToEdit((prev) => ({ ...prev, descricao: newValue }));
                        }} value={paymentTypeToEdit.descricao} className="px-2 py-1 rounded border" type="text" />
                        <div className="flex flex-row gap-2 mt-2">
                            <button type="button" onClick={() => setIsModalEditPaymentTypeOpen(false)} className="flex-1 py-1 rounded border">Cancelar</button>
                            <button className="flex-1 py-1 rounded bg-primary text-secundary">Editar</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditPaymentType;