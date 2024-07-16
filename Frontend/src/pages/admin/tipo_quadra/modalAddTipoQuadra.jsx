import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalAddTipoQuadra = ({ tiposQuadra, setTiposQuadra, setIsModalAddTipoQuadraOpen }) => {

    const { register, handleSubmit } = useForm();

    const postTipoQuadra = (data) => {
        console.log(data)
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };

        console.log(headers)
        let toastId = toast.loading("Adicionando tipo de quadra", { isLoading: true })
        const postData = async () => {
            await api.post('tipo_quadra', data,  {headers} ).then((json) => {
                console.log(json)
                toast.update(toastId, {
                    render: "O tipo de quadra foi adicionado com sucesso",
                    theme: "colored",
                    autoClose: 2000,
                    isLoading: false,
                    type:"success"
                })
                let tiposQuadraAux = [...tiposQuadra];
                tiposQuadraAux.push(json.data);
                setTiposQuadra(tiposQuadraAux)
                setIsModalAddTipoQuadraOpen(false);

            }).catch((error) => {
                console.log(error);
                toast.update(toastId, {render:"algo deu errado", isLoading:false, autoClose:2000, type:"error"})
            });
        };
        postData();

    }

    return (
        <>
            <div className="fixed top-0 left-0 bg-third/15 h-screen w-screen flex flex-col justify-center items-center">
                <div className="bg-secundary w-[350px] max-w-[95%] rounded drop-shadow-lg shadow-lg p-2">
                    <h1 className="font-bold text-xl">Adicionar tipo de quadra</h1>
                    <form onSubmit={handleSubmit(postTipoQuadra)} className="flex flex-col my-3" action="">
                        <label className="font-bold" htmlFor="">Descrição</label>
                        <input {...register("descricao")} id="descricao" name="descricao" className="border rounded px-2 py-1" type="text" />
                        <div className="flex flex-row mt-2 gap-2">
                            <button type="button" onClick={() => setIsModalAddTipoQuadraOpen(false)} className="px-2 py-1 rounded flex-1 bg-third/15">Cancelar</button>
                            <button type="submit" className="px-2 py-1 rounded flex-1 bg-primary text-secundary">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

export default ModalAddTipoQuadra;