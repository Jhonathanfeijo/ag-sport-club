package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;

@Mapper(componentModel = "Spring")
public interface FormPagamentoMapper {

	@Mapping(target = "idFormPagamento", ignore = true)
	public FormPagamento FormPagamentoRequestToFormPagamento(FormPagamentoRequest request);
	
}
