package com.invictus.mapper;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-05T13:15:56-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.36.0.v20231114-0937, environment: Java 21.0.1 (Oracle Corporation)"
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

        return formPagamento;
    }
}
