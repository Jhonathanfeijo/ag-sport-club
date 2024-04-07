import { Link } from 'react-router-dom';
import Button from '../../components/button';
import H1 from '../../components/h1';
import Header from '../../components/header';
import Table from '../../components/table';


const Home = () => {


    const quadras = [{ "Quadras favoritas": "D10" }, { "Quadra favoritas": "A10" }]
    const esportes = [{ "Esportes em destaque": 'Futebol' }, { "Esportes em destaque": 'Volei' }];

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center text-primary">
                <Header />
                <div className=" ml-10 h-full w-full flex-1 flex flex-col items-start justify-start">
                    <H1 text={'Olá, Jonas'} />
                    <p className='text-lg mb-5'>Seja bem vindo!</p>

                    <section className='mb-12'>
                        <p>Você não possui reservas próximas</p>
                        <Link to={'/reservas'}>
                            <Button text={'Reservar'} color={'bg-primary'} fontColor={'text-secundary'} />
                        </Link>
                    </section>
                    <p className='w-full text-2xl mb-2'>Sobre você</p>
                    <section className='w-full flex gap-5'>
                        <Table data={quadras} />
                        <Table data={esportes} />
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;