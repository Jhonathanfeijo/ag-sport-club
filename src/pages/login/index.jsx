import React from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";

const Login = () => {
    const navigate = useNavigate();
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
                navigate('/')
            } else
                alert('Credenciais inválidas');
        } catch (error) {
            alert('Houve um erro de conexão');
        }
    }

    const auth = () => {
        return (<Navigate to={'/'} replace={true} />)
    }

    return (
        <div className="w-screen h-screen flex bg-principal justify-center items-center">
            <div className="w-3/5 h-full flex flex-row items-center justify-center">
                <div className="w-1/2 flex justify-end">
                    <img src={logoAg} alt="" className="mr-10 w-4/" />
                </div>
                <div className="w-1/2 flex items-start">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ml-10 w-2/3" action="">
                        <Label text={'Email'} />
                        <Input control={control} name={'email'} type='text' />
                        <Label text={'Senha'} />
                        <Input control={control} name={'senha'} type='password' />
                        <Link className="my-2 text-secundary">Não tem cadastro?</Link>
                        <Button type={'submit'} text={'Logar'} fontColor={'text-xl text-primary'} color={"bg-secundary"} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
