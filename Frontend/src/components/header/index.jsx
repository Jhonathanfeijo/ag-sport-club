import { NavLink } from 'react-router-dom'
import logoHome from '../../assets/icons/home.svg'
import iconMedal from '../../assets/icons/medal.svg'
import iconOut from '../../assets/icons/out.svg'
import iconRectangle from '../../assets/icons/rectangle.svg'
import iconReserv from '../../assets/icons/reserva.svg'
import iconUser from '../../assets/icons/user.svg'
import config from '../../assets/icons/config.svg'
import logo from '../../assets/logo/logo.svg'
import { useUser } from '../../utils/userProvider'
import { useState } from 'react'


const Header = ({ nivel_permissao }) => {

    const [option, setOption] = useState('')
    const { logout } = useUser();

    return (
        <>

            <header className="max-w-full top-0 sticky z-10 left-0 py-2 flex lg:w-[220px] lg:flex lg:max-w-[25%] w-full lg:h-screen bg-principal lg:flex-col items-center lg:items-center px-2 lg:px-0 text-xl justify-between shadow-xl drop-shadow-lg">
                <nav className='w-full flex flex-wrap lg:flex-col items-baseline gap-2.5'>
                    <img className='w-48 mt-12 mb-10 self-center hidden lg:block lg:px-2' src={logo} alt="" />
                    <NavLink onClick={() => setOption('begin')} className='flex flex-row items-center lg:px-2 lg:w-full gap-2 hover:opacity-80 transition-opacity duration-3000' to={'/home'}>
                        <img className='w-8 h-8' src={logoHome} alt="" />
                        <p className={`text-secundary duration-300 hidden lg:block`} href="">Inicio</p>
                    </NavLink>
                    <NavLink onClick={() => setOption('myProfile')} className='flex flex-row items-center   gap-2 lg:w-full lg:px-2 hover:opacity-80 transition-opacity duration-3000' to={'/users'}>
                        <img className='w-8 h-8' src={iconUser} alt="" />
                        <p className={` text-secundary duration-300 hidden lg:block`} href="">Meu perfil</p>
                    </NavLink>
                    <NavLink onClick={() => setOption('myReservs')} className='flex flex-row items-center   gap-2 lg:w-full lg:px-2 hover:opacity-80 transition-opacity duration-3000' to={'/reservas'}>
                        <img className='w-8 h-8' src={iconReserv} alt="" />
                        <p className={` text-secundary duration-300 hidden lg:block`}  href="">Minhas Reservas</p>
                    </NavLink>
                    <NavLink onClick={() => setOption('sports')} className={`flex flex-row items-center lg:w-full lg:px-2 gap-2 hover:opacity-80 transition-opacity duration-3000'`} to={'/sports'}>
                        <img className='w-8 h-8' src={iconMedal} alt="" />
                        <p className={` text-secundary duration-300 hidden lg:block`}href="">Esportes</p>
                    </NavLink>
                    <NavLink onClick={() => setOption('courts')} className='flex flex-row items-center gap-2 lg:w-full lg:px-2 transition-opacity duration-3000' to={'/courts'}>
                        <img className='w-8 h-8' src={iconRectangle} alt="" />
                        <p className={` text-secundary duration-300 hidden lg:block`} href="">Quadras</p>
                    </NavLink>
                    {nivel_permissao === "ADMIN" && (
                        <>
                            <NavLink onClick={() => setOption('admin')} className='flex flex-row items-center   gap-2 lg:w-full lg:px-2 hover:opacity-80 transition-opacity duration-3000' to={'/config'}>
                                <img className='w-8 h-8' src={config} alt="" />
                                <p className={` text-secundary duration-300 hidden lg:block`} href="">Configurações</p>
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
        </>
    );
}

export default Header;