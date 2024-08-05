package com.invictus.domain.esporte;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(of = "idEsporte")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Esporte {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEsporte;
	private String descricao;
	private boolean ativo;
	
}
