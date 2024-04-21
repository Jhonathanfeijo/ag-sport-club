package com.invictus.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.invictus.domain.esporte.Esporte;
import com.invictus.services.EsporteService;

@RestController
@RequestMapping("/esporte")
public class EsporteController {

	@Autowired
	private EsporteService esporteService;

	@PostMapping
	public ResponseEntity cadastrarEsporte(@RequestBody Esporte esporte, UriComponentsBuilder builder) {
		esporte = esporteService.cadastrarEsporte(esporte);
		URI uri = builder.path("/{id}").buildAndExpand(esporte.getIdEsporte()).toUri();
		return ResponseEntity.created(uri).body(esporte);
	}

	@GetMapping
	public ResponseEntity obterEsportes(Pageable paginacao) {
		Page<Esporte> esportes = esporteService.listarEsportes(paginacao);
		return ResponseEntity.ok(esportes);
	}

	@GetMapping("/{id}")
	public ResponseEntity buscarEsportePorId(@PathVariable("id") Long IdEsporte) {
		Esporte esporte = esporteService.buscarEsportePorId(IdEsporte);
		return ResponseEntity.ok(esporte);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deletarEsportePorId(@PathVariable("id") Long idEsporte) {
		esporteService.deletarEsporte(idEsporte);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity editarEsportePorId(@PathVariable("id") Long idEsporte, @RequestBody Esporte esporte) {
		esporte = esporteService.editarEsporte(idEsporte, esporte);
		return ResponseEntity.ok(esporte);
	}

}
