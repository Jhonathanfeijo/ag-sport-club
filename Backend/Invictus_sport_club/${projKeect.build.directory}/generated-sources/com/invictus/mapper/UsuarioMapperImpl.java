package com.invictus.mapper;

import com.invictus.domain.usuario.Usuario;
import com.invictus.domain.usuario.UsuarioResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-04T20:10:21-0400",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioResponse toUsuarioResponse(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioResponse usuarioResponse = new UsuarioResponse();

        usuarioResponse.setIdUsuario( usuario.getIdUsuario() );
        usuarioResponse.setNome( usuario.getNome() );
        usuarioResponse.setCpf( usuario.getCpf() );
        usuarioResponse.setEmail( usuario.getEmail() );
        usuarioResponse.setLogin( usuario.getLogin() );

        return usuarioResponse;
    }
}
