import logo from '../../assets/logo/logo.svg'
import logoHome from '../../assets/icons/home.svg'
import iconReserv from '../../assets/icons/reserva.svg'
import iconMedal from '../../assets/icons/medal.svg'
import iconRectangle from '../../assets/icons/rectangle.svg'
import iconUser from '../../assets/icons/user.svg'
import iconOut from '../../assets/icons/out.svg'
import { Link, NavLink, } from 'react-router-dom'

const Header = () => {
    return (
        <>

            <header className="w-1/6 h-screen bg-principal flex flex-col justify-between">
                <nav className='w-full flex flex-col items-baseline gap-2.5 text-xl'>
                    <img className='w-9/12 mt-12 mb-10 self-center' src={logo} alt="" />
                    <NavLink className='flex flex-row items-center gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                        <img className='w-8 h-8' src={logoHome} alt="" />
                        <p className='text-secundary' href="">Inicio</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                        <img className='w-8 h-8' src={iconReserv} alt="" />
                        <p className='text-secundary' href="">Reservas</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                        <img className='w-8 h-8' src={iconMedal} alt="" />
                        <p className='text-secundary' href="">Esportes</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                        <img className='w-8 h-8' src={iconRectangle} alt="" />
                        <p className='text-secundary' href="">Quadras</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center ml-8  gap-5 hover:opacity-80 transition-opacity duration-3000'>
                        <img className='w-8 h-8' src={iconUser} alt="" />
                        <p className='text-secundary' href="">Usuários</p>
                    </NavLink>
                </nav>
                <nav className='w-full flex flex-col items-center gap-1'>
                    <NavLink className='flex flex-row items-center gap-5 hover:opacity-80 transition-opacity duration-3000 mb-7' to='/login'>
                        <img className='w-8 h-8' src={iconOut} alt="" />
                        <p className='text-secundary' href="">Sair</p>
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default Header;