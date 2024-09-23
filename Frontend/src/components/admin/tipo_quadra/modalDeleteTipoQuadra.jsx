import { toast } from 'react-toastify';
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';

const ModalDeleteTipoQuadra = ({
  tipoQuadraToDelete,
  setIsModalDeleteTipoQuadraOpen,
  tiposQuadra,
  setTiposQuadra,
  setRender,
}) => {
  const deleteTipoQuadra = tipoQuadraDeleteId => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };
    const fetchData = async () => {
      const toastId = toast.loading('Excluindo tipo de quadra');
      await api
        .delete(`tipo_quadra/${tipoQuadraDeleteId}`, { headers })
        .then(() => {
          toast.update(toastId, {
            render: 'Tipo de quadra deletado com sucesso',
            type: 'success',
            theme: 'colored',
            style: {
              fontWeight: 'bold',
            },
            isLoading: false,
            autoClose: 2000,
          });

          let tiposQuadraAux = [...tiposQuadra];
          tiposQuadraAux = tiposQuadraAux.filter(
            tipoQuadraAux => tipoQuadraAux.idTipoQuadra != tipoQuadraDeleteId,
          );
          setTiposQuadra(tiposQuadraAux);
          setIsModalDeleteTipoQuadraOpen(false);
          setRender(prev => prev + 1);
        })
        .catch(error => {
          toast.update(toastId, {
            render: error.response.data.message,
            theme: 'colored',
            type: 'error',
            isLoading: false,
            autoClose: 2500,
          });
        });
    };
    fetchData();
  };

  return (
    <>
      <div className='w-screen h-screen fixed top-0 left-0 bg-third/10 flex flex-col justify-center md:justify-start items-center'>
        <div className='bg-secundary px-3 w-[400px] md:w-[500px] max-w-[95%] flex flex-col items-start md:mt-40 rounded shadow-lg drop-shadow-lg'>
          <h1 className='font-bold text-lg mt-5'>
            Você tem certeza que deseja apagar esse tipo de quadra?
          </h1>
          <h2 className='font-bold w-full text-center'>{`${tipoQuadraToDelete.descricao.toUpperCase()}`}</h2>
          <div className='self-end flex flex-row gap-2 my-3'>
            <button
              onClick={() => setIsModalDeleteTipoQuadraOpen(false)}
              className='bg-primary text-secundary rounded px-2 py-1 font-medium'
            >
              Cancelar
            </button>
            <button
              onClick={() => deleteTipoQuadra(tipoQuadraToDelete.idTipoQuadra)}
              className='bg-danger/70 text-secundary rounded px-2 py-1 font-medium'
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteTipoQuadra;
