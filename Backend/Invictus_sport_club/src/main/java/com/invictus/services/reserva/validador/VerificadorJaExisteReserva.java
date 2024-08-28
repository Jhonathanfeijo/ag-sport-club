package com.invictus.services.reserva.validador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.reserva.ReservaRequestDTO;
import com.invictus.repository.ReservaRepository;

@Component
public class VerificadorJaExisteReserva implements ValidadoresReserva {

	@Autowired
	private ReservaRepository reservaRepository;
	
	@Override
	public void validar(ReservaRequestDTO request) {
		if(reservaRepository.existsReservaByDataReservaAndHorarioInicial(request.getDataReserva(), request.getHorarioInicial()))
			throw new RuntimeException("Já existe uma reserva para esse horario");
	}

}
