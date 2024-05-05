package com.invictus.mapper;

import com.invictus.domain.usuario.Usuario;
import com.invictus.domain.usuario.UsuarioResponse;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-05T01:26:19-0400",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.37.0.v20240215-1558, environment: Java 20 (Oracle Corporation)"
)
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioResponse toUsuarioResponse(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioResponse usuarioResponse = new UsuarioResponse();

        usuarioResponse.setCpf( usuario.getCpf() );
        usuarioResponse.setEmail( usuario.getEmail() );
        usuarioResponse.setIdUsuario( usuario.getIdUsuario() );
        usuarioResponse.setLogin( usuario.getLogin() );
        usuarioResponse.setNome( usuario.getNome() );

        return usuarioResponse;
    }
}
