package com.invictus.domain.quadra;

import java.math.BigDecimal;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.EsportesJogadosResponse;
import com.invictus.domain.tipoQuadra.TipoQuadra;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idQuadra")
public class Quadra {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idQuadra;
	@ManyToOne
	@JoinColumn(name = "id_tipo_quadra")
	private TipoQuadra tipoQuadra;
	@ManyToOne
	@JoinColumn(name = "id_esporte")
	private Esporte esporte;
	@Column(name = "loc_quadra")
	private String locQuadra;
	@Column(name = "valor_hora")
	private BigDecimal valorHora;
	private boolean ativo;

}
