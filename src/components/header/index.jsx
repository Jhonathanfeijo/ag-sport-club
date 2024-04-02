import logo from '../../assets/logo/logo.svg'
import logoHome from '../../assets/icons/home.svg'
import iconReserv from '../../assets/icons/reserva.svg'
import iconMedal from '../../assets/icons/medal.svg'
import iconRectangle from '../../assets/icons/rectangle.svg'
import iconUser from '../../assets/icons/user.svg'
const Header = () => {
    return (
        <>
            <header className="w-1/6 h-full bg-principal flex flex-col items-baseline">
                <img className='w-9/12 mt-12 mb-9 self-center' src={logo} alt="" />
                <nav className='flex flex-row items-center ml-8 my-1.5 gap-4'>
                    <img className='w-7 h-7 m-0 p-0' src={logoHome} alt="" />
                    <a className='text-xl text-white' href="">Inicio</a>
                </nav>
                <nav className='flex flex-row items-center ml-8 my-1.5 gap-4'>
                    <img className='w-7 h-7 m-0 p-0' src={iconReserv} alt="" />
                    <a className='text-xl text-white' href="">Reservas</a>
                </nav>
                <nav className='flex flex-row items-center ml-8 my-1.5 gap-4'>
                    <img className='w-7 h-7 m-0 p-0' src={iconMedal} alt="" />
                    <a className='text-xl text-white' href="">Esportes</a>
                </nav>
                <nav className='flex flex-row items-center ml-8 my-1.5 gap-4'>
                    <img className='w-7 h-7 m-0 p-0' src={iconRectangle} alt="" />
                    <a className='text-xl text-white' href="">Quadras</a>
                </nav>
                <nav className='flex flex-row items-center ml-8 my-1.5 gap-4'>
                    <img className='w-7 h-7 m-0 p-0' src={iconUser} alt="" />
                    <a className='text-xl text-white' href="">Usuários</a>
                </nav>
            </header>
        </>
    );
}

export default Header;