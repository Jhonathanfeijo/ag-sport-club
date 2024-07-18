import { useState } from "react";
import FormasPagamento from "./pagamentos";
import TiposQuadras from "./tipo_quadra";

const AdminConfig = () => {
    
    const [option, setOption] = useState('');

    return (
        <>
            <div className="flex flex-col h-screen w-full items-center px-4">
                <h1 className="text-primary text-4xl font-bold my-5 text-center lg-text-left lg:mt-9">Ajustes</h1>
                <div className="grid grid-flow-col lg:w-[700px] gap">
                    <div className={`${option ==='a'?"bg-selected":"bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg" } p-2 hover:cursor-pointer hover:opacity-80 rounded-l`}><span>Esporte</span></div>
                    <div className={`${option ==='a'?"bg-selected":"bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg" } p-2 hover:cursor-pointer hover:opacity-80 `}><span>Formas de pagamento</span></div>
                    <div className={`${option ==='a'?"bg-selected":"bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg" } p-2 hover:cursor-pointer hover:opacity-80 `}><span>Quadras</span></div>
                    <div className={`${option ==='a'?"bg-selected":"bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg" } p-2 hover:cursor-pointer hover:opacity-80 `}><span>Reservas</span></div>
                    <div className={`${option ==='a'?"bg-selected":"bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg" } p-2 hover:cursor-pointer hover:opacity-80 `}><span>Tipos de quadra</span></div>
                    <div className={`${option ==='a'?"bg-selected":"bg-primary text-secundary w-[120px] flex justify-center items-center text-center text-lg" } p-2 hover:cursor-pointer hover:opacity-80 rounded-r`}><span>Usuário</span></div>
                </div>
                <div className=" w-[350px] lg:w-[600px] max-w-full flex flex-row">
                    <select onChange={(e) =>{ setOption(e.target.value)}} name="" id="" className="bg-primary text-secundary w-full border px-1 py-1 mt-5  text-xl rounded">
                        <option className="bg-secundary text-primary" value="">Selecione</option>
                        <option className="bg-secundary text-primary" value="esporte">Esporte</option>
                        <option className="bg-secundary text-primary" value="pagamentos">Formas de pagamento</option>
                        <option className="bg-secundary text-primary" value="quadras">Quadra</option>
                        <option className="bg-secundary text-primary" value="tipos_quadra">Tipos de quadra</option>
                        <option className="bg-secundary text-primary" value="usuarios">Usuários</option>
                    </select>
                </div>
            {option === "pagamentos" && (
                <FormasPagamento></FormasPagamento>
            )}
            {option === "tipos_quadra" && (
                <TiposQuadras></TiposQuadras>
            )}
            </div>
        </>
    )
}

export default AdminConfig;