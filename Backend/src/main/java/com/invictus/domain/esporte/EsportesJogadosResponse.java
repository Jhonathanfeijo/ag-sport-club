package com.invictus.domain.esporte;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EsportesJogadosResponse {
    private Long quantidade;
    private String descricao;
}
