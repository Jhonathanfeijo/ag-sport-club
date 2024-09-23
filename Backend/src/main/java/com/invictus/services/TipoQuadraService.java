package com.invictus.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.repository.QuadraRepository;
import com.invictus.repository.TipoQuadraRepository;

@Service
public class TipoQuadraService {

	@Autowired
	private TipoQuadraRepository tipoQuadraRepository;

	@Autowired
	private QuadraRepository quadraRepository;

	public TipoQuadra cadastrarTipoQuadra(TipoQuadra tipoQuadra) {
		return tipoQuadraRepository.save(tipoQuadra);
	}

	public List<TipoQuadra> listarTiposQuadra() {
		return tipoQuadraRepository.findAllOrderByDescricao();
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
		if (quadraRepository.existsByTipoQuadraId(idTipoQuadra))
			throw new RuntimeException("Não é possível excluir pois há quadras vinculadas com esse tipo de quadra");
		tipoQuadraRepository.deleteById(idTipoQuadra);
	}

	private void verificadorTipoQuadraExiste(Long idTipoQuadra) {
		if (!tipoQuadraRepository.existsById(idTipoQuadra))
			throw new RuntimeException("Tipo de quadra não existe");
	}
}
