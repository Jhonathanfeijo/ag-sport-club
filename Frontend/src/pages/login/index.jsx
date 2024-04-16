import React from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { useUser } from "../../utils/userProvider";

const Login = () => {

    const { login } = useUser();
    const schema = yup
        .object({
            email: yup.string().email('Email não é valido').required(),
            senha: yup.string().min(6, 'No minímo 6 caracteres').required(),
        })
        .required()

    const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = async formData => {
        try {
            const { data } = await api.get(`users?email=${formData.email}&senha=${formData.senha}`)
            if (data.length === 1) {
                login(formData.email);
            } else
                alert('Credenciais inválidas');
        } catch (error) {
            alert('Houve um erro de conexão');
        }
    }

    return (
        <div className="w-screen h-screen flex bg-principal justify-center items-center">
            <div className="max-w-[80%] lg:w-3/5 h-full flex flex-col lg:flex-row items-center justify-center pb-28 lg:p-0 gap-14">
                <div className="w-[450px] max-w-[100%] flex justify-center lg:justify-end">
                    <img src={logoAg} alt="" className="w-96" />
                </div>
                <div className="w-[450px] max-w-[100%] flex items-start">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full text-secundary" action="">
                        <Label text={'Email'} />
                        <Input textColor={'text-primary'} control={control} name={'email'} type='text' />
                        <Label text={'Senha'} />
                        <Input textColor={'text-primary'} control={control} name={'senha'} type='password' />
                        <Link to={'/register'} className="my-2 text-secundary">Não tem cadastro?</Link>
                        <Button type={'submit'} text={'Logar'} fontColor={'text-xl text-primary'} color={"bg-secundary"} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
