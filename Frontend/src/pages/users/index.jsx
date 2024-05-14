import H1 from "../../components/h1";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useUser } from "../../utils/userProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Label from "../../components/label";
import Input from "../../components/input";
import Button from "../../components/button";
import { getUserLocalStorage } from "../../utils/userProvider";

const Users = () => {

    const { logout } = useUser();

    const [isDataLoadered, setIsDataLoadered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState();
    const [usersFiltered, setUsersFiltered] = useState();


    const toFilterUser = (data) => {
        const content = data.map((userData) => {
            return {
                Nome: userData.nome,


            }
        })
        return content;
    }

    useEffect(() => {
        const user = getUserLocalStorage();
        if (user === null)
            logout();
        const fetchData = async () => {
            const data = await api.get("/usuario/all",
                {
                    headers: {
                        Authorization: "Bearer " + user.token.replace(/['"]/g, '')
                    }
                }
            )
            setUsers(data.data.content);
            setUsersFiltered(toFilterUser(data.data.content));
            setIsDataLoadered(true)
        }
        fetchData();
    }, [usersFiltered])

    const handleModal = () => {
        setIsModalOpen((prev) => !prev)
    }

    const schema = yup.object({
        login_novo_usuario: yup.string().required(),
        senha_novo_usuario: yup.string().min(6, 'No minímo 6 caracteres').required(),
        email_novo_usuario: yup.string().email("Digite um email válido").required(),
        nome_novo_usuario: yup.string().min(3, "O nome precisa ter mais de 3 letras").required(),
        cpf_novo_usuario: yup.string().required(),
    }).required();

    const { control, handleSubmit, watch, formState: { errors, invalid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const postData = async (data) => {

        const response = await api.post("/auth/register",
            {
                nome: data.nome_novo_usuario,
                cpf: data.cpf_novo_usuario,
                email: data.email_novo_usuario,
                login: data.login_novo_usuario,
                senha: data.senha_novo_usuario
            }
        );
        if (response) {
            setIsModalOpen(false)
            console.log(data.nome_novo_usuario)
            setUsersFiltered([...usersFiltered, {
                Nome: data.nome_novo_usuario
            }])
        }

    }
    const onSubmit = (data) => {
        postData(data)
    }

    return (
        <>
            {isDataLoadered ? (
                <div className="w-screen h-screen flex max-w-screen justify-center items-center text-primary mb-5">
                    <main className=" pt-20 md:ml-10 w-[85%] max-w-[100%] md:w-full h-full flex-1 flex flex-col items-center lg:items-start justify-start">
                        <H1 text={'Usuarios'} />
                        <section className=" my-5 lg:mt-10 mb-2 w-[92%] lg:w-[600px] flex flex-col lg:items-end justify-start lg:flex-row lg:justify-start gap-2 lg:gap-3">
                            <div className="flex-wrap flex flex-col items-start justify-start">
                                <label className="text-lg " htmlFor="nomeBusca">Nome</label>
                                <input className="p-2 border border-primary rounded" type="text" name="nomeBusca" id="nomeBusca" />
                            </div>
                            <div className=" flex-wrap flex flex-col items-start justify-start">
                                <label className="text-lg " htmlFor="cpfBusca">CPF</label>
                                <input className="w-[150px] max-w-[90%] p-2 border border-primary rounded" type="text" name="cpfBusca" id="cpfBusca" />
                            </div>
                            <div className="flex-1"></div>
                            <div>
                                <button onClick={handleModal} className="py-2 px-2 rounded border border-primary bg-primary text-lg text-secundary">Adicionar usuário</button>
                            </div>
                        </section>
                        <section className="w-[92%] lg:w-[600px] drop-shadow-md shadow-xl flex flex-col justify-center items-center lg:items-start">
                            <table className="w-full ">
                                <thead className="w-full bg-primary border-primary ">
                                    <tr className="w-full">
                                        <>{Object.keys(usersFiltered[0]).map((key, index) => {
                                            return <th className={` ${index === 0 ? 'rounded-tl-lg' : ''} border w-full text-left text-secundary px-2 py-5`} key={index}>{key}</th>
                                        })}
                                            <th className="m-0 px-2 py-4 h-full"></th>
                                            <th className="rounded-tr-lg m-0 px-2 py-4 h-full"></th>
                                        </>
                                    </tr>
                                </thead>
                                <tbody className="w-full border border-primary">
                                    {usersFiltered.map((userRow, index) => {
                                        return <tr key={index}> <>
                                            {Object.values(userRow).map((userTd, index) => {
                                                return (
                                                    <td className="px-2 py-2" key={index}>{userTd}</td>
                                                )
                                            })}
                                            <td className="px-2 py-1.5"><button className=" shadow-sm drop-shadow bg-primary text-secundary p-1 px-2">Editar</button></td>
                                            <td className="px-2 py-1.5"><button className=" shadow-sm drop-shadow bg-danger text-secundary  p-1 px-2">Excluir</button></td>

                                        </>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </section>
                        {isModalOpen && (
                            <div className="fixed h-screen w-screen bg-third bg-opacity-10 top-0 left-0 flex justify-center items-start">
                                <div className="bg-secundary w-[90%] md:w-[500px] h-[87%] md:h-[650px] drop-shadow-xl shadow-xl rounded-lg flex flex-col items-center mt-20">
                                    <div className="my-8">
                                        <H1 text={"Cadastrar usuário"}></H1>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] md:w-[75%] flex flex-col justify-start items-start gap-1 text-base font-semibold" action="">
                                        <Label textColor={"text-primary"} text={"Nome"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"nome_novo_usuario"} />
                                        <Label textColor={"text-primary"} text={"CPF"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"cpf_novo_usuario"} />
                                        <Label textColor={"text-primary"} text={"Email"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"email_novo_usuario"} />
                                        <Label textColor={"text-primary"} text={"Login"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"login_novo_usuario"} />
                                        <Label textColor={"text-primary"} text={"Senha"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"password"} name={"senha_novo_usuario"} />

                                        <Button type={"submit"} color={"bg-primary"} fontColor={"text-secundary"} text={"Cadastrar"}></Button>
                                        <Button onClick={handleModal} type={"button"} color={"bg-secundary"} fontColor={"text-primary"} text={"Cancelar"}></Button>
                                    </form>
                                    <div className="w-[90%] mt-2">
                                    </div>
                                </div>

                            </div>
                        )}
                    </main>
                </div>)
                : null}
        </>
    );
}

export default Users;