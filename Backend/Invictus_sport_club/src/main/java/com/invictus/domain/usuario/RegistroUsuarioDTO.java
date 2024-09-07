package com.invictus.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistroUsuarioDTO {
	@NotBlank
	private String nome;
	@NotBlank
	@Email(message = "Formato de email inválido")
	private String email;
	@CPF(message = "CPF inválido")
	private String cpf;
	@NotBlank
	private String login;
	@NotBlank
	private String senha;
}
