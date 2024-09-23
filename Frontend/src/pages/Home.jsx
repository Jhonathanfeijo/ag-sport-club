import { useEffect, useState } from "react";
import Header from "../components/header";
import Users from "../components/users";
import Reserv from "../components/reserv";
import Sports from "../components/sports";
import Courts from "../components/Courts";
import AdminConfig from "../components/admin";
import { getUserLocalStorage, useUser } from "../utils/userProvider";
import Main from "../components/home";

const Home = () => {

    const { setUser, user, logout } = useUser();

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = getUserLocalStorage();
        if (token === null) {
          logout();
        } else {
          setUser(token)
          setLoading(false);
        }
      };
      checkAuthentication();
    }, []);
  

    const [option, setOption] = useState('myProfile');

    return (<>
        <div className="flex flex-col md:flex-row h-screen w-screen">
            <Header nivel_permissao={user.permissao} option={option} setOption={setOption} />
            <main className="flex-1 w-full md:w-auto md:h-full text-primary">
                {option === 'home' && <Main setOption={setOption}/>}
                {option === 'myProfile' && <Users></Users>}
                {option === 'myReservs' && <Reserv />}
                {option === "sports" && <Sports />}
                {option === 'courts' && <Courts />}
                {option === 'admin' && <AdminConfig />}
            </main>
        </div>
    </>);
}

export default Home;