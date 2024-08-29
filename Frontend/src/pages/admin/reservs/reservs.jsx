import { useEffect } from "react";
import { useState } from "react";
import { api } from '../../../../services/api';
import { getUserLocalStorage } from '../../../utils/userProvider';
import { motion } from "framer-motion";
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import ModalInfoReserv from "./modalInfoReserv";



const Reservs = ({ type }) => {
  const [reservs, setReservs] = useState([]);
  const [statusData, setStatusData] = useState();
  const [reservToSee, setReservToSee] = useState();
  const [isModalToSeeMoreAboutReservOpen, setIsModalToSeeMoreAboutReservOpen] = useState(false);
  const [render, setRender] = useState();

  useEffect(() => {
    setStatusData('loading');
    const user = getUserLocalStorage();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token.replace('"', '').replace('"', '')}`,
    };

    const fetchData = async () => {
      await api
        .get('reserva', headers)
        .then(json => {
          console.log(json)
          setReservs(json.data);
          setStatusData('loaded');
        })
        .catch(error => {
          setStatusData('failed')
        });
    };
    fetchData();
  }, [render]);

  return (
    <>
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, x: -15 }}
        exit={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex flex-col items-center w-full max-w-full'>
          <div className='flex flex-col items-center my-2 w-full'>
            {statusData === "loaded" && (
              <>
                {reservs.length === 0 && (
                  <>
                    <h2 className='text-lg md:text-2xl font-medium mb-3'>
                      Não há reservas cadastradas
                    </h2>
                  </>
                )}
                {reservs.length > 0 && (
                  <>
                    <div className='table-container overflow-auto max-h-[500px] w-full'>
                      <table className='my-1 w-full border-collapse shadow-lg drop-shadow-lg mb-2'>
                        <thead className='sticky'>
                          <tr className='bg-primary sticky text-left'>
                            <th className='pl-2 py-2 sticky rounded-bl text-secundary '>
                              Data
                            </th>
                            <th className='pl-2 py-2 sticky text-secundary '>
                              Horario
                            </th>
                            <th className='pl-2 py-2 sticky text-secundary '>
                              Quadra
                            </th>
                            <th className='pl-2 py-2 sticky text-secundary '>
                              Reservado por
                            </th>
                            <th className='pl-2 py-2 sticky text-secundary '>
                              Status
                            </th>
                            <th className='pl-2 py-2 sticky rounded-br text-secundary '></th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservs.map((reserv, index) => {
                            return (
                              <tr
                                key={index}
                                className={`${index % 2 !== 0 ? 'bg-primary/15' : ''
                                  } font-bold`}
                              >
                                <td className='pl-2 py-2 text-left'>
                                  {reserv.dataLocacao}
                                </td>
                                <td
                                  className={`pl-2 py-2 text-left `}
                                >
                                  {`${reserv.horarioInicial < 10 ? "0" + reserv.horarioInicial : reserv.horarioInicial}:00 - ${reserv.horarioInicial + 1 < 10 ? "0" + (reserv.horarioInicial + 1) : (reserv.horarioInicial + 1)}:00`}
                                </td>
                                <td
                                  className={`pl-2 py-2 text-left `}
                                >
                                  {reserv.quadraLoc}
                                </td>
                                <td
                                  className={`pl-2 py-2 text-left `}
                                >
                                  {capitalizeFirstLetter(reserv.nomeUsuario)}
                                </td>
                                <td
                                  className={`pl-2 py-2 text-left `}
                                >
                                  {capitalizeFirstLetter(reserv.status.toUpperCase())}
                                </td>
                                <td className='flex py-1 flex-row items-center justify-end px-2 gap-2 text-secundary font-normal'>
                                  <button
                                    onClick={() => {
                                      setIsModalToSeeMoreAboutReservOpen(true);
                                      setReservToSee(reserv);
                                    }}
                                    className='font-medium text-lg py-1 px-1 rounded bg-primary text-secundary'
                                  >
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
                {/*
  <button
                onClick={() => setIsModalAddSportOpen(true)}
                className='px-2 py-1.5 w-full bg-primary text-lg lg:text-xl font-medium  mt-2 text-secundary rounded'
              >
                Adicionar usuario
              </button>
              */}

              </>
            )}
            {statusData === 'failed' && (
              <h2 className='text-xl font-bold my-2'>
                Estamos tendo problemas internos.
                <br /> Por favor, tente novamente mais tarde.
              </h2>
            )}
          </div>
        </div>
            {isModalToSeeMoreAboutReservOpen && (
              <ModalInfoReserv reservInfo={reservToSee} setIsModalInfoOpen={setIsModalToSeeMoreAboutReservOpen}></ModalInfoReserv>
            )

            }
      </motion.div>
    </>
  );
};

export default Reservs;
