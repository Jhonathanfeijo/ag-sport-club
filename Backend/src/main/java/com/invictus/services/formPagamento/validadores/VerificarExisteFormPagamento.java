package com.invictus.services.formPagamento.validadores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import com.invictus.repository.FormPagamentoRepository;

@Component
public class VerificarExisteFormPagamento implements ValidadorFormPagamentoService {

	@Autowired
	private FormPagamentoRepository formPagamentoRepository;

	@Override
	public void validar(FormPagamentoRequest request) {

		if (formPagamentoRepository.existsByDescricao(request.getDescricao()))
			throw new RuntimeException("Forma de pagamento já foi cadastrada");

	}

}
