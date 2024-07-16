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
                    toast.update(toastId, { render: 'Algo deu errado', type: "error", theme: "colored", isLoading: false, autoClose: 2000 });
                });
        };
        putData();
    };

    return (
        <>
            <div className="fixed top-0 left-0 bg-third/10 h-screen w-screen flex flex-col justify-center items-center">
                <div className="bg-secundary rounded w-[350px] max-w-[95%] px-3 py-4 drop-shadow-lg shadow-lg">
                    <h1 className="text-xl font-bold mb-4">Editar tipo de quadra</h1>
                    <form onSubmit={handleSubmit(editTipoQuadra)} className="flex flex-col" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} name="descricao" id="descricao" onChange={(e) => {
                            const newValue = e.target.value;
                            setTipoQuadraToEdit((prev) => ({ ...prev, descricao: newValue }));
                        }} value={tipoQuadraToEdit.descricao} className="px-2 py-1 rounded border" type="text" />
                        <div className="flex flex-row gap-2 mt-2">
                            <button type="button" onClick={() => setIsModalEditTipoQuadraOpen(false)} className="flex-1 py-1 rounded border">Cancelar</button>
                            <button className="flex-1 py-1 rounded bg-primary text-secundary">Editar</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditTipoQuadra;