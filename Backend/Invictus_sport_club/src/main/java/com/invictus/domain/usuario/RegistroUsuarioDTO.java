package com.invictus.domain.usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistroUsuarioDTO {

	private String nome;
	private String email;
	private String cpf;
	private String login;
	private String senha;
}
