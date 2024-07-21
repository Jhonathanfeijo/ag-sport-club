package com.invictus.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.invictus.domain.reserva.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

	List<Reserva> findAllByUsuarioIdUsuario(Long idUsuario);
	
	@Query(value = "select * from reserva r where r.data = :dataReserva", nativeQuery = true)
	List<Reserva> findAllByDataReservada(LocalDate dataReserva);

}
