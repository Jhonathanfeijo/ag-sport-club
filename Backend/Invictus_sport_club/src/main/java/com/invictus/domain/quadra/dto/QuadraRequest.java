package com.invictus.domain.quadra.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class QuadraRequest {

	private Long idEsporte;
	private Long idTipoQuadra;
	private String LocQuadra;
	private BigDecimal valorHora;
	
}
