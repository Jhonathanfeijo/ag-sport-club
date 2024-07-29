const ModalResetPasswordUser = () => {
  return (
    <>
      <div className='h-screen w-screen fixed top-0 left-0 bg-third/15 z-50 flex justify-center items-center'>
        <div className='w-[350px] bg-secundary rounded drop-shadow-lg shadow-lg max-w-[95%] px-4'>
          <h2 className='text-xl font-bold text-center my-6'>Resetar senha</h2>
          <div>
            <form action='font-medium'>
              <div className='flex flex-col'>
                <label className='font-bold' htmlFor=''>
                  Digite a senha atual
                </label>
                <input className='p-1 border rounded' type='password' />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold' htmlFor=''>
                  Digite a senha nova
                </label>
                <input className='p-1 border rounded' type='password' />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold' htmlFor=''>
                  Repita a senha nova
                </label>
                <input className='p-1 border rounded' type='password' />
              </div>
              <div className='w-full flex flex-row items-end gap-2 my-10'>
                <button
                  type='button'
                  className='flex-1 px-2 py-1 font-medium rounded bg-primary text-secundary'
                >
                  Cancelar
                </button>
                <button className='flex-1 px-2 py-1 font-medium rounded bg-primary text-secundary'>
                  Gravar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalResetPasswordUser;
