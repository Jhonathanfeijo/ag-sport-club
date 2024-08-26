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

import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.quadra.dto.QuadraRequest;
import com.invictus.services.quadra.QuadraService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/quadra")
@CrossOrigin("*")
public class QuadraController {

	@Autowired
	private QuadraService quadraService;

	@Transactional
	@PostMapping
	public ResponseEntity cadastrarQuadra(@RequestBody QuadraRequest request, UriComponentsBuilder builder) {
		Quadra quadra = quadraService.registrarQuadra(request);
		URI uri = builder.path("/quadra/{id}").buildAndExpand(quadra.getIdQuadra()).toUri();
		return ResponseEntity.created(uri).body(quadra);
	}

	@GetMapping
	public ResponseEntity obterQuadras() {
		List<Quadra> quadras = quadraService.obterQuadras();
		return ResponseEntity.ok(quadras);
	}
	@GetMapping("/active")
	public ResponseEntity obterQuadrasAtivas() {
		List<Quadra> quadras = quadraService.obterQuadrasAtivas();
		return ResponseEntity.ok(quadras);
	}

	@GetMapping("/bySport/{id}")
	public ResponseEntity obterQuadrasPorIdEsporte(@PathVariable("id") Long idEsporte) {
		List<Quadra> quadras = quadraService.obterQuadrasPorIdEsporte(idEsporte);
		return ResponseEntity.ok(quadras);
	}

	@GetMapping("/{id}")
	public ResponseEntity obterQuadraPorId(@PathVariable("id") Long idQuadra) {
		Quadra quadra = quadraService.obterQuadraPorId(idQuadra);
		return ResponseEntity.ok(quadra);
	}

	@Transactional
	@PutMapping("/{id}")
	public ResponseEntity editarQuadraPorId(@PathVariable("id") Long idQuadra,
			@RequestBody QuadraRequest quadraRequest) {
		Quadra quadra = quadraService.editarQuadraPorId(idQuadra, quadraRequest);
		return ResponseEntity.ok(quadra);
	}


	
	@Transactional
	@DeleteMapping("/{id}")
	public ResponseEntity deleteById(@PathVariable("id") Long idQuadra) {
		quadraService.deletarQuadraPorId(idQuadra);
		return ResponseEntity.noContent().build();
	}
	@GetMapping("/byUser/{id}/recent")
	public ResponseEntity obterQuadrasReservadasRecentemente(@PathVariable("id") Long idUsuario){
		List<String> quadras = quadraService.obterUltimasQuadrasReservadas(idUsuario);
		return ResponseEntity.ok(quadras);
	}

	@GetMapping("/all/available")
	public ResponseEntity obterQuadrasDisponiveisParaLocacao(){
		List<Quadra> quadras = quadraService.obterQuadrasDisponiveisParaLocacao();
		return ResponseEntity.ok(quadras);
	}

}
