package com.invictus.domain.usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioAuthResponse {

	private Long idUsuario;
	private String nome;
	private String nivelPermissao;
	private String token;

	public UsuarioAuthResponse(Usuario usuario, String token) {
		this.idUsuario = usuario.getIdUsuario();
		this.nome = usuario.getNome();
		this.nivelPermissao = usuario.getNivelPermissao() == null ? "USER" : usuario.getNivelPermissao();
		this.token = token;
	}
}
