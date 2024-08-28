package com.invictus.services.reserva.validador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.reserva.ReservaRequestDTO;
import com.invictus.repository.UsuarioRepository;

@Component
public class VerificadorExisteUsuarioReserva implements ValidadoresReserva {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public void validar(ReservaRequestDTO request) {
		if (!usuarioRepository.existsById(request.getIdUsuario()))
			throw new RuntimeException("Usuário não encontrado no sistema");
	}

}
