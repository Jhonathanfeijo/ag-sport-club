package com.invictus.services.esporte;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.repository.EsporteRepository;

@Component
public class ValidadorEsporteJaExiste implements ValidadorEsporteService {

	@Autowired
	private EsporteRepository esporteRepository;

	@Override
	public void validar(EsporteRequest request) {
		if (esporteRepository.existsByDescricao(request.getDescricao()))
			throw new RuntimeException("Esporte já existe");
	}

}
