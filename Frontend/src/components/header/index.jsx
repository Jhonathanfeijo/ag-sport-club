import logo from '../../assets/logo/logo.svg'
import logoHome from '../../assets/icons/home.svg'
import iconReserv from '../../assets/icons/reserva.svg'
import iconMedal from '../../assets/icons/medal.svg'
import iconRectangle from '../../assets/icons/rectangle.svg'
import iconUser from '../../assets/icons/user.svg'
import iconOut from '../../assets/icons/out.svg'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../utils/userProvider'


const Header = ({ nivel_permissao }) => {


    const { logout } = useUser();

    return (
        <>

            <header className="max-w-full fixed top-0 left-0 px-3 py-2 flex lg:w-56 lg:flex lg:max-w-[25%] w-full lg:h-screen bg-principal lg:flex-col items-center lg:items-start text-xl justify-between shadow-xl drop-shadow-lg">
                <nav className='w-full flex flex-wrap lg:flex-col items-baseline gap-2.5'>
                    <img className='w-48 mt-12 mb-10 self-center hidden lg:block' src={logo} alt="" />
                    <NavLink className='flex flex-row items-center lg:ml-5 gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/home'}>
                        <img className='w-8 h-8' src={logoHome} alt="" />
                        <p className='text-secundary hidden lg:block' href="">Inicio</p>
                    </NavLink>
                    <NavLink className='flex flex-row items-center lg:ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/reservas'}>
                        <img className='w-8 h-8' src={iconReserv} alt="" />
                        <p className='text-secundary hidden lg:block' href="">Reservas</p>
                    </NavLink>
                    {nivel_permissao === "ADMIN" && (
                        <>
                            <NavLink className='flex flex-row items-center lg:ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                                <img className='w-8 h-8' src={iconMedal} alt="" />
                                <p className='text-secundary hidden lg:block' href="">Esportes</p>
                            </NavLink>
                            <NavLink className='flex flex-row items-center lg:ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/'}>
                                <img className='w-8 h-8' src={iconRectangle} alt="" />
                                <p className='text-secundary hidden lg:block' href="">Quadras</p>
                            </NavLink>
                            <NavLink className='flex flex-row items-center lg:ml-5  gap-5 hover:opacity-80 transition-opacity duration-3000' to={'/users'}>
                                <img className='w-8 h-8' src={iconUser} alt="" />
                                <p className='text-secundary hidden lg:block' href="">Usuários</p>
                            </NavLink>

                        </>
                    )}
                </nav>
                <nav className='lg:w-full flex lg:flex-col justify-center items-center gap-1'>
                    <nav onClick={logout} className='flex flex-row justify-center items-center gap-3 hover:opacity-80 transition-opacity duration-3000 cursor-pointer lg:mb-7'>
                        <img className='w-6 h-6' src={iconOut} alt="" />
                        <p className='text-secundary hidden lg:block' href="">Sair</p>
                    </nav>
                </nav>
            </header>
            <header className=" px-3 py-2 flex lg:w-56 lg:flex lg:max-w-[25%] w-full lg:h-screen lg:flex-col items-center lg:items-start text-xl justify-between"></header>
        </>
    );
}

export default Header;