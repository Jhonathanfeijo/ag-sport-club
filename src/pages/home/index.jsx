import Button from '../../components/button';
import H1 from '../../components/h1';
import Header from '../../components/header';
const Home = () => {
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center">
                <Header />
                <div className=" ml-14 h-full w-full flex-1 flex flex-col items-start justify-start">
                    <H1 text={'Olá, Jonas'} />
                    <p className='text-lg mb-8'>Seja bem vindo!</p>
                    <p className='text-2xl'>Sobre você</p>
                    <p className='my-1'>Você não possui reservas próximas</p>
                    <Button text={'Reservar'}></Button>                    
                </div>
            </div>
        </>
    );
}

export default Home;