import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import { getUserLocalStorage } from "../../utils/userProvider";

const Squirts = () => {

    const [quadraList, setQuadraList] = useState([]);
    const [isDataLoadered, setIsDataLoadered] = useState(false);


    useEffect(() => {
        const user = getUserLocalStorage();
        const headers = {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`
        }
        console.log(headers)
        const fetchData = async () => {
            await api.get("quadra", headers).then((json) => {
                console.log(json)
                setQuadraList(json.data);
                setIsDataLoadered(true)
            })
        }
        fetchData();
    }, [])
    return (
        <>
            <div className="px-2 w-[350px] max-w-full lg:w-full flex flex-col items-center ">
                <div className="mt-10 w-full lg:w-[500px] flex flex-col items-center">

                    <h1 className="text-4xl font-bold text-center mb-5 lg:mb-9">Quadras</h1>
                    {isDataLoadered && (
                        <>
                            <div className="container-table overflow-auto w-[350px] lg:w-full max-w-full flex flex-col items-center">
                                <table className="border-collapse w-full  table-auto shadow-lg drop-shadow-lg ">
                                    <thead>
                                        <tr className="bg-primary text-secundary">
                                            <td className="pl-2 py-2 font-medium text-left rounded-bl">Nome</td>
                                            <td className="pl-2 py-2 font-medium text-left">Tipo</td>
                                            <td className="pl-2 py-2 font-medium text-left">Esporte</td>
                                            <td className="pl-2 py-2 font-medium pr-2 text-left rounded-br">R$ / Hora</td>
                                        </tr>
                                    </thead>
                                    <tbody className="max-w-[100px] overflow-auto">
                                        {quadraList.map((quadra, index) => {
                                            return <tr className={`${index % 2 === 1 ? "bg-primary/10" : ""} text-primary`} key={index}>
                                                <td className="pl-2 py-2 pr-5 text-left">{quadra.locQuadra}</td>
                                                <td className="pl-2 py-2 pr-5 text-left">{quadra.tipoQuadra.descricao}</td>
                                                <td className="pl-2 py-2 pr-5 text-left">{quadra.esporte.descricao}</td>
                                                <td className="pl-2 py-2 pr-5 text-left">{`R$ ${parseFloat (quadra.valorHora).toFixed(2)}`}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                <div className="w-full">
                                    <Link to={"/reservas"}>
                                        <button className="w-full bg-primary text-secundary rounded py-1 lg:text-xl my-2 lg:my-4 text-lg">Fazer reserva</button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Squirts