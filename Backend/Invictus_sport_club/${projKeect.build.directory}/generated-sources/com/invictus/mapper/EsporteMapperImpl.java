package com.invictus.mapper;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.domain.esporte.dto.EsporteResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-11T18:31:35-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.37.0.v20240215-1558, environment: Java 20 (Oracle Corporation)"
)
@Component
public class EsporteMapperImpl implements EsporteMapper {

    @Override
    public Esporte esporteRequestToEsporte(EsporteRequest request) {
        if ( request == null ) {
            return null;
        }

        Esporte esporte = new Esporte();

        esporte.setAtivo( request.isAtivo() );
        esporte.setDescricao( request.getDescricao() );

        return esporte;
    }

    @Override
    public EsporteResponse esporteToEsporteResponse(Esporte esporte) {
        if ( esporte == null ) {
            return null;
        }

        EsporteResponse esporteResponse = new EsporteResponse();

        esporteResponse.setAtivo( esporte.isAtivo() );
        esporteResponse.setDescricao( esporte.getDescricao() );
        esporteResponse.setIdEsporte( esporte.getIdEsporte() );

        return esporteResponse;
    }
}
