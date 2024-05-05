package com.invictus.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
=======
import org.springframework.web.bind.annotation.CrossOrigin;
>>>>>>> e0926ccf3e5938f47d81a4f44c8134c2ac08c30c
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.invictus.domain.quadra.Quadra;
import com.invictus.repository.QuadraRepository;

@RestController
@RequestMapping("/quadra")
@CrossOrigin("*")
public class QuadraController {

	@Autowired
	private QuadraRepository quadraRepository;

	@PostMapping
	public ResponseEntity cadastrarQuadra(@RequestBody Quadra quadra, UriComponentsBuilder builder) {
		quadra = quadraRepository.save(quadra);
		URI uri = builder.path("/quadra/{id}").buildAndExpand(quadra.getIdQuadra()).toUri();
		return ResponseEntity.created(uri).body(quadra);
	}

	@GetMapping
	public ResponseEntity obterQuadras(Pageable paginacao) {
		Page<Quadra> quadras = quadraRepository.findAll(paginacao);
		return ResponseEntity.ok(quadras);
	}

}
