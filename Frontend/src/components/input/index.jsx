import { Controller } from 'react-hook-form'
const Input = ({ type, control, name, defaultValue, errorMessage, color, textColor, ...rest }) => {


    return (
        <>
            <Controller name={name}
                control={control}
                rules={{ required: true }}
                defaultValue={defaultValue || ''}
                render={({ field }) =>
                    <input id={name} {...field} {...rest} type={type} className={`w-full border rounded p-1 text-md ${color} ${textColor}`} />}
            />

        </>

    );
}

export default Input;