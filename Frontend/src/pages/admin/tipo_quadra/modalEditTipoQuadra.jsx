import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalEditTipoQuadra = ({ tipoQuadraToEdit, setTipoQuadraToEdit, setIsModalEditTipoQuadraOpen, tiposQuadra, setTiposQuadra }) => {

    const { register, handleSubmit } = useForm();

    const editTipoQuadra = (data) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };
        console.log(data)
        const putData = async () => {
            let toastId = toast.loading("Editando tipo de quadra", { loading: true });
            await api.put(`tipo_quadra/${tipoQuadraToEdit.idTipoQuadra}`, data, { headers })
                .then((json) => {
                    console.log(json)
                    toast.update(toastId, { render: "Esporte foi atualizado", type: "success", isLoading: false, theme: "colored", autoClose: 2000 });
                    let tiposQuadraAux = [...tiposQuadra];
                    tiposQuadraAux = tiposQuadraAux.filter((tipoQuadraAux) => tipoQuadraAux.idTipoQuadra != tipoQuadraToEdit.idTipoQuadra);
                    tiposQuadraAux.push(json.data);
                    setTiposQuadra(tiposQuadraAux);
                    setIsModalEditTipoQuadraOpen(false);
                }).catch((error) => {
                    console.log(error)
                    toast.update(toastId, { render: 'Algo deu errado', type: "error", theme: "colored", isLoading: false, autoClose: 2500 });
                });
        };
        putData();
    };

    return (
        <>
            <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
                <div className="bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl max-w-full w-[450px]">
                    <h1 className="text-2xl font-bold my-4">Editar tipo de quadra</h1>
                    <form onSubmit={handleSubmit(editTipoQuadra)} className="flex flex-col" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} name="descricao" id="descricao" onChange={(e) => {
                            const newValue = e.target.value;
                            setTipoQuadraToEdit((prev) => ({ ...prev, descricao: newValue }));
                        }} value={tipoQuadraToEdit.descricao} className="px-2 py-1 rounded border" type="text" />
                        <div className="flex flex-row gap-2 my-3 self-end">
                            <button type="button" onClick={() => setIsModalEditTipoQuadraOpen(false)} className="flex-1 py-1 px-2 rounded border">Cancelar</button>
                            <button className="flex-1 py-1 px-3 rounded bg-primary text-secundary">Editar</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditTipoQuadra;