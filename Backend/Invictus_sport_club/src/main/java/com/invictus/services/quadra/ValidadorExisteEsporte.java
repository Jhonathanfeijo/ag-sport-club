package com.invictus.services.quadra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.quadra.dto.QuadraRequest;
import com.invictus.repository.EsporteRepository;

@Component
public class ValidadorExisteEsporte implements ValidadorQuadraService {

	@Autowired
	private EsporteRepository esporteRepository;
	
	@Override
	public void validar(QuadraRequest request) {
		if(!esporteRepository.existsById(request.getIdEsporte()))
			throw new RuntimeException("Esporte não encontrado");
		
	}

	
	
}
