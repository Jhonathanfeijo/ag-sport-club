package com.invictus.mapper;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-09T16:36:23-0400",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
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
