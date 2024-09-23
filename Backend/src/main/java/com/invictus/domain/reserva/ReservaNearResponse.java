package com.invictus.domain.reserva;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservaNearResponse {

    private LocalDate data;
    private int horarioInicial;
    private String descricaoQuadra;
    private String status;


}
