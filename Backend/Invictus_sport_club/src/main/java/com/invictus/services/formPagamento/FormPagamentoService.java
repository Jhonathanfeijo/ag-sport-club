package com.invictus.services.formPagamento;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import com.invictus.mapper.FormPagamentoMapper;
import com.invictus.repository.FormPagamentoRepository;
import com.invictus.services.formPagamento.validadores.ValidadorFormPagamentoService;

@Service
public class FormPagamentoService {

	@Autowired
	private FormPagamentoRepository formPagamentoRepository;
	
	@Autowired
	private List<ValidadorFormPagamentoService> validadores;
	
	@Autowired
	private FormPagamentoMapper formPagamentoMapper;

	public FormPagamento cadastrarFormaPagamento(FormPagamentoRequest request) {
		
		validadores.forEach((v) -> v.validar(request));
		return formPagamentoRepository.save(null);
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
