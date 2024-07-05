package com.invictus.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.mapper.EsporteMapper;
import com.invictus.repository.EsporteRepository;
import com.invictus.services.esporte.ValidadorEsporteService;

@Service
public class EsporteService {

	@Autowired
	private List<ValidadorEsporteService> validadores;

	@Autowired
	private EsporteRepository esporteRepository;

	@Autowired
	private EsporteMapper esporteMapper;

	public Esporte cadastrarEsporte(EsporteRequest request) {
		validadores.forEach((v) -> v.validar(request));
		Esporte esporte = esporteMapper.esporteRequestToEsporte(request);
		return esporteRepository.save(esporte);
	}

	public List<Esporte> listarEsportes() {
		return esporteRepository.findAll();
	}

	public Esporte buscarEsportePorId(Long idEsporte) {
		verificadorEsporteExiste(idEsporte);
		return esporteRepository.findById(idEsporte).get();
	}

	public Esporte editarEsporte(Long idEsporte, EsporteRequest request) {
		verificadorEsporteExiste(idEsporte);
		validadores.forEach((v) -> v.validar(request));
		Esporte esporte = esporteMapper.esporteRequestToEsporte(request);
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
