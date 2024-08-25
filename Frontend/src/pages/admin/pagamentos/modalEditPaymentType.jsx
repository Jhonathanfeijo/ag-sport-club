import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalEditPaymentType = ({ paymentTypeToEdit, setPaymentTypeToEdit, setIsModalEditPaymentTypeOpen, paymentTypes, setPaymentTypes }) => {

    const { register, handleSubmit } = useForm();

    const editPaymentType = (data) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };
        console.log(data)
        const putData = async () => {
            let toastId = toast.loading("Editando esporte", { loading: true });
            await api.put(`form_pagamento/${paymentTypeToEdit.idFormPagamento}`, data, { headers })
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
                    if(error.response){
                        toast.update(toastId, { render: error.response.data.message, type: "error", theme: "colored", isLoading: false, autoClose: 2000 });
                    }
                });
        };
        putData();
    };


    return (
        <>
            <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
            <div className="bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl max-w-full w-[450px]">
                    <h1 className="text-2xl font-bold my-5">Editar forma de pagamento</h1>
                    <form onSubmit={handleSubmit(editPaymentType)} className="flex flex-col" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} name="descricao" id="descricao" onChange={(e) => {
                            const newValue = e.target.value;
                            setPaymentTypeToEdit((prev) => ({ ...prev, descricao: newValue }));
                        }} value={paymentTypeToEdit.descricao} className="px-2 py-1 rounded border" type="text" />

                        <div className="flex flex-row items-center gap-3 my-3">
                            <label className="font-bold" htmlFor="ativo">Ativo</label>
                            <label class="inline-flex items-center cursor-pointer">
                                <input name="ativo" id="ativo" {...register("ativo")} type="checkbox" onChange={() => setPaymentTypeToEdit((prev) => {return{...prev, ativo : !prev.ativo}})} value={paymentTypeToEdit.ativo} class="sr-only peer" checked ={paymentTypeToEdit.ativo}/>
                                    <div class="relative w-11 h-6 bg-third/20 rounded-full peer peer-focus: peer-focus: dark:peer-focus:ring-primary dark:bg-third/40 peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:end-[2px] after:bg-secundary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary/90"></div>
                            </label>
                        </div>
                        <div className="flex flex-row gap-2 self-end my-3">
                            <button type="button" onClick={() => setIsModalEditPaymentTypeOpen(false)} className="flex-1 lg:flex-none py-1 px-2 rounded border">Cancelar</button>
                            <button className="flex-1 lg:flex-none py-1 rounded bg-primary px-4 text-secundary">Editar</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditPaymentType;