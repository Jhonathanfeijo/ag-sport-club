package com.invictus.domain.reserva;

import java.time.LocalDate;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.usuario.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
	@OneToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	@OneToOne
	private Quadra quadra;
	@OneToOne
	@JoinColumn(name = "id_form_pagamento")
	private FormPagamento formPagamento;
	private LocalDate data;
	private int horarioInicial;
	private int horasReservadas;
	private String status;

}
