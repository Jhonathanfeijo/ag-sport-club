import { Controller } from 'react-hook-form'
const Input = ({ type, control, name, defaultValue, errorMessage, ...rest }) => {


    return (
        <>
            <Controller name={name}
                control={control}
                rules={{ required: true }}
                defaultValue={defaultValue || ''}
                render={({ field }) =>
                    <input id={name} {...field} {...rest} type={type} className='w-full border rounded p-1 text-md ' />}
            />
        
        </>

    );
}

export default Input;