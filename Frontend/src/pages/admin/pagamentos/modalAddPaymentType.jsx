import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalAddPaymentType = ({ paymentTypes, setPaymentTypes, setIsModalAddPaymentTypeOpen }) => {

    const { register, handleSubmit } = useForm();

    const postPaymentType = (data) => {
        console.log(data)
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };

        console.log(headers)
        let toastId = toast.loading("Adicionando forma de pagamento", { isLoading: true })
        const postData = async () => {
            await api.post('form_pagamento', data, { headers }).then((json) => {
                console.log(json)
                toast.update(toastId, {
                    render: "A forma de pagamento foi adicionada com sucesso",
                    theme: "colored",
                    autoClose: 2000,
                    isLoading: false,
                    type: "success"
                })
                let paymentTypesAux = [...paymentTypes];
                paymentTypesAux.push(json.data);
                setPaymentTypes(paymentTypesAux)
                setIsModalAddPaymentTypeOpen(false);

            }).catch((error) => {
                if(error.response){
                    toast.update(toastId, { render: error.response.data.message, isLoading: false, autoClose: 2500, type: "error" })
                }
            });
        };
        postData();

    }

    return (
        <>
            <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
                <div className="bg-secundary md:mt-40 px-5 w-full max-w-[95%] md:w-[450px] rounded shadow-xl drop-shadow-xl">
                <h1 className="font-bold text-2xl my-5">Adicionar forma de pagamento</h1>
                    <form onSubmit={handleSubmit(postPaymentType)} className="flex flex-col my-3" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} id="descricao" name="descricao" className="border rounded px-2 py-1" type="text" />
                        <div className="flex flex-row mt-2 gap-2 self-end">
                            <button type="button" onClick={() => setIsModalAddPaymentTypeOpen(false)} className="px-2 py-1 rounded  bg-third/5 text-[#000000] ">Cancelar</button>
                            <button type="submit" className="px-2 py-1 rounded  bg-primary text-secundary">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

export default ModalAddPaymentType;