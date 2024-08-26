import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";
import { toast } from "react-toastify";

const ModalAddCourt = ({ setIsModalAddCourtOpen, courtList, setCourtList, setRender }) => {

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
        setSportList(json.data);
      }).catch((error) => {
        console.log(error);
      })
      await api.get("tipo_quadra", headers).then((json) => {
        setTipoQuadraList(json.data)
      }).catch((error) => {
        console.log(error);
      })
      setIsDataLoaded(true)
    }
    fetchData();
  }, [])

  const postCourt = (data) => {
    const user = getUserLocalStorage();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`
    };

    const postData = async () => {
      const toastId = toast.loading("Cadastrando quadra", { isLoading: true })
      await api.post("quadra", data, headers)
        .then((json) => {
          toast.update(toastId, {
            isLoading: false,
            autoClose: 2000,
            render: "A quadra foi cadastrada com sucesso",
            type: "success"
          })
          let courtListAux = [...courtList];
          courtListAux.push(json.data)
          setCourtList(courtListAux)
          setIsModalAddCourtOpen(false)
          setRender((prev) => prev + 1);
        })
        .catch((error) => {
          if (error.response) {
            toast.update(toastId,
              {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 2500,
                style: {
                  fontWeight: "bold"
                }
              }
            )
          }
        })
    }
    postData();
  }

  const { register, handleSubmit } = useForm();

  return (


    <>
      <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
        <div className="bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl w-full max-w-[95%] lg:w-[500px]">
          <h1 className="font-bold text-2xl my-5">Adicionar </h1>
          <form onSubmit={handleSubmit(postCourt)} className="flex flex-col w-full">
            <div className="flex flex-row items-end w-full gap-2">
              <div className="flex flex-col flex-1">
                <label className="font-bold" htmlFor="">Descrição</label>
                <input {...register("locQuadra")} name="locQuadra" id="locQuadra" className="border rounded px-1 py-1 w-full" type="text" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-bold" htmlFor="">Valor/ Hora</label>
                <input {...register("valorHora")} name="valorHora" id="valorHora" className="border rounded px-1 py-1 w-full " type="number" />
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full flex-row items-end gap-2">
                <div className="flex flex-col items-start flex-1 mt-2">
                  <label className="font-bold" htmlFor="">Tipo da quadra</label>
                  <select {...register("idTipoQuadra")} className="border rounded bg-secundary w-full py-1" name="idTipoQuadra" id="idTipoQuadra">
                    <option value={""}>Selecione</option>
                    {tipoQuadraList.map((tipoQuadra, index) => {
                      return <option key={index} value={tipoQuadra.idTipoQuadra}>{tipoQuadra.descricao}</option>
                    })}
                  </select>
                </div>
                <div className="flex flex-col items-start flex-1">
                  <label className="font-bold" htmlFor="">Esporte</label>
                  <select {...register("idEsporte")} className="border rounded bg-secundary w-full py-1" name="idEsporte" id="idEsporte">
                    <option value={""}>Selecione</option>
                    {sportList.map((sport, index) => {
                      return <option key={index} value={sport.idEsporte}>{sport.descricao}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 my-3">
                <label className="font-bold" htmlFor="ativo">Ativo</label>
                <label class="inline-flex items-center cursor-pointer">
                  <input name="ativo" id="ativo" {...register("ativo")} type="checkbox" class="sr-only peer" />
                  <div class="relative w-11 h-6 bg-third/20 rounded-full peer peer-focus: peer-focus: dark:peer-focus:ring-primary dark:bg-third/40 peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:end-[2px] after:bg-secundary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary/90"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-row flex-wrap self-end items-end gap-2 my-5">
              <button type="button" onClick={() => setIsModalAddCourtOpen(false)} className="rounded bg-third/10 text-[#000000] py-1 px-2">Cancelar</button>
              <button type="submit" className=" rounded bg-primary border text-secundary py-1 px-2">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalAddCourt;