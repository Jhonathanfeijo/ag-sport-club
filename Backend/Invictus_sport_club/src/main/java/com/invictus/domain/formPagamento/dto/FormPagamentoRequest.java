package com.invictus.domain.formPagamento.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FormPagamentoRequest {

	@NotBlank(message = "A descricao não pode ser vazia")
	private String descricao;
	private boolean ativo;
}
