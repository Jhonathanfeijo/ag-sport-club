package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

import com.invictus.domain.usuario.Usuario;
import com.invictus.domain.usuario.UsuarioResponse;

@Mapper
@Component
public interface UsuarioMapper {

	
	UsuarioMapper INSTANCE = Mappers.getMapper( UsuarioMapper.class );
	
	UsuarioResponse toUsuarioResponse(Usuario usuario);
	
}
