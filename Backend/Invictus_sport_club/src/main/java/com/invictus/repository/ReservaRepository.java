package com.invictus.repository;

import java.time.LocalDate;
import java.util.List;

import com.invictus.domain.reserva.ReservaNearResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invictus.domain.reserva.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query(value = "select r.id_reserva, r.id_usuario, r.id_quadra, r.id_form_pagamento, r.data, r.realizacao_reserva, r.horario_inicial, r.esporte_reserva, r.valor_reserva, r.status from reserva r where r.id_usuario = :id_usuario order by  r.data desc", nativeQuery = true)
    List<Reserva> findAllByUsuarioIdUsuario(@Param("id_usuario") Long idUsuario);

    @Query(value =
            "select r.id_reserva," +
                    " r.id_usuario," +
                    " r.id_quadra," +
                    " r.id_form_pagamento," +
                    " r.data," +
                    " r.realizacao_reserva," +
                    " r.horario_inicial," +
                    " r.esporte_reserva," +
                    " r.valor_reserva," +
                    " r.status " +
                    "from reserva r " +
                    "where r.data = :dataReserva r.id_quadra = :idQuadra"
            , nativeQuery = true)
    List<Reserva> findAllByDataReservadaAndIdQuadra(@Param("dataReserva") LocalDate dataReserva, @Param("idQuadra") Long idQuadra);

    @Query(value = "select exists (select 1 from reserva r where r.id_form_pagamento = :id_form_pagamento) as reserva_existe", nativeQuery = true)
    boolean existsByFormPagamento(@Param("id_form_pagamento") Long idFormPagamento);

    @Query(value =
            "select" +
                    " r.id_reserva," +
                    " r.id_usuario," +
                    " r.id_quadra," +
                    " r.id_form_pagamento," +
                    " r.data," +
                    " r.realizacao_reserva," +
                    " r.horario_inicial," +
                    " r.esporte_reserva," +
                    " r.valor_reserva," +
                    " r.status" +
                    " from reserva r" +
                    " where r.data BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'" +
                    " and UPPER(r.status) != 'CANCELADO'" +
                    " and r.id_usuario = :idUsuario" +
                    " order By r.data limit 3;" +
                    "", nativeQuery = true)
    List<Reserva> findAllNotCancelReservsNearByCurrentDateByUsuarioId(@Param("idUsuario") Long idUsuario);

    @Query(value = "select r.id_reserva, r.id_usuario, r.id_quadra, r.id_form_pagamento, r.data, r.realizacao_reserva, r.horario_inicial, r.esporte_reserva, r.valor_reserva, r.status from reserva r order by  r.data desc", nativeQuery = true)
    List<Reserva> findAllOrderByDataReserva();

    @Query(nativeQuery = true, value = "select exists(select 1 from reserva r where r.data = :dataReserva and r.horario_inicial = :horarioInicial) as reserva_existe")
    boolean existsReservaByDataReservaAndHorarioInicial(@Param("dataReserva") LocalDate dataReserva, @Param("horarioInicial") int horarioInicial);

    @Query(nativeQuery = true, value = "select exists(select 1 from reserva r inner join quadra q on q.id_quadra = r.id_quadra where r.data = :dataReserva and r.horario_inicial = :horarioInicial and q.id_quadra = :idQuadra) as reserva_existe")
    boolean existsReservaByDataReservaAndHorarioInicialAndIdQuadra(@Param("dataReserva") LocalDate dataReserva, @Param("horarioInicial") int horarioInicial, @Param("idQuadra") Long idQuadra);

    @Modifying
    @Query(value = "update table reserva set status = 'CANCELADO' where upper(status) = 'pendente' and data < current_date ", nativeQuery = true)
    void cancelarReservasPendentesPassado();

    @Modifying
    @Query(value = "update table reserva set status = 'CANCELADO' where upper(status) = 'pendente' and data < current_date and id_usuario = :idUsuario ", nativeQuery = true)
    void cancelarReservasPendentesPassadoPorUsuario(@Param("idUsuario") Long idUsuario);

    @Query(nativeQuery = true, value = "select exists(select 1 from reserva r inner join quadra q on q.id_quadra = r.id_quadra where r.id_quadra = :idQuadra) as existe_reserva")
    boolean existsByQuadraId(@Param("idQuadra") Long idQuadra);
}
