import React from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/userProvider";

const Login = () => {

    const { register } = useUser();
    const schema = yup
        .object({
            primeironome: yup.string().required(),
            sobrenome: yup.string().required(),
            cpf: yup.string().required(),
            email: yup.string().required(),
            login: yup.string().required(),
            senha: yup.string().required(),
        })
        .required()

    const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    const onSubmit = (data) => {
        console.log(data)
        register(data)
    }

    return (
        <div className="min-w-[100vw] min-h-[100vh] bg-principal" >
            <div className="h-full flex flex-col items-center justify-center">
                <img src={logoAg} alt="" className="w-[250px] max-w-[70%] my-3 lg:w-[300px]" />
                <div className="w-[500px] max-w-[85%] flex flex-col items-center lg:w-[600px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-1 text-secundary mb-3" action="">
                        <section className="flex items-end gap-2 w-full">
                            <div className="w-[150px] max-w-[35%]">
                                <Label text={'Primeiro nome'} />
                                <Input textColor={'text-primary'} control={control} name={'primeironome'} type='text' />
                            </div>
                            <div className="flex-1">
                                <Label text={'Sobrenome'} />
                                <Input textColor={'text-primary'} control={control} name={'sobrenome'} type='text' />
                            </div>
                        </section>
                        <div>
                            <Label text={'CPF'} />
                            <Input textColor={'text-primary'} control={control} name={'cpf'} type='text' />
                        </div>
                        <Label text={'Email'} />
                        <Input textColor={'text-primary'} control={control} name={'email'} type='text' />
                        <Label text={'Login'} />
                        <Input textColor={'text-primary'} control={control} name={'login'} type='text' />
                        <Label text={'Senha'} />
                        <Input textColor={'text-primary'} control={control} name={'senha'} type='password' />
                        <Link to={'/login'} className="my-2 text-secundary">Já tem cadastro?</Link>
                        <Button type={'submit'} text={'Cadastrar'} fontColor={'text-xl text-primary'} color={"bg-secundary"} />
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;
