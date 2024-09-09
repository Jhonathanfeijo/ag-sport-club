import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { getUserLocalStorage } from '../../utils/userProvider';
import ModalRegisterMyReserv from './modalRegisterMyReserv';
import ModalSeeMoreAboutReserv from './modalSeeMoreAboutReserv';
import formatDate from '../../utils/formatDate/formatDate';

const Reserv = () => {
  const [myReservs, setMyReservs] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState();
  const [isModalRegisterMyReservsOpen, setIsModalRegisterMyReservsOpen] =
    useState(false);
  const [isModalSeeMoreAboutReservOpen, setIsModalSeeMoreAboutReservOpen] =
    useState(false);
  const [reservToSee, setReservToSee] = useState();
  const [myReservsFIlter, setMyReservsFilter] = useState();
  const [render, setRender] = useState(0);
  const [filters, setFilters] = useState({
    data: '',
    quadra: '',
    status: ''
  });
  const [quadras, setQuadras] = useState();

  useEffect(() => {
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api.get(`reserva/byUser/${user.idUser}`, headers).then(json => {
        setQuadras(getAllQuadras(json.data))
        setMyReservs(json.data);
        setMyReservsFilter(json.data)
        setIsDataLoaded(true);
      });
    };
    fetchData();
  }, [render]);

  const handleFilterReservs = (typeFilter, filterValue) => {
    let auxFilter = {
      data: typeFilter === 'data' ? filterValue : filters.data,
      status: typeFilter === 'status' ? filterValue : filters.status,
      quadra: typeFilter === 'quadra' ? filterValue : filters.quadra
    }
    const auxDataFiltered = [...myReservs].filter((reserv) => {
      return ((auxFilter.data === '' ? true : reserv.dataLocacao === formatDate( auxFilter.data)) && (auxFilter.status === '' ? true : auxFilter.status.toUpperCase() === reserv.status.toUpperCase()) && (auxFilter.quadra === '' ? true : auxFilter.quadra.toUpperCase() === reserv.quadraLoc.toUpperCase()));
    })
    setFilters(auxFilter)
    setMyReservsFilter(auxDataFiltered);
  }

  const getAllQuadras = (reservs) => {
    let quadrasSet = new Set();
    reservs.map((reserv) => {
      if (!quadrasSet.has(reserv.quadraLoc))
        quadrasSet.add(reserv.quadraLoc)
    })
    const quadras = [...quadrasSet];
    return quadras;
  }

  return (
    <motion.div
      style={{ width: '100%', height: '100vh' }}
      initial={{ opacity: 0, x: -15 }}
      exit={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='w-full h-screen flex justify-center items-center text-primary'>
        <main className='md:pt-20 w-full md:w-[700px] lg:w-[750px] max-w-full h-full flex flex-col items-center'>
          <h1 className='font-bold text-4xl text-center'>Minhas reservas</h1>
          {isDataLoaded && isDataLoaded === true && myReservs.length > 0 && (
            <>
              <div className="flex flex-row justify-center md:justify-start w-full mt-5 flex-wrap gap-2">
                <div className="flex flex-col">
                  <label className='font-bold' htmlFor="">Data</label>
                  <input
                    value={filters.data}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, data: e.target.value }));
                      handleFilterReservs('data', e.target.value);
                    }}
                    className='rounded p-1 border'
                    type="date"
                  />
                </div>
                <div className="flex flex-col">
                  <label className='font-bold' htmlFor="">Quadra</label>
                  <select
                    value={filters.quadra}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, quadra: e.target.value }));
                      handleFilterReservs('quadra', e.target.value);
                    }}
                    className='rounded border p-1'
                    name=""
                    id=""
                  >
                    {/* Adicione opções de quadra aqui */}
                    <option value="">Todas</option>
                    {quadras.map((quadra, index) => {
                      return <option value={quadra} key={index}>{quadra}</option>
                    })}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className='font-bold' htmlFor="">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => {
                      handleFilterReservs('status', e.target.value);
                    }}
                    className='rounded border p-1'
                    name=""
                    id=""
                  >
                    <option value="">Todos</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
              </div>
              <div className='table-container w-[95%] max-w-[95%] md:max-w-full max-h-[400px] md:w-full mt-4 overflow-auto drop-shadow-xl shadow-lg'>
                <table className='w-full'>
                  <thead className='sticky top-0 left-0'>
                    <tr className='text-secundary text-left'>
                      <th className='bg-primary rounded-bl p-2'>Data</th>
                      <th className='bg-primary p-2'>Horario</th>
                      <th className='bg-primary p-2'>Quadra</th>
                      <th className='max-[800px]:hidden bg-primary p-2'>Valor / Hora</th>
                      <th className='max-[800px]:hidden bg-primary p-2'>Status</th>
                      <th className='bg-primary rounded-br p-2'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {myReservsFIlter.map((myReserv, index) => {
                      return (
                        <tr
                          className={`${index % 2 === 1 ? 'bg-primary/10' : ''
                            } font-bold`}
                          key={index}
                        >
                          <td className='py-2 px-2'>{myReserv.dataLocacao}</td>
                          <td className='py-2 px-2'>{`${myReserv.horarioInicial < 10 ? `0${myReserv.horarioInicial}` : `${myReserv.horarioInicial}`}:00 - ${myReserv.horarioInicial + 1 < 10 ? `0${myReserv.horarioInicial + 1}` : `${myReserv.horarioInicial + 1}`}:00`}</td>
                          <td className='py-2 px-2'>{myReserv.quadraLoc}</td>
                          <td className='py-2 px-2 max-[800px]:hidden'>{`R$ ${parseFloat(
                            myReserv.valorReserva,
                          ).toFixed(2)}`}</td>
                          <td className={`py-2 px-2 max-[800px]:hidden ${myReserv.status === 'CANCELADO' ? "text-danger/70" : ""}`}>
                            {myReserv.status.toUpperCase()}
                          </td>
                          <td className='flex flex-row items py-1 center gap-2 text-secundary font-medium'>
                            <button
                              onClick={() => {
                                setIsModalSeeMoreAboutReservOpen(true);
                                setReservToSee({ ...myReserv });
                              }}
                              className='bg-primary px-2 py-1 rounded'
                            >
                              {' '}
                              Ver mais
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {(isDataLoaded && isDataLoaded === true && myReservs.length) === 0 && (
            <h2 className='text-lg md:text-3xl font-medium mt-10 mb-5'>Não há reservas registradas ainda</h2>
          )}
          <button
            onClick={() => setIsModalRegisterMyReservsOpen(true)}
            className={`w-[95%] ${myReservs.length === 0 ? "md:w-[400px]" : "md:w-full"} text-secundary rounded bg-primary py-2 text-lg my-2`}
          >
            Fazer reserva
          </button>
        </main>
      </div>
      {isModalRegisterMyReservsOpen && (
        <ModalRegisterMyReserv
          setRender={setRender}
          setMyReservs={setMyReservs}
          myReservs={myReservs}
          setIsModalRegisterMyReservsOpen={setIsModalRegisterMyReservsOpen}
        ></ModalRegisterMyReserv>
      )}
      {isModalSeeMoreAboutReservOpen && (
        <ModalSeeMoreAboutReserv
          setRender={setRender}
          setMyReservs={setMyReservs}
          myReservs={myReservs}
          reserv={reservToSee}
          setIsModalSeeMoreAboutReservOpen={setIsModalSeeMoreAboutReservOpen}
        ></ModalSeeMoreAboutReserv>
      )}
    </motion.div>
  );

};

export default Reserv;