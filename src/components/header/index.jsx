import logo from '../../assets/logo/logo.svg'
import logoHome from '../../assets/icons/home.svg'
import iconReserv from '../../assets/icons/reserva.svg'
import iconMedal from '../../assets/icons/medal.svg'
import iconRectangle from '../../assets/icons/rectangle.svg'
import iconUser from '../../assets/icons/user.svg'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className="w-1/6 h-screen bg-principal flex flex-col items-baseline justify-start gap-2.5">
                <img className='w-9/12 mt-12 mb-9 self-center' src={logo} alt="" />
                <nav>
                    <Link className='flex flex-row items-center  gap-4' to={'/'}>
                        <img className='w-7 h-7 m-0 p-0' src={logoHome} alt="" />
                        <p className='text-xl text-secundary' href="">Inicio</p>
                    </Link>
                </nav>
                <nav >
                    <Link className='flex flex-row items-center  gap-4' to={'/'}>
                        <img className='w-7 h-7 m-0 p-0' src={iconReserv} alt="" />
                        <a className='text-xl text-secundary' href="">Reservas</a>
                    </Link>
                </nav>
                <nav >
                    <Link className='flex flex-row items-center  gap-4' to={'/'}>
                        <img className='w-7 h-7 m-0 p-0' src={iconMedal} alt="" />
                        <a className='text-xl text-secundary' href="">Esportes</a>
                    </Link>
                </nav>
                <nav >
                    <Link className='flex flex-row items-center  gap-4' to={'/'}>
                        <img className='w-7 h-7 m-0 p-0' src={iconRectangle} alt="" />
                        <a className='text-xl text-secundary' href="">Quadras</a>
                    </Link>
                </nav>
                <nav className='flex flex-row items-center ml-8  gap-4'>
                    <img className='w-7 h-7 m-0 p-0' src={iconUser} alt="" />
                    <a className='text-xl text-secundary' href="">Usuários</a>
                </nav>
                <div className='flex-1'></div>
                <Link className='text-secundary text-xl mb-10' to='/login'>Sair</Link>
            </header>
        </>
    );
}

export default Header;