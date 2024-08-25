package com.invictus.mapper;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraRequest;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-23T20:30:34-0400",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Arch Linux)"
)
@Component
public class TipoQuadraMapperImpl implements TipoQuadraMapper {

    @Override
    public TipoQuadra tipoQuadraRequestToTipoQuadra(TipoQuadraRequest request) {
        if ( request == null ) {
            return null;
        }

        TipoQuadra tipoQuadra = new TipoQuadra();

        tipoQuadra.setDescricao( request.getDescricao() );

        return tipoQuadra;
    }

    @Override
    public TipoQuadraResponse tipoQuadraToTipoQuadraResponse(TipoQuadra tipoQuadra) {
        if ( tipoQuadra == null ) {
            return null;
        }

        TipoQuadraResponse tipoQuadraResponse = new TipoQuadraResponse();

        tipoQuadraResponse.setDescricao( tipoQuadra.getDescricao() );
        tipoQuadraResponse.setIdTipoQuadra( tipoQuadra.getIdTipoQuadra() );

        return tipoQuadraResponse;
    }
}
