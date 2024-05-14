import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button";
import H1 from "../../components/h1";
import Input from "../../components/input";
import Table from "../../components/table";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import Label from "../../components/label";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import closeIcon from '../../assets/icons/x.svg'
import { api } from "../../../services/api";
import { getUserLocalStorage } from "../../utils/userProvider";

const Reserv = () => {
    const reservsRequest = [
        { Data: "17-05-2023", Horario: "17:00 - 18:00", Quadra: "D10", Status: "Cancelado" },
        { Data: "11-07-2022", Horario: "14:00 - 15:00", Quadra: "A05", Status: "Pago" },
        { Data: "08-04-2024", Horario: "16:00 - 17:00", Quadra: "D10", Status: "Pendente" }
    ]
    const [isQuadraDataLoadered, setIsQuadraDataLoadered] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [quadras, setQuadras] = useState([])
    const [reservs, setReservs] = useState(reservsRequest);
    const [valuesInputSearch, setValuesInputSearch] = useState({
        date: "",
        status: "",
        quadra: "",
    })
    const sports = ['Futebol', 'Futsal', 'Volei']
    const status = ['pago', 'cancelado', 'pendente']
    const payments = ['Dinheiro', 'PIX', 'Cartão de crédito', 'Cartão de débito']


    useEffect(() => {
        const token = getUserLocalStorage();
        const fetchQuadras = async () => await api.get("/quadra", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        );
        const quadras = fetchQuadras();
        setIsQuadraDataLoadered(true);
        
    }, [])

    useEffect(() => {
        const reservsFiltered = reservsRequest.filter(item => {

            return (valuesInputSearch.status === "" ? true : valuesInputSearch.status.toUpperCase() === item.Status.toUpperCase())
                && (valuesInputSearch.quadra === "" ? true : valuesInputSearch.quadra.toUpperCase() === item.Quadra.toUpperCase())
        }
        )
        setReservs(reservsFiltered)
    }, [valuesInputSearch])

    const onChangeInputSearch = (event) => {
        const { name, value } = event.target;
        setValuesInputSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const toOpenModal = () => {
        setIsModalCreateOpen(true)
    }

    const toCloseModal = () => {
        setIsModalCreateOpen(false)
    }

    const schemaSearch = yup
        .object({
            dateSearch: yup.string().required(),
            quadraSearch: yup.string().required(),
            statusSearch: yup.string().required(),


        })
        .required()

    const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schemaSearch),
        mode: "onSubmit"
    });

    const onSubmit = () => {

    }

    return (<>
        <div className="w-screen h-screen flex justify-center items-center text-primary">
            <main className=" pt-20 md:ml-10 w-[85%] md:w-full h-full flex-1 flex flex-col items-center md:items-start justify-start">
                <H1 text={'Reservas'} />
                <section className='flex flex-col w-[85%] md:w-[500px] items-start mt-10'>
                    <form className="hidden md:inline" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="flex w-full jutify-start items-end text-primary gap-5 mb-2">

                            <section className="flex flex-col justify-start">
                                <Label htmlFor="dateSearch" text={'Data'}></Label>
                                <input className="w-auto px-2 py-1 border rounded" type='date' name={'dateSearch'} />
                            </section>
                            <section className="flex flex-col justify-start">
                                <Label htmlFor="quadraSearch" text={'Quadra'}></Label>
                                <select className="p-1 border rounded" name="quadra" id="quadra" onChange={onChangeInputSearch}>
                                    <option value="">Todas</option>
                                    {quadras.map((quadra, index) => <option value={quadra === 'todas' ? '' : quadra} key={index}>{capitalizeFirstLetter(quadra)}</option>)}
                                </select>

                            </section>
                            <section className="flex flex-col justify-start">
                                <Label htmlFor="statusSearch" text={'Status'}></Label>
                                <select className="py-1 rounded border" name="status" id="status" onChange={onChangeInputSearch}>
                                    <option value="">Todos</option>
                                    {status.map((item, index) => <option value={item === 'todos' ? '' : item} key={index}>{capitalizeFirstLetter(item)}</option>)}
                                </select>
                            </section>
                        </fieldset>
                    </form>
                    {reservs.length !== 0 ?
                        < Table data={reservs} />
                        :
                        <h1 className="text-primary">Não foram encontradas reservas</h1>
                    }
                    <div className="mt-2 w-full md:w-[50%]">
                        <Button type={'button'} onClick={toOpenModal} text={'Fazer nova reserva'} color={'bg-primary'} fontColor={'text-secundary'}></Button>
                    </div>
                </section>
            </main>
        </div>
        {isModalCreateOpen === true ? (
            <div className='bg-third bg-opacity-10 flex flex-col flex-wrap justify-start items-center opacity-100 fixed top-0 left-0 w-screen h-screen duration-500'>
                <div className="mt-28 md:mt-20 h-[70%] lg:w-[500px] w-[85%] bg-secundary rounded-md shadow-xl drop-shadow-xl duration-500 ">
                    <div className="w-full h-full py-10 flex flex-col justify-center items-center relative duration-500">
                        <img className="absolute right-[20px] top-[20px] w-8 opacity-50 hover:opacity-70 hover:cursor-pointer duration-200" src={closeIcon} onClick={toCloseModal} alt="" />
                        <H1 className text={'Reservar'}></H1>
                        <form className="flex flex-col h-full w-full px-12">
                            <div className="w-full mt-5 flex flex-col gap-1">
                                <label className="font-bold" htmlFor="sportNewReserv">Esporte</label>
                                <select className="border p-1 w-full rounded" name="sportNewReserv" id="sportNewReserv">
                                    {sports.map((sport) => <option value={sport}>{capitalizeFirstLetter(sport)}</option>)}
                                </select>
                            </div>
                            <div className="w-full mt-5 flex flex-col gap-1">
                                <label className="font-bold" htmlFor="quadraNewReserv">Quadra</label>
                                <select className="border p-1 w-full rounded" name="quadraNewReserv" id="quadraNewReserv">
                                    {quadras.map((quadra) => <option value={quadra}>{capitalizeFirstLetter(quadra)}</option>)}
                                </select>
                            </div>
                            <div className="w-full mt-5 flex flex-col gap-1">
                                <label className="font-bold" htmlFor="dateNewReserv">Data</label>
                                <Input type={'date'} control={control} name={'dateNewReserv'} id={'dateNewReserv'} />
                            </div>
                            <div className="w-full mt-5 flex flex-col gap-1">
                                <label className="font-bold" htmlFor="paymentNewReserv">Forma de pagamento</label>
                                <select className="border p-1 w-full rounded" name="paymentNewReserv" id="paymentNewReserv">
                                    {payments.map((payment) => <option value={payment}>{capitalizeFirstLetter(payment)}</option>)}
                                </select>
                            </div>
                            <div className="my-5 py-2 px-1 w-full">
                                <Button text={'Cadastrar'} color={'bg-primary'} fontColor={'text-secundary'}></Button>
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