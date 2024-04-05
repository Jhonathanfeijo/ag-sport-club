package com.invictus.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.model.FormPagamento;
import com.invictus.domain.repository.FormPagamentoRepository;

@Service
public class FormPagamentoService {

	@Autowired
	private FormPagamentoRepository formPagamentoRepository;

	public FormPagamento cadastrarFormaPagamento(FormPagamento formPagamento) {
		return formPagamentoRepository.save(formPagamento);
	}

	public List<FormPagamento> listarFormasPagamento() {
		return formPagamentoRepository.findAll();
	}

	public FormPagamento buscarFormaPagamentoPorId(Long idFormPagamento) {
		verificadorFormaPagamento(idFormPagamento);
		return formPagamentoRepository.findById(idFormPagamento).get();
	}

	public FormPagamento editarFormaPagamentoPorId(Long idFormPagamento, FormPagamento formPagamento) {
		verificadorFormaPagamento(idFormPagamento);
		formPagamento.setIdFormPagamento(idFormPagamento);
		return formPagamentoRepository.save(formPagamento);
	}

	private void verificadorFormaPagamento(Long idFormPagamento) {
		if (formPagamentoRepository.existsById(idFormPagamento))
			throw new RuntimeException("Forma de pagamento não encontrada");
	}
}
