import { useState } from "react";
import FormasPagamento from "./pagamentos";
import TiposQuadras from "./tipo_quadra";
import SportsAdmin from "./sports";
import SquirtsAdmin from "./squirts";

const AdminConfig = () => {

    const [option, setOption] = useState('esportes');

    return (
        <>
            <div className="flex flex-col h-screen w-full items-center px-4">
                <h1 className="text-primary text-4xl font-bold my-5 text-center lg-text-left lg:my-9">Ajustes</h1>
                <div className="hidden lg:grid lg:grid-flow-col lg:w-[720px] gap">
                    <div onClick={() => setOption("esportes")} className={`${option === 'esportes' ? "opacity-80" : ""} bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 rounded-l`}><span>Esportes</span></div>
                    <div onClick={() => setOption("pagamentos")} className={`${option === 'pagamentos' ? "opacity-80" : ""} bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}><span>Formas de pagamento</span></div>
                    <div onClick={() => setOption("quadras")} className={`${option === 'quadras' ? "opacity-80" : ""} bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}><span>Quadras</span></div>
                    <div onClick={() => setOption("reservas")} className={`${option === 'reservas' ? "opacity-80" : ""} bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}><span>Reservas</span></div>
                    <div onClick={() => setOption("tipos_quadra")} className={`${option === 'tipos_quadra' ? "opacity-80" : ""} bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 `}><span>Tipos de quadra</span></div>
                    <div onClick={() => setOption("usuarios")} className={`${option === 'usuarios' ? "opacity-80" : ""} bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg p-2 hover:cursor-pointer hover:opacity-80 rounded-r`}><span>Usuário</span></div>
                </div>
                <div className=" w-[350px] max-w-full flex flex-row lg:hidden">
                    <select onChange={(e) => { setOption(e.target.value) }} name="" id="" className="bg-primary text-secundary w-full border px-1 py-1 mt-5 text-center text-xl rounded">
                        <option className="bg-secundary text-primary" value="">Selecione</option>
                        <option className="bg-secundary text-primary" value="esporte">Esporte</option>
                        <option className="bg-secundary text-primary" value="pagamentos">Formas de pagamento</option>
                        <option className="bg-secundary text-primary" value="quadras">Quadra</option>
                        <option className="bg-secundary text-primary" value="tipos_quadra">Tipos de quadra</option>
                        <option className="bg-secundary text-primary" value="usuarios">Usuários</option>
                    </select>
                </div>
                <div className="w-full lg:w-[720px] flex flex-col items-center">
                    {option === "pagamentos" && (
                        <FormasPagamento></FormasPagamento>
                    )}
                    {option === "tipos_quadra" && (
                        <TiposQuadras></TiposQuadras>
                    )}
                    {option === "esportes" && (
                        <SportsAdmin></SportsAdmin>
                    )}
                    {option === "quadras" && (
                        <SquirtsAdmin></SquirtsAdmin>
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminConfig;