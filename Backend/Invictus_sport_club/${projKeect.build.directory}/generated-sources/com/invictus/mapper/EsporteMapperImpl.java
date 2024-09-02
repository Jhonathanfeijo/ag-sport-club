package com.invictus.mapper;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.domain.esporte.dto.EsporteResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-01T22:33:42-0400",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Ubuntu)"
)
@Component
public class EsporteMapperImpl implements EsporteMapper {

    @Override
    public Esporte esporteRequestToEsporte(EsporteRequest request) {
        if ( request == null ) {
            return null;
        }

        Esporte esporte = new Esporte();

        esporte.setDescricao( request.getDescricao() );
        esporte.setAtivo( request.isAtivo() );

        return esporte;
    }

    @Override
    public EsporteResponse esporteToEsporteResponse(Esporte esporte) {
        if ( esporte == null ) {
            return null;
        }

        EsporteResponse esporteResponse = new EsporteResponse();

        esporteResponse.setIdEsporte( esporte.getIdEsporte() );
        esporteResponse.setAtivo( esporte.isAtivo() );
        esporteResponse.setDescricao( esporte.getDescricao() );

        return esporteResponse;
    }
}
