import { useState } from "react";

const Button = ({ text, color, fontColor, onClick }) => {


    const[navigate,setNavigate] = useState('');

    const handleOnClick = () =>{
        if(onClick === undefined)
            onClick = '';
        setNavigate(onClick());
    }

    return (
        <>
            <button type="button" onClick={handleOnClick} className={`btn w-full ${fontColor} ${color} rounded-md py-2 text-lg`}>{navigate}{text}</button>
        </>
    );
}

export default Button;
