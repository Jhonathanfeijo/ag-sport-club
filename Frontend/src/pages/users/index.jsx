import H1 from "../../components/h1";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useUser } from "../../utils/userProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import Label from "../../components/label";
import Input from "../../components/input";
import Button from "../../components/button";

const Users = () => {

    const { user } = useUser();

    const [isDataLoadered, setIsDataLoadered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState();
    const [usersFiltered, setUsersFiltered] = useState();


    const toFilterUser = (data) => {
        const content = data.map((userData) => {
            return {
                ID: userData.idUsuario,
                Nome: userData.nome,
                CPF: userData.cpf
            }
        })
        return content;
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get("/usuario/all",
                {
                    headers: {
                        Authorization: "Bearer " + user.token
                    }
                }
            )
            setUsers(data.data.content);
            setUsersFiltered(toFilterUser(data.data.content));
            setIsDataLoadered(true)
        }
        fetchData();
    }, [])

    const handleModal = () => {
        setIsModalOpen((prev) => !prev)
    }

    const schema = yup.object({
        loginNovoUsuario: yup.string().required(),
        senhaNovoUsuario: yup.string().min(6, 'No minímo 6 caracteres').required(),
        emailNovoUsuario: yup.string().email("Digite um email válido").required(),
        nomeNovoUsuario: yup.string().min(3, "O nome precisa ter mais de 3 letras").required(),
        cpfNovoUsuario: yup.string().required(),
        nivelPermissaoNovoUsuario: yup.string().required()
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = (data) => {
        console.log(data)
        const postData = async () => {

            const response = await api.post("/auth/register",
                {
                    headers: {
                        Authorization: "Bearer " + user.token
                    },

                }, {
                nome: data.nomeNovoUsuario,
                cpf: data.cpfNovoUsuario,
                email: data.emailNovoUsuario,
                nivelPermissao: data.nivelPermissaoNovoUsuario,
                login: data.loginNovoUsuario,
                senha: data.senhaNovoUsuario
            }
            )
            if (response.status)
                console.log("A")
        }
        postData();
    }

    return (
        <>
            {isDataLoadered ? (
                <div className="w-screen h-screen flex justify-center items-center text-primary">
                    <main className=" pt-20 md:ml-10 w-[85%] md:w-full h-full flex-1 flex flex-col items-center lg:items-start justify-start">
                        <H1 text={'Usuarios'} />
                        <section className=" my-5 lg:mt-10 mb-2 w-[92%] lg:w-[600px] flex flex-col lg:items-end justify-start lg:flex-row lg:justify-start gap-2 lg:gap-3">
                            <div className="flex-wrap flex flex-col items-start justify-start">
                                <label className="text-lg font-semibold" htmlFor="nomeBusca">Nome</label>
                                <input className="py-1 border-2 border-primary rounded" type="text" name="nomeBusca" id="nomeBusca" />
                            </div>
                            <div className=" flex-wrap flex flex-col items-start justify-start">
                                <label className="text-lg font-semibold" htmlFor="cpfBusca">CPF</label>
                                <input className="w-[140px] p-1 border-2 border-primary rounded" type="text" name="cpfBusca" id="cpfBusca" />
                            </div>
                            <div className="flex-1"></div>
                            <div>
                                <button onClick={handleModal} className="py-1 px-2 rounded border-2 border-primary bg-primary text-secundary">Adicionar usuário</button>
                            </div>
                        </section>
                        <section className="w-[92%] lg:w-[600px] rounded-lg flex flex-col justify-center items-center lg:items-start">
                            <table className="w-full rounded-lg border table-auto overflow-auto drop-shadow-md shadow-xl">
                                <thead className="bg-primary">
                                    <tr>
                                        <>{Object.keys(usersFiltered[0]).map((key, index) => {
                                            return <th className="text-left text-secundary px-2 py-3" key={index}>{key}</th>
                                        })}
                                            <th></th>
                                            <th></th>
                                        </>
                                    </tr>
                                </thead>
                                <tbody className="overflow-auto">
                                    {usersFiltered.map((userRow, index) => {
                                        return <tr key={index}> <>
                                            {Object.values(userRow).map((userTd, index) => {
                                                return (
                                                    <td className="px-2 py-2" key={index}>{userTd}</td>
                                                )
                                            })}
                                            <td className="px-2 py-1.5"><button className="rounded shadow drop-shadow bg-primary text-secundary p-1 px-2">Editar</button></td>
                                            <td className="px-2 py-1.5"><button className="rounded shadow drop-shadow bg-danger text-secundary  p-1 px-2">Excluir</button></td>

                                        </>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </section>
                        {isModalOpen && (
                            <div className="fixed h-screen w-screen bg-third bg-opacity-10 top-0 left-0 flex justify-center items-start">
                                <div className="bg-secundary w-[90%] h-[75%] drop-shadow-md shadow-xl rounded-lg flex flex-col items-center mt-28">
                                    <div className="my-7">
                                        <H1 text={"Novo usuario"}></H1>
                                    </div>
                                    <form className="w-[90%] flex flex-col justify-start items-start gap-2" onSubmit={handleSubmit(onSubmit)}>
                                        <Label textColor={"text-primary"} text={"Nome"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"nomeNovoUsuario"} />
                                        <Label textColor={"text-primary"} text={"CPF"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"cpfNovoUsuario"} />
                                        <Label textColor={"text-primary"} text={"Email"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"emailNovoUsuario"} />
                                        <Label textColor={"text-primary"} text={"Nivel de permissão"}></Label>
                                        <select className="w-full py-1 border border-primary rounded" name="nivelPermissaoNovoUsuario" id="nivelPermissaoNovoUsuario">
                                            <option value="USER">Usuário</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                        <Label textColor={"text-primary"} text={"Login"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"text"} name={"loginNovoUsuario"} />
                                        <Label textColor={"text-primary"} text={"Senha"} />
                                        <Input textColor={"text-primary"} color={"bg-secundary"} control={control} type={"password"} name={"senhaNovoUsuario"} />
                                        <div className="w-full">
                                            <Button type={"submit"} color={"bg-primary"} fontColor={"text-secundary"} text={"Cadastrar"}></Button>
                                        </div>
                                    </form>
                                    <div className="w-[90%] mt-2">
                                        <Button onClick={handleModal} type={"button"} color={"bg-secundary"} fontColor={"text-primary"} text={"Cancelar"}></Button>
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