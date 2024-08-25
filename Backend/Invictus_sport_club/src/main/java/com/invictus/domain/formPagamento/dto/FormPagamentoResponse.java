package com.invictus.domain.formPagamento.dto;

import lombok.Data;

@Data
public class FormPagamentoResponse {
	private Long idFormPagamento;
	private String descricao;
	private boolean ativo;
}
