package com.invictus.mapper;

import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.reserva.Reserva;
import com.invictus.domain.reserva.ReservaResponseDto;
import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.domain.usuario.Usuario;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-13T12:42:11-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.36.0.v20231114-0937, environment: Java 21.0.1 (Oracle Corporation)"
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
        String tipoQuadra = null;
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
        tipoQuadra = reservaQuadraTipoQuadraDescricao( reserva );
        esporteReserva = reserva.getEsporteReserva();
        idReserva = reserva.getIdReserva();
        realizacaoReserva = reserva.getRealizacaoReserva();
        status = reserva.getStatus();
        valorReserva = reserva.getValorReserva();

        ReservaResponseDto reservaResponseDto = new ReservaResponseDto( nomeUsuario, cpfUsuario, idReserva, quadraLoc, dataLocacao, realizacaoReserva, valorReserva, esporteReserva, horarioInicial, status, tipoQuadra );

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

    private String reservaQuadraTipoQuadraDescricao(Reserva reserva) {
        if ( reserva == null ) {
            return null;
        }
        Quadra quadra = reserva.getQuadra();
        if ( quadra == null ) {
            return null;
        }
        TipoQuadra tipoQuadra = quadra.getTipoQuadra();
        if ( tipoQuadra == null ) {
            return null;
        }
        String descricao = tipoQuadra.getDescricao();
        if ( descricao == null ) {
            return null;
        }
        return descricao;
    }
}
