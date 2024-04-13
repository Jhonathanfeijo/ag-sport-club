import logo from '../../assets/logo/logo.svg'
import logoHome from '../../assets/icons/home.svg'
import iconReserv from '../../assets/icons/reserva.svg'
import iconMedal from '../../assets/icons/medal.svg'
import iconRectangle from '../../assets/icons/rectangle.svg'
import iconUser from '../../assets/icons/user.svg'
import iconOut from '../../assets/icons/out.svg'
import { NavLink} from 'react-router-dom'
import { useUser } from '../../utils/userProvider'


const Header = () => {

const{logout} = useUser();

    return (
        <>

            <header className="w-56 h-screen bg-principal flex flex-col text-xl justify-between">
                <nav className='w-full flex flex-col items-baseline gap-2.5 '>
                    <img className='w-48 mt-12 mb-10 self-center' src={logo} alt="" />
                    <NavLink className='flex flex-row items-center ml-5 gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/home'}>
                        <img className='w-8 h-8' src={logoHome} alt="" />
                        <p className='text-secundary' href="">Inicio</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/reservas'}>
                        <img className='w-8 h-8' src={iconReserv} alt="" />
                        <p className='text-secundary' href="">Reservas</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                        <img className='w-8 h-8' src={iconMedal} alt="" />
                        <p className='text-secundary' href="">Esportes</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                        <img className='w-8 h-8' src={iconRectangle} alt="" />
                        <p className='text-secundary' href="">Quadras</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/users'}>
                        <img className='w-8 h-8' src={iconUser} alt="" />
                        <p className='text-secundary' href="">Usuários</p>
                    </NavLink>
                </nav>
                <nav className='w-full flex flex-col items-center gap-1'>
                    <nav onClick={logout} className='flex flex-row items-center gap-3 hover:opacity-80 transition-opacity duration-3000 cursor-pointer mb-7'>
                        <img className='w-6 h-6' src={iconOut} alt="" />
                        <p className='text-secundary' href="">Sair</p>
                    </nav>
                </nav>
            </header>
        </>
    );
}

export default Header;