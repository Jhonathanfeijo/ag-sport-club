package com.invictus.services.quadra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.quadra.dto.QuadraRequest;
import com.invictus.repository.TipoQuadraRepository;

@Component
public class ValidadorTipoQuadraExiste implements ValidadorQuadraService {

	@Autowired
	private TipoQuadraRepository tipoQuadraRepository;

	@Override
	public void validar(QuadraRequest request) {
		if (!tipoQuadraRepository.existsById(request.getIdTipoQuadra()))
			throw new RuntimeException("Tipo de quadra não encontrado");
	}

}
