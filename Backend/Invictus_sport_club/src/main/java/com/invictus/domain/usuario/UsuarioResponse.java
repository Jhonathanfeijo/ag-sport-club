package com.invictus.domain.usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponse {

	private Long idUsuario;
	private String nome;
	private String cpf;
	private String email;
	private String login;

}
