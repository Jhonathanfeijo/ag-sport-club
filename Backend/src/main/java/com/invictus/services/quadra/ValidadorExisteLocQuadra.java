package com.invictus.services.quadra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.quadra.dto.QuadraRequest;
import com.invictus.repository.QuadraRepository;

@Component
public class ValidadorExisteLocQuadra implements ValidadorQuadraService {

	@Autowired
	private QuadraRepository quadraRepository;

	@Override
	public void validar(QuadraRequest request) {
		if (quadraRepository.existsByLocQuadra(request.getLocQuadra()))
			throw new RuntimeException("Já existe quadra nessa localidade");
	}

}
