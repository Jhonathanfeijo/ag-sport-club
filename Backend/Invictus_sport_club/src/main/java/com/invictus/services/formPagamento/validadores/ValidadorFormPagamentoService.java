package com.invictus.services.formPagamento.validadores;

import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;

public interface ValidadorFormPagamentoService {

	public void validar(FormPagamentoRequest request);
	
}
