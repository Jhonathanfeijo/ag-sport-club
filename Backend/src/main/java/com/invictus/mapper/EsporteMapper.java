package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.esporte.dto.EsporteRequest;
import com.invictus.domain.esporte.dto.EsporteResponse;

@Mapper(componentModel = "Spring")
@Component
public interface EsporteMapper {

	EsporteMapper INSTANCE = Mappers.getMapper(EsporteMapper.class);

	@Mapping(target = "idEsporte", ignore = true)
	public Esporte esporteRequestToEsporte(EsporteRequest request);

	public EsporteResponse esporteToEsporteResponse(Esporte esporte);

}
