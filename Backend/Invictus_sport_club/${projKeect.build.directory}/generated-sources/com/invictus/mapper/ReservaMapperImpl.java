package com.invictus.mapper;

import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.reserva.Reserva;
import com.invictus.domain.reserva.ReservaResponseDto;
import com.invictus.domain.usuario.Usuario;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-23T19:35:51-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.37.0.v20240215-1558, environment: Java 20 (Oracle Corporation)"
)
@Component
public class ReservaMapperImpl implements ReservaMapper {

    @Override
    public ReservaResponseDto reservaToReservaResponseDto(Reserva reserva) {
        if ( reserva == null ) {
            return null;
        }

        String nomeUsuario = null;
        String cpfUsuario = null;
        String quadraLoc = null;
        LocalDate dataLocacao = null;
        int horarioInicial = 0;
        String esporteReserva = null;
        Long idReserva = null;
        LocalDateTime realizacaoReserva = null;
        String status = null;
        BigDecimal valorReserva = null;

        nomeUsuario = reservaUsuarioNome( reserva );
        cpfUsuario = reservaUsuarioCpf( reserva );
        quadraLoc = reservaQuadraLocQuadra( reserva );
        dataLocacao = reserva.getData();
        horarioInicial = reserva.getHorarioInicial();
        esporteReserva = reserva.getEsporteReserva();
        idReserva = reserva.getIdReserva();
        realizacaoReserva = reserva.getRealizacaoReserva();
        status = reserva.getStatus();
        valorReserva = reserva.getValorReserva();

        ReservaResponseDto reservaResponseDto = new ReservaResponseDto( nomeUsuario, cpfUsuario, idReserva, quadraLoc, dataLocacao, realizacaoReserva, valorReserva, esporteReserva, horarioInicial, status );

        return reservaResponseDto;
    }

    private String reservaUsuarioNome(Reserva reserva) {
        if ( reserva == null ) {
            return null;
        }
        Usuario usuario = reserva.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        String nome = usuario.getNome();
        if ( nome == null ) {
            return null;
        }
        return nome;
    }

    private String reservaUsuarioCpf(Reserva reserva) {
        if ( reserva == null ) {
            return null;
        }
        Usuario usuario = reserva.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        String cpf = usuario.getCpf();
        if ( cpf == null ) {
            return null;
        }
        return cpf;
    }

    private String reservaQuadraLocQuadra(Reserva reserva) {
        if ( reserva == null ) {
            return null;
        }
        Quadra quadra = reserva.getQuadra();
        if ( quadra == null ) {
            return null;
        }
        String locQuadra = quadra.getLocQuadra();
        if ( locQuadra == null ) {
            return null;
        }
        return locQuadra;
    }
}
