import { Link } from 'react-router-dom';
import Button from '../../components/button';
import H1 from '../../components/h1';
import Header from '../../components/header';
import Table from '../../components/table';
import { useUser } from '../../utils/userProvider';


const Home = () => {

const {user} = useUser();

    const quadras = [{ "Quadras favoritas": "D10" }, { "Quadra favoritas": "A10" }]
    const esportes = [{ "Esportes em destaque": 'Futebol' }, { "Esportes em destaque": 'Volei' }];
    console.log(user.nome)

    return (
        <>
            <div className="h-full max-w-[85%] pt-20 flex-1 flex flex-col items-center lg:items-start lg:justify-start mb-2">
                <H1 text={`Olá, ${user.nome}`} />
                <p className='text-lg mb-5'>Seja bem vindo!</p>

                <section className='mb-12'>
                    <p>Você não possui reservas próximas</p>
                    <Link to={'/reservas'}>
                        <Button text={'Reservar'} color={'bg-primary'} fontColor={'text-secundary'} />
                    </Link>
                </section>
                <p className='text-2xl self-start mb-2'>Sobre você</p>
                <section className='flex self-start flex-col lg:flex-row flex-wrap gap-5'>
                    <Table data={quadras} />
                    <Table data={esportes} />
                </section>

            </div>
        </>
    );
}

export default Home;