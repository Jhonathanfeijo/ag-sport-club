package com.invictus.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.model.TipoQuadra;
import com.invictus.domain.repository.TipoQuadraRepository;

@Service
public class TipoQuadraService {

	@Autowired
	private TipoQuadraRepository tipoQuadraRepository;

	public TipoQuadra cadastrarTipoQuadra(TipoQuadra tipoQuadra) {
		return tipoQuadraRepository.save(tipoQuadra);
	}

	public List<TipoQuadra> listarTiposQuadra() {
		return tipoQuadraRepository.findAll();
	}

	public TipoQuadra buscarTipoQuadraPorId(Long idTipoQuadra) {
		verificadorTipoQuadraExiste(idTipoQuadra);
		return tipoQuadraRepository.findById(idTipoQuadra).get();
	}

	public TipoQuadra editarTipoQuadra(Long idTipoQuadra, TipoQuadra tipoQuadra) {
		verificadorTipoQuadraExiste(idTipoQuadra);
		tipoQuadra.setIdTipoQuadra(idTipoQuadra);
		return tipoQuadraRepository.save(tipoQuadra);
	}

	public void deletarTipoQuadraPorId(Long idTipoQuadra) {
		verificadorTipoQuadraExiste(idTipoQuadra);
		tipoQuadraRepository.deleteById(idTipoQuadra);
	}

	private void verificadorTipoQuadraExiste(Long idTipoQuadra) {
		if (!tipoQuadraRepository.existsById(idTipoQuadra))
			throw new RuntimeException("Tipo de quadra não existe");
	}
}
