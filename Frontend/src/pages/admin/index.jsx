import { useState } from "react";
import FormasPagamento from "./pagamentos";

const AdminConfig = () => {
    
    const [option, setOption] = useState('');

    return (
        <>
            <div className="flex flex-col h-screen w-full items-center lg:items-start px-4">
                <h1 className="text-primary text-4xl ml-4 mt-10 text-center lg-text-left lg:mt-20">Ajustes</h1>
                <div className="flex flex-row">
                    <select onChange={(e) =>{ setOption(e.target.value)}} name="" id="" className="bg-primary text-secundary border px-3 py-1 mt-5 text-center text-xl rounded">
                        <option className="bg-secundary text-primary" value="">Selecione</option>
                        <option className="bg-secundary text-primary" value="usuarios">Usuários</option>
                        <option className="bg-secundary text-primary" value="pagamentos">Formas de pagamento</option>
                        <option className="bg-secundary text-primary" value="tipos_quadra">Tipos de quadra</option>
                    </select>
                </div>
            {option === "pagamentos" && (
                <FormasPagamento></FormasPagamento>
            )}

            </div>
        </>
    )
}

export default AdminConfig;