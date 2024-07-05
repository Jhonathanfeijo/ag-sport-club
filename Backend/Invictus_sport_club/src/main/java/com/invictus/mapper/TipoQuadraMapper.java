package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraRequest;
import com.invictus.domain.tipoQuadra.dto.TipoQuadraResponse;

@Mapper(componentModel = "Spring")
public interface TipoQuadraMapper {

	@Mapping(target = "idTipoQuadra", ignore = true)
	public TipoQuadra tipoQuadraRequestToTipoQuadra(TipoQuadraRequest request);
	
	
	public TipoQuadraResponse tipoQuadraToTipoQuadraResponse(TipoQuadra tipoQuadra);
	
}
