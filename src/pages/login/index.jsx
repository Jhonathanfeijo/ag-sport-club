import React from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link, Navigate } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";

const auth = () =>{
   return (<Navigate to={'/'} replace = {true}/>)
}

const Login = () => {
    return (
        <div className="w-screen h-screen flex bg-principal justify-center items-center">
            <div className="w-3/5 h-full flex flex-row items-center justify-center">
                <div className="w-1/2 flex justify-end">
                    <img src={logoAg} alt="" className="mr-10 w-4/" />
                </div>
                <div className="w-1/2 flex items-start">
                    <form className="flex flex-col ml-10 w-2/3" action="">
                        <Label text={'Login'} />
                        <Input type='text' />
                        <Label text={'Senha'} />
                        <Input type='password' />
                        <Link className="my-2 text-secundary">Não tem cadastro?</Link>
                        <Button onClick={auth} text={'Logar'} fontColor={'text-xl text-primary'} color={"bg-secundary"} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
