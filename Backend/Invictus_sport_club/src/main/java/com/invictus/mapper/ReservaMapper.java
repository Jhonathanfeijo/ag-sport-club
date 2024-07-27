package com.invictus.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

import com.invictus.domain.reserva.Reserva;
import com.invictus.domain.reserva.ReservaResponseDto;

@Mapper(componentModel = "Spring")
public interface ReservaMapper {

	ReservaMapper INSTANCE = Mappers.getMapper(ReservaMapper.class);
	@Mapping(source = "reserva.usuario.nome", target = "nomeUsuario")
	@Mapping(source = "reserva.usuario.cpf", target = "cpfUsuario")
	@Mapping(source = "reserva.quadra.locQuadra", target = "quadraLoc")
	@Mapping(source = "reserva.data", target = "dataLocacao")
	@Mapping(source = "reserva.horarioInicial", target = "horarioInicial")
	@Mapping(source = "reserva.quadra.tipoQuadra.descricao", target = "tipoQuadra")
	public ReservaResponseDto reservaToReservaResponseDto(Reserva reserva);
	
	
}
