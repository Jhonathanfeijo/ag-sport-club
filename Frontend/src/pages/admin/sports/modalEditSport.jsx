import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalEditSport = ({ sportToEdit, sportList, setSportList, setIsModalEditSportOpen, setSportToEdit }) => {
    const { register, handleSubmit } = useForm();
    const editSport = (data) => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
        };
        console.log(user)
        const putData = async () => {
            let toastId = toast.loading("Editando esporte", { loading: true });
            await api.put(`esporte/${data.idEsporte}`, data, { headers })
                .then((json) => {
                    toast.update(toastId, { render: "Esporte foi atualizado", type: "success", isLoading: false, theme: "colored", autoClose: 2000 });
                    let sportsAux = [...sportList];
                    sportsAux = sportsAux.filter((sportAux) => sportAux.idEsporte != data.idEsporte);
                    sportsAux.push(json.data);
                    setSportList(sportsAux);
                    setIsModalEditSportOpen(false);
                }).catch(() => {
                    toast.update(toastId, { render: 'Algo deu errado', type: "error", theme: "colored", isLoading: false, autoClose: 2500 });
                });
        };
        putData();
    };

    return (
        <>
            <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
                <div className="bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl">
                    <h1 className="font-bold text-2xl my-5">Editar esporte </h1>
                    <form onSubmit={handleSubmit(editSport)} className="flex flex-col my-2 max-w-full w-[350px] lg:w-[450px]">
                        <input {...register("idEsporte")} id="idEsporte" name="idEsporte" className="hidden" value={sportToEdit.idEsporte} type="text" />
                        <label className="font-bold" htmlFor="descricao">Descrição</label>
                        <input
                            {...register("descricao")}
                            id="descricao"
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setSportToEdit((prevSport) => ({ ...prevSport, descricao: newValue }));
                            }}
                            defaultValue={sportToEdit.descricao}
                            className="px-2 border rounded py-1"
                            type="text"
                        />
                        <div className="flex flex-row gap-2 font-medium self-end">
                            <button onClick={() => setIsModalEditSportOpen(false)} type="button" className=" border text-primary  border-primary rounded px-1 py-1 my-3">Cancelar</button>
                            <button type="submit" className=" bg-primary text-secundary rounded px-4 py-1 my-3">Editar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalEditSport;
