package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.invictus.domain.esporte.Esporte;
import com.invictus.repository.EsporteRepository;

@Service
public class EsporteService {

	@Autowired
	private EsporteRepository esporteRepository;

	public Esporte cadastrarEsporte(Esporte esporte) {
		return esporteRepository.save(esporte);
	}

	public Page<Esporte> listarEsportes(Pageable paginacao) {
		return esporteRepository.findAll(paginacao);
	}

	public Esporte buscarEsportePorId(Long idEsporte) {
		verificadorEsporteExiste(idEsporte);
		return esporteRepository.findById(idEsporte).get();
	}

	public Esporte editarEsporte(Long idEsporte, Esporte esporte) {
		verificadorEsporteExiste(idEsporte);
		esporte.setIdEsporte(idEsporte);
		return esporteRepository.save(esporte);
	}

	public void deletarEsporte(Long idEsporte) {
		verificadorEsporteExiste(idEsporte);
		esporteRepository.deleteById(idEsporte);
	}

	public void verificadorEsporteExiste(Long idEsporte) {
		if (!esporteRepository.existsById(idEsporte))
			throw new RuntimeException("Esporte não existe");
	}

}
