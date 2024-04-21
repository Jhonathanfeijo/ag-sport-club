package com.invictus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invictus.domain.reserva.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

}
