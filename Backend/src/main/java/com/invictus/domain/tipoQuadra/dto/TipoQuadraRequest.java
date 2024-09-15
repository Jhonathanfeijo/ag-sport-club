package com.invictus.domain.tipoQuadra.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TipoQuadraRequest {
	@NotBlank(message = "A descrição não pode ser vazia")
	public String descricao;
	
}
