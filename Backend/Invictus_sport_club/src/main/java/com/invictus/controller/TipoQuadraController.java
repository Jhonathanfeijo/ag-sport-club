package com.invictus.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.services.TipoQuadraService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/tipo_quadra")
public class TipoQuadraController {

	@Autowired
	private TipoQuadraService tipoQuadraService;

	@PostMapping
	@Transactional
	public ResponseEntity cadastrarTipoQuadra(@RequestBody TipoQuadra tipoQuadra, UriComponentsBuilder builder) {
		tipoQuadra = tipoQuadraService.cadastrarTipoQuadra(tipoQuadra);
		URI uri = builder.path("/{id}").buildAndExpand(tipoQuadra.getIdTipoQuadra()).toUri();
		return ResponseEntity.created(uri).body(tipoQuadra);
	}

	@GetMapping
	public ResponseEntity listarTipoQuadra() {
		List<TipoQuadra> tipoQuadra = tipoQuadraService.listarTiposQuadra();
		return ResponseEntity.ok(tipoQuadra);
	}

	@GetMapping("/{id}")
	public ResponseEntity obterQuadraPorId(@PathVariable("id") Long idTipoQuadra) {
		TipoQuadra tipoQuadra = tipoQuadraService.buscarTipoQuadraPorId(idTipoQuadra);
		return ResponseEntity.ok(tipoQuadra);
	}

	@Transactional
	@DeleteMapping("/{id}")
	public ResponseEntity deletarQuadraPorId(@PathVariable("id") Long idTipoQuadra) {
		tipoQuadraService.deletarTipoQuadraPorId(idTipoQuadra);
		return ResponseEntity.noContent().build();
	}

	@Transactional
	@PutMapping("/{id}")
	public ResponseEntity editarTipoQuadraPorId(@PathVariable("id") Long idTipoQuadra,
			@RequestBody TipoQuadra tipoQuadra) {
		tipoQuadra = tipoQuadraService.editarTipoQuadra(idTipoQuadra, tipoQuadra);
		return ResponseEntity.ok(tipoQuadra);
	}
}
