package com.invictus.domain.reserva;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservaResponseDto {

	private String nomeUsuario;
	private String cpfUsuario;
	private Long idReserva;
	private String quadraLoc;
	private LocalDate dataLocacao;
	private int horarioInicial;
	
}
