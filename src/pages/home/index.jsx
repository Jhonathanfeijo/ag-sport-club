import Button from '../../components/button';
import H1 from '../../components/h1';
import Header from '../../components/header';
import Table from '../../components/table';
const Home = () => {

    const quadras = ['D11', 'A10'];
    const esportes = ['Futebol', 'Volei'];

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center text-primary">
                <Header />
                <div className=" ml-10 h-full w-full flex-1 flex flex-col items-start justify-start">
                    <H1 text={'Olá, Jonas'} />
                    <p className='text-lg mb-5'>Seja bem vindo!</p>

                    <section>
                        <p className='w-full mb-4 text-2xl'>Sobre você</p>
                        <p>Você não possui reservas próximas</p>
                        <Button text={'Reservar'} color={'bg-primary'} fontColor={'text-secundary'} />
                    </section>
                    <section className='w-full mt-5 flex gap-5'>
                        <Table list = {esportes} cabeçalho={'Esportes em destaque'} />
                        <Table list= {quadras} cabeçalho={'Quadras favoritas'} />
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;