package com.invictus.domain.reserva;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservaResponseDto {

	private String nomeUsuario;
	private String cpfUsuario;
	private Long idReserva;
	private String quadraLoc;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate dataLocacao;
	private BigDecimal valorReserva;
	private String esporteReserva;
	private int horarioInicial;
	private String status;
	
}
