package com.invictus.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioRegisterDTO {

	private String nome;
	private String email;
	private String cpf;
	private String login;
	private String senha;
	
}
