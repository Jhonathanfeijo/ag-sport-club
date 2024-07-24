package com.invictus.domain.reserva;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.usuario.Usuario;

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
@EqualsAndHashCode(of = "idReserva")
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idReserva;
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	@ManyToOne
	private Quadra quadra;
	@ManyToOne
	@JoinColumn(name = "id_form_pagamento")
	private FormPagamento formPagamento;
	private LocalDate data;
	private LocalDateTime realizacaoReserva;
	private int horarioInicial;
	private String esporteReserva;
	private BigDecimal valorReserva;
	private String status;

}
