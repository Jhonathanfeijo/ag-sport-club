package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invictus.domain.reserva.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

	List<Reserva> findAllByUsuarioIdUsuario(Long idUsuario);

}
