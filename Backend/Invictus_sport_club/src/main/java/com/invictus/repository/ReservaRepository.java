package com.invictus.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invictus.domain.reserva.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

	@Query(value = "select r.id_reserva, r.id_usuario, r.id_quadra, r.id_form_pagamento, r.data, r.realizacao_reserva, r.horario_inicial, r.esporte_reserva, r.valor_reserva, r.status from reserva r where r.id_usuario = :id_usuario order by r.data", nativeQuery = true)
	List<Reserva> findAllByUsuarioIdUsuario(@Param("id_usuario") Long idUsuario);

	@Query(value = "select r.id_reserva, r.id_usuario, r.id_quadra, r.id_form_pagamento, r.data, r.realizacao_reserva, r.horario_inicial, r.esporte_reserva, r.valor_reserva, r.status from reserva r where r.data = :dataReserva", nativeQuery = true)
	List<Reserva> findAllByDataReservada(LocalDate dataReserva);

	@Query(value = "select exists (select 1 from reserva r where r.id_form_pagamento = :id_form_pagamento) as reserva_existe", nativeQuery = true)
	boolean existsByFormPagamento(@Param("id_form_pagamento") Long idFormPagamento);

	@Query(value = "select r.id_reserva, r.id_usuario, r.id_quadra, r.id_form_pagamento, r.data, r.realizacao_reserva, r.horario_inicial, r.esporte_reserva, r.valor_reserva, r.status from reserva r where r.id_usuario = :idUsuario and r.data BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 7 DAY)", nativeQuery = true)
	List<Reserva> reservasByUsuarioIdUntilAWeak(@Param("idUsuario") Long idUsuario);

}
