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

const Reserv = () => {

    const [isModalCreateOpen, setIsModalCreateOpen] = useState('false');

    const toOpenModal = () => {
        setIsModalCreateOpen(true)
    }

    const toCloseModal = () => {
        setIsModalCreateOpen(false)
    }

    const schema = yup
        .object({
            data: yup.string().required(),
            horario: yup.string().required(),
            quadra: yup.string().required(),
            status: yup.string().required(),


        })
        .required()

    const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = () => {

    }

    const reservs = [
        { Data: "17-05-2023", Horario: "17:00 - 18:00", Quadra: "D10", Status: "Cancelado" },
        { Data: "11-07-2022", Horario: "14:00 - 15:00", Quadra: "A05", Status: "Pago" },
        { Data: "08-04-2024", Horario: "16:00 - 17:00", Quadra: "D10", Status: "Pendente" }
    ]


    console.log(isModalCreateOpen)

    return (<>
        <div className="w-screen h-screen flex justify-center items-center text-primary">
            <main className=" pt-20 md:ml-10 w-[85%] md:w-full h-full flex-1 flex flex-col items-center md:items-start justify-start">
                <H1 text={'Reservas'} />
                <section className='flex flex-col w-[85%] md:w-[500px] items-start mt-10'>
                    <form className="hidden md:block" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="flex w-full jutify-start items-end text-primary gap-5 mb-2">

                            <section className="flex flex-col justify-start w-24">
                                <Label htmlFor="data" text={'Data'}></Label>
                                <Input control={control} name={'data'} type={'text'} />
                            </section>
                            <section className="flex flex-col justify-start w-28">
                                <Label htmlFor="horario" text={'Horario'}></Label>
                                <Input control={control} name={'horario'} type={'text'} />
                            </section>
                            <section className="flex flex-col justify-start w-20">
                                <Label htmlFor="quadra" text={'Quadra'}></Label>
                                <Input control={control} name={'quadra'} type={'text'} />
                            </section>
                            <section className="flex flex-col justify-start w-24">
                                <Label htmlFor="status" text={'Status'}></Label>
                                <Input control={control} name={'status'} type={'text'} />
                            </section>
                        </fieldset>
                    </form>
                    <Table data={reservs} />
                    <div className="w-1/2 mt-2">
                        <Button type={'button'} onClick={toOpenModal} text={'Fazer nova reserva'} color={'bg-primary'} fontColor={'text-secundary'}></Button>
                    </div>
                </section>
            </main>
        </div>
        {isModalCreateOpen === true ? (
            <div className='bg-third bg-opacity-20 flex flex-col flex-wrap justify-start items-center opacity-100 fixed top-0 left-0 w-screen h-screen'>
                <div className="mt-28 md:mt-20 h-[450px] lg:w-[500px] w-[85%] bg-secundary rounded-md ">
                    <div className="w-full h-full py-10 flex flex-col justify-center items-center">
                        <H1 className text={'Nova reserva'}></H1>
                        <form className=" flex flex-col h-full w-full">
                            <div className="self-center">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        ) : null}
    </>
    );
}

export default Reserv;