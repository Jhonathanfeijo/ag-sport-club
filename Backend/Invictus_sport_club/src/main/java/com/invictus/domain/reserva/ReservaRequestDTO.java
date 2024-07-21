package com.invictus.domain.reserva;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservaRequestDTO {

    private Long idUsuario;
    private Long idQuadra;
    private Long idFormPagamento;
    private LocalDate dataReserva;
    private int horarioInicial;

}
