package com.invictus.domain.esporte.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EsporteRequest {
	@NotBlank(message = "A descrição não pode ser vazia")
	private String descricao;
	private boolean ativo;
}
