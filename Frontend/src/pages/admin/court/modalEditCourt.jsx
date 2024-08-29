import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';

const ModalEditCourt = ({
  courtToEdit,
  setCourtToEdit,
  setIsModalEditCourtOpen,
  setCourtList,
  courtList,
  setRender,
}) => {
  const [sportList, setSportList] = useState([]);
  const [tipoQuadraList, setTipoQuadraList] = useState([]);

  const { register, handleSubmit } = useForm();

  const editCourt = data => {
    if (!data.idEsporte) {
      data.idEsporte = courtToEdit.esporte.idEsporte;
    }
    if (!data.idTipoQuadra) {
      data.idTipoQuadra = courtToEdit.tipoQuadra.idTipoQuadra;
    }

    if (
      !data.locQuadra ||
      !data.idEsporte ||
      !data.idTipoQuadra ||
      !data.valor
    ) {
      toast.error('Todas as informações devem ser preenchidas', {
        style: { fontWeight: 'bold' },
        autoClose: 2500,
        isLoading: false,
      });
      return;
    }

    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorizathon: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const toastId = toast.loading('Editando quadra', { isLoading: true });
    const editData = async () => {
      await api
        .put(`quadra/${courtToEdit.idQuadra}`, data, { headers })
        .then(json => {
          let courtListAux = [...courtList];
          courtListAux = courtListAux.filter(
            court => court.idQuadra != json.data.idQuadra,
          );
          courtListAux = [...courtListAux, json.data];
          setCourtList(courtListAux);
          toast.update(toastId, {
            render: 'A quadra foi editada com sucesso',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          });
          setIsModalEditCourtOpen(false);
          setRender(prev => prev + 1);
        })
        .catch(error => {
          if (error.response) {
            toast.update(toastId, {
              render: error.response.data.message,
              type: 'error',
              isLoading: false,
              autoClose: 2500,
              style: { fontWeight: 'bold' },
            });
          }
        });
    };
    editData();
  };

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorizathon: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api
        .get('esporte', headers)
        .then(json => {
          setSportList(json.data);
        })
        .catch(error => {
          console.log(error);
        });
      await api
        .get('tipo_quadra', headers)
        .then(json => {
          setTipoQuadraList(json.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className='fixed bg-third/15 top-0 left-0 w-screen h-screen flex flex-col justify-center md:justify-start items-center'>
      <div className='bg-secundary md:mt-40 px-5 rounded shadow-xl drop-shadow-xl max-w-full w-[480px]'>
        <h1 className='font-bold text-2xl my-4'>Editar Quadra</h1>
        <form
          onSubmit={handleSubmit(editCourt)}
          className='flex flex-col lg:w-[430px]'
        >
          <div className='flex flex-row flex-wrap items-end w-full gap-2'>
            <div className='flex flex-col flex-1'>
              <label className='font-bold' htmlFor='locQuadra'>
                Descrição
              </label>
              <input
                {...register('locQuadra')}
                value={courtToEdit.locQuadra}
                onChange={e =>
                  setCourtToEdit(prev => ({
                    ...prev,
                    locQuadra: e.target.value,
                  }))
                }
                className='border rounded px-1 py-1'
                type='text'
                name='locQuadra'
                id='locQuadra'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-bold' htmlFor='valorHora'>
                Valor / Hora
              </label>
              <input
                {...register('valorHora')}
                value={courtToEdit.valorHora}
                onChange={e =>
                  setCourtToEdit(prev => ({
                    ...prev,
                    valorHora: e.target.value,
                  }))
                }
                className='border rounded px-1 py-1 w-[110px]'
                type='number'
                name='valorHora'
                id='valorHora'
              />
            </div>
          </div>
          <div className='flex flex-row items-end font-bold mt-2 w-full gap-2'>
            <div className='flex-1 flex flex-col'>
              <label htmlFor='idTipoQuadra'>Tipo de quadra</label>
              <select
                {...register('idTipoQuadra')}
                value={courtToEdit.tipoQuadra.idTipoQuadra}
                defaultValue={courtToEdit.tipoQuadra.idTipoQuadra}
                onChange={e =>
                  setCourtToEdit(prev => ({
                    ...prev,
                    tipoQuadra: {
                      ...prev.tipoQuadra,
                      idTipoQuadra: e.target.value,
                    },
                  }))
                }
                className='border rounded py-1 px-1'
                name='idTipoQuadra'
                id='idTipoQuadra'
              >
                {tipoQuadraList.map(tipoQuadra => (
                  <option
                    key={tipoQuadra.idTipoQuadra}
                    value={tipoQuadra.idTipoQuadra}
                  >
                    {tipoQuadra.descricao}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col flex-1'>
              <label htmlFor='idEsporte'>Esporte</label>
              <select
                {...register('idEsporte')}
                value={courtToEdit.esporte.idEsporte}
                defaultValue={courtToEdit.esporte.idEsporte}
                onChange={e =>
                  setCourtToEdit(prev => ({
                    ...prev,
                    esporte: { ...prev.esporte, idEsporte: e.target.value },
                  }))
                }
                className='rounded border p-1'
                name='idEsporte'
                id='idEsporte'
              >
                {sportList.map(esporte => (
                  <option key={esporte.idEsporte} value={esporte.idEsporte}>
                    {esporte.descricao}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex flex-row items-center gap-3 my-3'>
            <label className='font-bold' htmlFor='ativo'>
              Ativo
            </label>
            <label class='inline-flex items-center cursor-pointer'>
              <input
                name='ativo'
                id='ativo'
                {...register('ativo')}
                type='checkbox'
                onChange={() =>
                  setCourtToEdit(prev => {
                    return { ...prev, ativo: !prev.ativo };
                  })
                }
                value={courtToEdit.ativo}
                class='sr-only peer'
                checked={courtToEdit.ativo}
              />
              <div class="relative w-11 h-6 bg-third/20 rounded-full peer peer-focus: peer-focus: dark:peer-focus:ring-primary dark:bg-third/40 peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:end-[2px] after:bg-secundary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary/90"></div>
            </label>
          </div>
          <div className='flex flex-row self-end items-end gap-2 my-6'>
            <button
              type='button'
              onClick={() => setIsModalEditCourtOpen(false)}
              className='bg-secundary border rounded lg:flex-none px-2 py-1 flex-1'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='bg-primary text-secundary lg:flex-none border rounded px-4 py-1 flex-1'
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditCourt;
