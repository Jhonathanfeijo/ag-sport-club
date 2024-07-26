package com.invictus.mapper;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.domain.esporte.dto.EsporteResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-26T12:04:33-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.36.0.v20231114-0937, environment: Java 21.0.1 (Oracle Corporation)"
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

        return esporte;
    }

    @Override
    public EsporteResponse esporteToEsporteResponse(Esporte esporte) {
        if ( esporte == null ) {
            return null;
        }

        EsporteResponse esporteResponse = new EsporteResponse();

        esporteResponse.setDescricao( esporte.getDescricao() );
        esporteResponse.setIdEsporte( esporte.getIdEsporte() );

        return esporteResponse;
    }
}
