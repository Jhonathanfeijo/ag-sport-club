import React, { useState } from "react";
import logoAg from '../../assets/logo/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Label from "../../components/label";
import Button from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/userProvider";

const Register = () => {

    const [registerSucess, setRegisterSucess] = useState(false);

    const { register } = useUser();
    const schema = yup
        .object({
            nome: yup.string().required(),
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
        register(data, setRegisterSucess)
    }

    return (
        <div className="relative w-screen min-h-[100vh] h-screen bg-principal" >
            <div className="h-full w-full flex flex-col items-center justify-center">
                <img src={logoAg} alt="" className="w-[250px] max-w-[70%] my-5 md:my-8 md:w-[300px]" />
                {registerSucess ?
                    <>
                        <h1 className="text-secundary text-2xl">A conta foi criada com sucesso!</h1>
                    </> :
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-[500px] max-w-[85%] lg:w-[500px] flex flex-col md:gap-1 text-secundary mb-3" action="">
                            <Label text={'Nome'} />
                            <Input textColor={'text-primary'} control={control} name={'nome'} type='text' />
                            <Label text={'CPF'} />
                            <Input textColor={'text-primary'} control={control} name={'cpf'} type='text' />
                            <Label text={'Email'} />
                            <Input textColor={'text-primary'} control={control} name={'email'} type='text' />
                            <Label text={'Login'} />
                            <Input textColor={'text-primary'} control={control} name={'login'} type='text' />
                            <Label text={'Senha'} />
                            <Input textColor={'text-primary'} control={control} name={'senha'} type='password' />
                            <Link to={'/login'} className="my-2 text-secundary">Já tem cadastro?</Link>
                            <Button type={'submit'} text={'Cadastrar'} fontColor={'text-xl text-primary'} color={"bg-secundary"} />
                        </form>
                    </>
                }
            </div>


        </div>
    );
}

export default Register;
