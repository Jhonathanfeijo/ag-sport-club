import { useState } from "react";

const Button = ({ type, text, color, fontColor, onClick }) => {


    const [navigate, setNavigate] = useState('');

    const handleOnClick = () => {
        onClick === undefined ? onClick = '' : setNavigate(onClick());
    }

    return (
        <>
            <button type={type} onClick={handleOnClick} className={`btn w-full ${fontColor} ${color} rounded-md py-2 text-lg`}>{navigate}{text}</button>
        </>
    );
}

export default Button;
