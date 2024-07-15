import React, { useState } from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { set, useForm } from "react-hook-form";
import { useUser } from "../../utils/userProvider";

const Login = () => {

    const [isLoginSucess, setIsLoginSucess] = useState(false);

    const {login } = useUser();

    const schema = yup.object({
        login: yup.string().required(),
        senha: yup.string().min(6, 'No minímo 6 caracteres').required(),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = (data) => { 
        login(data,setIsLoginSucess);
    }

    return (
        <div className="w-screen h-screen flex bg-principal justify-center items-center">
            <div className={`fixed top-10 right-[-550px] w-[65%] md:w-[400px] duration-[1500ms] transition-all flex flex-col ${isLoginSucess? '-translate-x-[550px]': ''} rounded-l shadow-xl drop-shadow-xl h-[70px] bg-secundary  justify-center items-center`}>
                <h1 className="text-primary text-xl">Logado com sucesso!</h1>
            </div>
            <div className="max-w-[80%] lg:w-3/5 h-full flex flex-col lg:flex-row items-center justify-center pb-28 lg:p-0 gap-14">
                <div className="w-[450px] max-w-[100%] flex justify-center lg:justify-end">
                    <img src={logoAg} alt="" className="w-96" />
                </div>
                <div className="w-[450px] max-w-[100%] flex items-start">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full text-secundary" action="">
                        <Label text={'Login'} />
                        <Input textColor={'text-primary'} control={control} name={'login'} type='text' />
                        {errors.login && <span className="text-red-500">{errors.login.message}</span>} {/* Exibindo mensagem de erro, se houver */}
                        <Label text={'Senha'} />
                        <Input textColor={'text-primary'} control={control} name={'senha'} type='password' />
                        {errors.senha && <span className="text-red-500">{errors.senha.message}</span>} {/* Exibindo mensagem de erro, se houver */}
                        <Link to={'/register'} className="my-2 text-secundary">Não tem cadastro?</Link>
                        <Button type={'submit'} text={'Logar'} fontColor={'text-xl text-primary'} color={"bg-secundary"} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
