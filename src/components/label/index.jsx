const Label = ({ text, textColor }) => {

    return (
        <>
            <label className={`text-xl ${textColor}`} >{text}</label>
        </>
    );
}

export default Label;
