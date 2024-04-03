const Button = ({ text, color, fontColor }) => {

    return (
        <>
            <button  className={`btn w-full ${fontColor} ${color} rounded-md py-1 text-lg`}>{text}</button>
        </>
    );
}

export default Button;