import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalAddTipoQuadra = ({ tiposQuadra, setTiposQuadra, setIsModalAddTipoQuadraOpen, setRender }) => {

    const { register, handleSubmit } = useForm();

    const postTipoQuadra = (data) => {
        console.log(data)
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };

        let toastId = toast.loading("Adicionando tipo de quadra", { isLoading: true })
        const postData = async () => {
            await api.post('tipo_quadra', data, { headers }).then((json) => {
                console.log(json)
                toast.update(toastId, {
                    render: "O tipo de quadra foi adicionado com sucesso",
                    theme: "colored",
                    autoClose: 2500,
                    isLoading: false,
                    type: "success"
                })
                let tiposQuadraAux = [...tiposQuadra];
                tiposQuadraAux.push(json.data);
                setTiposQuadra(tiposQuadraAux)
                setIsModalAddTipoQuadraOpen(false);
                setRender((prev) => prev + 1);
            }).catch((error) => {
                console.log(error);
                if (error.response) {

                    toast.update(toastId, { render: error.response.data.message, isLoading: false, autoClose: 2500, type: "error" })
                }
            });
        };
        postData();

    }

    return (
        <>
            <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
                <div className="bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl">
                    <h1 className="font-bold text-2xl my-5">Adicionar tipo de quadra </h1>
                    <form onSubmit={handleSubmit(postTipoQuadra)} className="flex flex-col my-3  lg:w-[500px]" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} id="descricao" name="descricao" className="border rounded px-2 py-1" type="text" />
                        <div className="flex flex-row mt-2 gap-2 self-end">
                            <button type="button" onClick={() => setIsModalAddTipoQuadraOpen(false)} className="px-2 py-1 rounded bg-third/10 text-[#000000]">Cancelar</button>
                            <button type="submit" className="px-2 py-1 rounded bg-primary text-secundary">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

export default ModalAddTipoQuadra;