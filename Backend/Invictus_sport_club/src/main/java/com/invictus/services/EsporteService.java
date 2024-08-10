package com.invictus.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.mapper.EsporteMapper;
import com.invictus.repository.EsporteRepository;
import com.invictus.repository.QuadraRepository;
import com.invictus.services.esporte.ValidadorEsporteService;

@Service
public class EsporteService {

	@Autowired
	private List<ValidadorEsporteService> validadores;

	@Autowired
	private EsporteRepository esporteRepository;

	@Autowired
	private EsporteMapper esporteMapper;

	@Autowired
	private QuadraRepository quadraRepository;

	public Esporte cadastrarEsporte(EsporteRequest request) {
		validadores.forEach((v) -> v.validar(request));
		Esporte esporte = esporteMapper.esporteRequestToEsporte(request);
		return esporteRepository.saveEsporte(esporte.getDescricao(), esporte.isAtivo());
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

		Esporte esporte = esporteMapper.esporteRequestToEsporte(request);
		esporte.setIdEsporte(idEsporte);
		return esporteRepository.save(esporte);
	}

	public void deletarEsporte(Long idEsporte) {
		verificadorEsporteExiste(idEsporte);
		if (quadraRepository.existsByEsporteId(idEsporte))
			throw new RuntimeException("Não é possível excluir esse exporte pois há quadras vinculadas a ele");
		esporteRepository.deleteById(idEsporte);
	}

	public void verificadorEsporteExiste(Long idEsporte) {
		if (!esporteRepository.existsById(idEsporte))
			throw new RuntimeException("Esporte não existe");
	}

	public List<Esporte> buscarEsportesAtivos() {
		return esporteRepository.findAllByAtivoOrderByDescricao();
	}

}
