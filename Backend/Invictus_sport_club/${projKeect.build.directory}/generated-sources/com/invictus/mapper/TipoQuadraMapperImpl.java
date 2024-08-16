package com.invictus.mapper;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraRequest;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-16T12:04:10-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.36.0.v20231114-0937, environment: Java 21.0.1 (Oracle Corporation)"
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
