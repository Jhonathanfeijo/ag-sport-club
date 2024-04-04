import { Controller } from 'react-hook-form'
const Input = ({ type, control, name, defaultValue, errorMessage, ...rest }) => {


    return (
        <>
            <Controller name={name}
                control={control}
                rules={{ required: true }}
                defaultValue={defaultValue || ''}
                render={({ field }) =>
                    <input {...field} {...rest} type={type} className='w-full border-0 rounded p-1 text-md ' />}
            />
        
        </>

    );
}

export default Input;