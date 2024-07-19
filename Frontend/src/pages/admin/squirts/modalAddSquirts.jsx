import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalAddSquirt = ({ setModalAddSquirtOpen }) => {

  const [sportList, setSportList] = useState([]);
  const [tipoQuadraList, setTipoQuadraList] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      "Content-Type": "application/json",
      Authorizathon: `Bearer ${user.token.replace('"', '').replace('"', '')}`
    }

    const fetchData = async () => {
      await api.get("esporte", headers).then((json) => {
        console.log(json)
        setSportList(json.data)
      }).catch((error) => {
        console.log(error);
      })
      await api.get("tipo_quadra", headers).then((json) => {
        console.log(json)
        setTipoQuadraList(json.data)
      }).catch((error) => {
        console.log(error);
      })
      setIsDataLoaded(true)
    }
    fetchData();
  }, [])

  const postSquirt = () =>{
    const user = getUserLocalStorage();
    const headers = {
      "Content-Type":"application/json",
      Authorization:`Bearer ${user.token.replace('"',"").replace('"',"")}`
    };

    const postData = async(data) =>{
      await api.post("quadra", data, headers)
      .then((json) =>{
        console.log(json.data)
      })
      .catch((error) =>{
        console.log(error)
      })
    }
    postData();
  }

  const { register, handleSubmit } = useForm();

  return (


    <>
      <div className="fixed top-0 left-0 w-screen flex justify-center items-center h-screen bg-third/15">
        <div className="bg-secundary drop-shadow-lg shadow-lg rounded-lg px-2 py-2 pb-8 flex flex-col items-center lg:w-[450px]">
          <h2 className="font-bold text-lg text-center my-2">Cadastrar quadra</h2>
          <form onSubmit={handleSubmit(postSquirt)} className="flex flex-col lg:w-[400px] gap- px-2">
            <label className="font-bold" htmlFor="">Descrição</label>
            <input {...register("locQuadra")} name="locQuadra" id="locQuadra" className="border rounded px-1 py-1" type="text" />
            <div className="flex w-full flex-row items-end gap-2">
              <div className="flex flex-col items-start flex-1 mt-2">
                <label className="font-bold" htmlFor="">Tipo da quadra</label>
                <select {...register("idTipoQuadra")} className="border rounded bg-secundary w-full py-1" name="idTipoQuadra" id="idTipoQuadra">
                  {tipoQuadraList.map((tipoQuadra, index) => {
                    return <option key={index} value={tipoQuadra.idTipoQuadra}>{tipoQuadra.descricao}</option>
                  })}
                </select>
              </div>
              <div className="flex flex-col items-start flex-1">
                <label className="font-bold" htmlFor="">Esporte</label>
                <select {...register("idEsporte")} className="border rounded bg-secundary w-full py-1" name="idEsporte" id="idEsporte">
                  {sportList.map((sport, index) => {
                    return <option key={index} value={sport.idEsporte}>{sport.descricao}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="flex flex-row flex-wrap items-end gap-2 mt-8">
              <button type="button" onClick={() => setModalAddSquirtOpen(false)} className="flex-1 rounded bg-secundary border font-bold py-1.5 px-2">Cancelar</button>
              <button type="submit" className="flex-1 font-bold rounded bg-primary border text-secundary py-1.5 px-2">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalAddSquirt;