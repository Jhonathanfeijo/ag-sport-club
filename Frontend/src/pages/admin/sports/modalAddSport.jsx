import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { render } from "react-dom";
import { api } from "../../../../services/api";
import { getUserLocalStorage } from "../../../utils/userProvider";

const ModalAddSport = ({ setIsModalAddSportOpen, sportList, setSportList }) => {

  const { register, handleSubmit } = useForm();

  const postData = (data) => {
    const user = getUserLocalStorage();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token.replace('"', "").replace('"', "")}`,
    };
    const fetchData = async () => {
      const toastId = toast.loading("Salvando esporte");
      await api.post('esporte', data, { headers }).then((json) => {
        toast.update(toastId, {
          render: "Esporte salvo com sucesso",
          type: "success",
          theme: "colored",
          style: {
            fontWeight: "bold",
          },
          isLoading: false,
          autoClose: 2000
        })
        let sportListAux = [...sportList, {
          idEsporte: json.data.idEsporte,
          descricao: json.data.descricao
        }]
        setSportList(sportListAux)
        setIsModalAddSportOpen(false);
      }).catch((error) => {
        toast.update(toastId, {
          render: error.response.data.message,
          theme: "colored",
          type: "error",
          isLoading: false,
          autoClose: 2000
        })
      });
    };
    fetchData();
  }

  return (
    <>
      <div className="fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center">
        <div className="bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl">
          <h1 className="font-bold text-2xl my-5">Adicionar esporte</h1>
          <form onSubmit={handleSubmit(postData)} className="flex flex-col items-start w-max-[90%] md:w-[400px]">
            <label className="font-bold" htmlFor="nameSport">Nome do esporte</label>
            <input {...register("descricao")} className="px-1 border w-full rounded py-1" type="text" name="descricao" id="descricao" />
            <div className=" self-center w-full lg:w-auto lg:self-end lg:self-end flex flex-row flex-wrap my-6 gap-2">
              <button type="button" onClick={() => setIsModalAddSportOpen(false)} className="flex-1 lg:px-3 bg-[#EDEDED] border border-[#EDEDED] text-third font-medium rounded py-1">Cancelar</button>
              <button type="submit" className="flex-1 lg:px-3 bg-primary text-secundary py-1 rounded">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </>);
}

export default ModalAddSport;