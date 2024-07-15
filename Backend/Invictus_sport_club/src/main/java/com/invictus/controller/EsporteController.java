package com.invictus.controller;

import java.net.URI; 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.domain.esporte.dto.EsporteResponse;
import com.invictus.mapper.EsporteMapper;
import com.invictus.services.EsporteService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/esporte")
@CrossOrigin("*")
public class EsporteController {

	@Autowired
	private EsporteService esporteService;

	@Autowired
	private EsporteMapper esporteMapper;

	@Transactional
	@PostMapping
	public ResponseEntity cadastrarEsporte(@RequestBody EsporteRequest request, UriComponentsBuilder builder) {
		Esporte esporte = esporteService.cadastrarEsporte(request);
		URI uri = builder.path("/{id}").buildAndExpand(esporte.getIdEsporte()).toUri();
		EsporteResponse response = esporteMapper.esporteToEsporteResponse(esporte);
		return ResponseEntity.created(uri).body(response);
	}

	@GetMapping
	public ResponseEntity obterEsportes() {
		List<Esporte> esportes = esporteService.listarEsportes();
		return ResponseEntity.ok(esportes);
	}

	@GetMapping("/{id}")
	public ResponseEntity buscarEsportePorId(@PathVariable("id") Long IdEsporte) {
		Esporte esporte = esporteService.buscarEsportePorId(IdEsporte);
		return ResponseEntity.ok(esporte);
	}

	@Transactional
	@DeleteMapping("/{id}")
	public ResponseEntity deletarEsportePorId(@PathVariable("id") Long idEsporte) {
		System.out.println("aqui");
		esporteService.deletarEsporte(idEsporte);
		return ResponseEntity.noContent().build();
	}

	@Transactional
	@PutMapping("/{id}")
	public ResponseEntity editarEsportePorId(@PathVariable("id") Long idEsporte, @RequestBody EsporteRequest request) {
		Esporte esporte = esporteService.editarEsporte(idEsporte, request);
		EsporteResponse response = esporteMapper.esporteToEsporteResponse(esporte);
		return ResponseEntity.ok(esporte);
	}

}
