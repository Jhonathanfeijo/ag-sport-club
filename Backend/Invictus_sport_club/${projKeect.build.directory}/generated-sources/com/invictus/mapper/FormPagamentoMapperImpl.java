package com.invictus.mapper;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-07T11:05:38-0400",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Ubuntu)"
)
@Component
public class FormPagamentoMapperImpl implements FormPagamentoMapper {

    @Override
    public FormPagamento FormPagamentoRequestToFormPagamento(FormPagamentoRequest request) {
        if ( request == null ) {
            return null;
        }

        FormPagamento formPagamento = new FormPagamento();

        formPagamento.setDescricao( request.getDescricao() );
        formPagamento.setAtivo( request.isAtivo() );

        return formPagamento;
    }
}
