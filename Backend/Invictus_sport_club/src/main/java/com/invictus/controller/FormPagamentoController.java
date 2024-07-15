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

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import com.invictus.services.formPagamento.FormPagamentoService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/form_pagamento")
@CrossOrigin("*")
public class FormPagamentoController {

	@Autowired
	private FormPagamentoService formPagamentoService;
	
	@Transactional
	@PostMapping
	public ResponseEntity cadastrarFormaPagamento(@RequestBody FormPagamentoRequest request,
			UriComponentsBuilder builder) {
		FormPagamento formPagamento = formPagamentoService.cadastrarFormaPagamento(request);
		URI uri = builder.path("/{id}").buildAndExpand(formPagamento.getIdFormPagamento()).toUri();
		return ResponseEntity.created(uri).body(formPagamento);
	}

	@GetMapping
	public ResponseEntity listarFormasPagamento() {
		List<FormPagamento> formPagamentoLista = formPagamentoService.listarFormasPagamento();
		return ResponseEntity.ok(formPagamentoLista);
	}

	@GetMapping("/{id}")
	public ResponseEntity buscarFormaPagamentoPorId(@PathVariable("id") Long idFormPagamento) {
		FormPagamento formPagamento = formPagamentoService.buscarFormaPagamentoPorId(idFormPagamento);
		return ResponseEntity.ok(formPagamento);
	}

	@Transactional
	@PutMapping("/{id}")
	public ResponseEntity editarFormaPagamentoPorId(@RequestBody FormPagamentoRequest formPagamento,
			@PathVariable("id") Long idFormPagamento) {
		FormPagamento form = formPagamentoService.buscarFormaPagamentoPorId(idFormPagamento);
		return ResponseEntity.ok(form);
	}

	@Transactional
	@DeleteMapping("/{id}")
	public ResponseEntity deletarFormaPagamentoPorId(@PathVariable("id") Long idFormPagamento) {
		formPagamentoService.deletarFormaPagamentoPorId(idFormPagamento);
		return ResponseEntity.noContent().build();
	}

}
