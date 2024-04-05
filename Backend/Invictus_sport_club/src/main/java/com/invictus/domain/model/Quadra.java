package com.invictus.domain.model;

import java.math.BigDecimal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_tipo_quadra")
	private TipoQuadra tipoQuadra;
	@ManyToOne
	@JoinColumn(name = "id_esporte")
	private Esporte esporte;
	@Column(name = "loc_quadra")
	private String locQuadra;
	@Column(name = "valor_hora")
	private BigDecimal valorHora;
	
}
