package com.invictus.domain.usuario;

import lombok.Data;

@Data
public class RequestResetUserPassword {

	private Long idUsuario;
	private String senhaAtual;
	private String senhaNova;

}
