package com.invictus.services.reserva.validador;

import java.time.LocalDate;

import org.springframework.stereotype.Component;

import com.invictus.domain.reserva.ReservaRequestDTO;

@Component
public class VerificadorDataReservaNaoEPassado implements ValidadoresReserva {

	@Override
	public void validar(ReservaRequestDTO request) {
		if (request.getDataReserva().isBefore(LocalDate.now()))
			throw new RuntimeException("Data passada");
	}

}
