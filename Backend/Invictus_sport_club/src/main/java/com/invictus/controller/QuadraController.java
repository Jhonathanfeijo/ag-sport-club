package com.invictus.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.invictus.domain.model.Quadra;
import com.invictus.domain.repository.QuadraRepository;

@RestController
@RequestMapping("/quadra")
public class QuadraController {

	@Autowired
	private QuadraRepository quadraRepository;

	public ResponseEntity cadastrarQuadra(@RequestBody Quadra quadra, UriComponentsBuilder builder) {
		quadra = quadraRepository.save(quadra);
		URI uri = builder.path("/quadra/{id}").buildAndExpand(quadra.getIdQuadra()).toUri();
		return ResponseEntity.created(uri).body(quadra);
	}

	public ResponseEntity obterQuadras(Pageable paginacao) {
		Page<Quadra> quadras = quadraRepository.findAll(paginacao);
		return ResponseEntity.ok(quadras);
	}

}
