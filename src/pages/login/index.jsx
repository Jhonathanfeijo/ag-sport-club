import React from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";
const Login = () => {
    return (
        <div className="w-screen h-screen flex bg-principal justify-center items-center">
            <div className="w-4/5 h-full flex flex-row items-center justify-center">
                <div className="w-1/2 flex justify-end">
                    <img src={logoAg} alt="" className="mr-10 w-4/" />
                </div>
                <div className="w-1/2 flex items-start">
                    <form className="flex flex-col ml-10 w-2/3" action="">
                        <Label text={'Login'} />
                        <Input type='text' />
                        <Label text={'Senha'} />
                        <Input type='password' />
                        <Link className="my-2 text-white">Não tem cadastro?</Link>
                        <Button  text={'Logar'}/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
