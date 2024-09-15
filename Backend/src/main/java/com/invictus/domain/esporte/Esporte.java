package com.invictus.domain.esporte;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(of = "idEsporte")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SqlResultSetMapping(
		name = "EsportesJogadosMapping",
		classes = @ConstructorResult(
				targetClass = EsportesJogadosResponse.class,
				columns = {
						@ColumnResult(name = "quantidade", type = Long.class),
						@ColumnResult(name = "descricao", type = String.class)
				}
		)
)
public class Esporte {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEsporte;
	private String descricao;
	private boolean ativo;
	
}
