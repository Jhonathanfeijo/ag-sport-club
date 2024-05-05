package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.quadra.Quadra;
import com.invictus.repository.QuadraRepository;

@Service
public class QuadraService {

	@Autowired
	private QuadraRepository quadraRepository;

	public Quadra obterQuadra(Long idQuadra) {
		Quadra quadra = quadraRepository.findById(idQuadra)
				.orElseThrow(() -> new RuntimeException("Quadra não encontrada"));
		return quadra;

	}
}
