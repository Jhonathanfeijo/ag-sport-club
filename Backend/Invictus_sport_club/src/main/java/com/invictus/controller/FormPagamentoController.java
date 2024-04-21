package com.invictus.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.services.FormPagamentoService;

@RestController
@RequestMapping("/formpagamento")
public class FormPagamentoController {

	@Autowired
	private FormPagamentoService formPagamentoService;

	@PostMapping
	public ResponseEntity cadastrarFormaPagamento(@RequestBody FormPagamento formPagamento,
			UriComponentsBuilder builder) {
		formPagamento = formPagamentoService.cadastrarFormaPagamento(formPagamento);
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

	@PutMapping("/{id}")
	public ResponseEntity editarFormaPagamentoPorId(@RequestBody FormPagamento formPagamento,
			@PathVariable("/{id}") Long idFormPagamento) {
		formPagamento = formPagamentoService.buscarFormaPagamentoPorId(idFormPagamento);
		return ResponseEntity.ok(formPagamento);
	}

}
