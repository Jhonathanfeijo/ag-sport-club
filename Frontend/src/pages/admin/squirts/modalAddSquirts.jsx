const ModalAddSquirt = ({setModalAddSquirtOpen}) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen flex justify-center items-center h-screen bg-third/15">
        <div className="bg-secundary drop-shadow-lg shadow-lg rounded-lg px-2 py-2 pb-8 flex flex-col items-center lg:w-[450px]">
          <h2 className="font-bold text-lg text-center my-2">Cadastrar quadra</h2>
          <form className="flex flex-col lg:w-[400px] gap- px-2">
            <label className="font-bold" htmlFor="">Descrição</label>
            <input className="border rounded px-1 py-1" type="text" />
            <div className="flex w-full flex-row items-end gap-2">
            <div className="flex flex-col items-start flex-1 mt-2">
              <label className="font-bold" htmlFor="">Tipo da quadra</label>
              <select className="border rounded bg-secundary w-full py-1" name="" id=""></select>
            </div>
            <div className="flex flex-col items-start flex-1">
              <label className="font-bold" htmlFor="">Esporte</label>
              <select className="border rounded bg-secundary w-full py-1" name="" id="">
              </select>
            </div>
            </div>
            <div className="flex flex-row flex-wrap items-end gap-2 mt-10">
              <button type="button" onClick = {() => setModalAddSquirtOpen(false)} className="flex-1 rounded bg-secundary border font-bold py-1.5 px-2">Cancelar</button>
              <button className="flex-1 font-bold rounded bg-primary border text-secundary py-1.5 px-2">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalAddSquirt;