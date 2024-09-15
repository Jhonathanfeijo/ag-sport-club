package com.invictus.domain.esporte.dto;

import lombok.Data;

@Data
public class EsporteResponse {
	private Long idEsporte;
	private boolean ativo;
	private String descricao;
	
}
