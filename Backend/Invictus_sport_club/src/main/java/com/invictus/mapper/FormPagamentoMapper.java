package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;

@Mapper(componentModel = "Spring")
public interface FormPagamentoMapper {

	FormPagamentoMapper INSTANCE = Mappers.getMapper(FormPagamentoMapper.class);
	
	@Mapping(target = "idFormPagamento", ignore = true)
	public FormPagamento FormPagamentoRequestToFormPagamento(FormPagamentoRequest request);
	
}
