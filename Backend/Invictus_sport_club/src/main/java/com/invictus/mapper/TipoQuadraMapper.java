package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraRequest;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraResponse;

@Mapper(componentModel = "Spring")
public interface TipoQuadraMapper {

	TipoQuadraMapper INSTANCE = Mappers.getMapper(TipoQuadraMapper.class);
	
	@Mapping(target = "idTipoQuadra", ignore = true)
	public TipoQuadra tipoQuadraRequestToTipoQuadra(TipoQuadraRequest request);
	
	
	public TipoQuadraResponse tipoQuadraToTipoQuadraResponse(TipoQuadra tipoQuadra);
	
}
