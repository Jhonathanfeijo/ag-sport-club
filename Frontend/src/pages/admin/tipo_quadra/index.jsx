import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";
import ModalAddTipoQuadra from "./modalAddTipoQuadra";
import ModalDeleteTipoQuadra from "./modalDeleteTipoQuadra";
import ModalEditTipoQuadra from "./modalEditTipoQuadra";

const TiposQuadras = () => {

    const [tiposQuadra, setTiposQuadra] = useState([]);
    const [statusDataLoading, setStatusDataLoading] = useState("loading");
    const [isModalAddTipoQuadraOpen, setIsModalAddTipoQuadraOpen] = useState(false);
    const [isModalDeleteTipoQuadraOpen, setIsModalDeleteTipoQuadraOpen] = useState(false);
    const [tipoQuadraDeleteId, setTipoQuadraDeleteId] = useState();
    const [tipoQuadraToEdit, setTipoQuadraToEdit] = useState();
    const [isModalEditTipoQuadraOpen, setIsModalEditTipoQuadraOpen] = useState();
    useEffect(() => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token.repeat('"', '').repeat('"', '')}`,
        };
        const fetchData = async () => {
            await api.get('tipo_quadra', headers).then(json => {
                console.log(json)
                setTiposQuadra(json.data);
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
            <div className="rounded w-full flex flex-col items-center">
                {statusDataLoading === "loaded" && (
                    <>
                        <div className="table-container max-w-[100%] w-full  max-h-[320px] my-3  lg:items-start overflow-auto flex flex-col items-center">
                            <table className="shadow-lg w-full drop-shadow-lg mb-2 ">
                                <thead className="">
                                    <tr className="bg-primary text-secundary rounded-b">
                                        <th className="py-2 px-2 text-left rounded-bl">Descricão</th>
                                        <th className="py-1 text-left text-primary rounded-br">Editar</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {tiposQuadra.map((tipoQuadra, index) => {
                                        return (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-primary/15" : ""} font-bold w-full`}>
                                                <td className="px-2 py-1 break-words">{tipoQuadra.descricao}</td>
                                                <td

                                                    className="px-1 py-2 font-normal break-words flex flex-row justify-end gap-2"
                                                >
                                                    <button onClick={() => {
                                                        setTipoQuadraToEdit({ ...tipoQuadra })
                                                        setIsModalEditTipoQuadraOpen(true);
                                                    }} className="bg-primary text-secundary px-2 py-1 rounded">Editar</button>
                                                    <button onClick={() => {
                                                        setTipoQuadraDeleteId(tipoQuadra.idTipoQuadra);
                                                        setIsModalDeleteTipoQuadraOpen(true);
                                                    }} className="bg-danger/70 text-secundary px-1 rounded py-1">Deletar</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                    </>
                )}
                <button type="button" onClick={() => setIsModalAddTipoQuadraOpen(true)} className="bg-primary w-full text-secundary px-2 py-1.5 mb-2 rounded font-medium text-lg lg:text-xl">Adicionar tipo de quadra</button>
            </div>
            {isModalAddTipoQuadraOpen && (
                <ModalAddTipoQuadra setIsModalAddTipoQuadraOpen={setIsModalAddTipoQuadraOpen} tiposQuadra={tiposQuadra} setTiposQuadra={setTiposQuadra} ></ModalAddTipoQuadra>
            )}
            {isModalDeleteTipoQuadraOpen && (
                <ModalDeleteTipoQuadra tipoQuadraDeleteId={tipoQuadraDeleteId} tiposQuadra={tiposQuadra} setIsModalDeleteTipoQuadraOpen={setIsModalDeleteTipoQuadraOpen} setTiposQuadra={setTiposQuadra}></ModalDeleteTipoQuadra>
            )}
            {isModalEditTipoQuadraOpen && (
                <ModalEditTipoQuadra tipoQuadraToEdit={tipoQuadraToEdit} tiposQuadra={tiposQuadra} setIsModalEditTipoQuadraOpen={setIsModalEditTipoQuadraOpen} setTipoQuadraToEdit={setTipoQuadraToEdit} setTiposQuadra={setTiposQuadra}  ></ModalEditTipoQuadra>
            )}
        </>
    )
}

export default TiposQuadras;