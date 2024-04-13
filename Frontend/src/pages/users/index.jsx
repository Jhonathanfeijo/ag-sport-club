import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button";
import H1 from "../../components/h1";
import Header from "../../components/header";
import Input from "../../components/input";
import Table from "../../components/table";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import Label from "../../components/label";
import { useState } from "react";

const Users = () => {

    const [isModalCreateOpen, setIsModalCreateOpen] = useState('false');

    const toOpenModal = () => {
        setIsModalCreateOpen(true)
    }

    const toCloseModal = () =>{
        setIsModalCreateOpen(false)
    }

    const schema = yup
        .object({
            nome: yup.string().required(),
            email: yup.string().required(),
            cpf: yup.string().required(),
        })
        .required()

    const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = () => {

    }

    const users = [
        { Nome: "Jhonathan", Login: "jhonathanfeijo", Email: "jhonathan@gmail.com", CPF: "068.791.991-60"},
        { Nome: "Ana Gabriela", Login: "angafreya", Email: "jhonathan@gmail.com", CPF: "068.791.991-60"},
        { Nome: "Celso", Login: "aleatorio", Email: "jhonathan@gmail.com", CPF: "068.791.991-60"}
    ]


    console.log(isModalCreateOpen)

    return (<>
        <div className="w-screen h-screen flex justify-center items-center text-primary">
            <Header />
            <main className=" ml-10 h-full w-full h-full flex-1 flex flex-col items-start justify-start">
                <H1 text={'Reservas'} />
                <section className='flex flex-col items-start mt-14 flex'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="flex jutify-start items-end text-primary gap-5 mb-2">
                            
                            <section className="flex flex-col justify-start w-64">
                                <Label htmlFor="nome" text={'Nome'}></Label>
                                <Input control={control} name={'nome'} type={'text'} />
                            </section>
                            <section className="flex flex-col justify-start w-36">
                                <Label htmlFor="cpf" text={'CPF'}></Label>
                                <Input control={control} name={'cpf'} type={'text'} />
                            </section>
                        </fieldset>
                    </form>
                    <Table data={users} />
                    <div className="w-56 mt-2">
                        <Button type={'button'} onClick={toOpenModal} text={'Cadastrar usuário'} color={'bg-primary'} fontColor={'text-secundary'}></Button>
                    </div>
                </section>
            </main>
        </div>
        {isModalCreateOpen === true ? (
            <div className='bg-third bg-opacity-30 flex flex-col justify-start items-center opacity-100 fixed top-0 left-0 w-screen h-screen'>
                <div className="mt-20 h-2/3 w-3/12">
                    <form className="flex flex-col h-full w-full bg-secundary rounded-lg">
                        <div className="self-center">
                        <H1 text={'Nova reserva'}></H1>
                        </div>
                    </form>
                </div>
            </div>
        ) : null}
    </>
    );
}

export default Users;