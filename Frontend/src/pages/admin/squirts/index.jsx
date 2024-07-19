import { useEffect, useState } from "react";
import { getUserLocalStorage } from "../../../utils/userProvider";
import { api } from "../../../../services/api";

const SquirtsAdmin = () => {

    const [sportList, setSportList] = useState([]);
    const [tipoQuadraList, setTipoQuadraList] = useState([]);
    const [squirtList, setSquirtList] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    useEffect(() => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "application/json",
            Authorizathon: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        }

        const fetchData = async () => {
            await api.get("esporte", headers).then((json) => {
                console.log(json)
                setSportList(json.data)
            }).catch((error) => {
                console.log(error);
            })
            await api.get("tipo_quadra", headers).then((json) => {
                console.log(json)
                setTipoQuadraList(json.data)
            }).catch((error) => {
                console.log(error);
            })
            await api.get("quadra", headers).then((json) => {
                console.log(json)
                setSquirtList(json.data)
            }).catch((error) => {
                console.log(error);
            })
            setIsDataLoaded(true)
        }
        fetchData();

    }, [])

    return (<>
        <div className="w-full">
            {isDataLoaded && (
                <>
                    {squirtList.length > 0 ? (
                        <>
                            <div className="table-container w-full">
                                <table className="w-full mt-3 mb-2  shadow-lg drop-shadow-lg" >
                                    <thead>
                                        <tr className="bg-primary text-secundary text-left">
                                            <th className="px-2 py-2 rounded-bl">Descrição</th>
                                            <th className="px-2 py-2">Esporte</th>
                                            <th className="px-2 py-2 rounded-br"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {squirtList.map((squirt, index) => {
                                            return <tr className={`${index%2 === 0? "" : "bg-primary/10"}`} key={index}>
                                                <td className="py-3 px-2">
                                                    {squirt.locQuadra}
                                                </td>
                                                <td className="py-3 px-2">
                                                    {squirt.esporte.descricao}
                                                </td>
                                                <td className="flex flex-row items-center py-3 justify-end text-secundary px-2 gap-2">
                                                    <button className="bg-primary rounded py-1 px-2">Editar</button>
                                                    <button className="bg-danger/70 rounded py-1 px-2">Deletar</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) :
                        <>
                            <h2 className="text-primary">Não há nenhuma quadra registrada</h2>
                        </>
                    }
                    <button className="w-full py-1.5 text-xl text-secundary bg-primary rounded">Adicionar quadra</button>
                </>
            )
            }
        </div>
    </>)
}

export default SquirtsAdmin;