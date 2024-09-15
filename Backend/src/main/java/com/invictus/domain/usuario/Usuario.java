package com.invictus.domain.usuario;

import java.util.Collection;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idUsuario")
public class Usuario implements UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Long idUsuario;
	@NotBlank(message = "O nome deve ser preenchido")
	@Column(name = "nome")
	private String nome;
	@NotBlank(message = "O CPF deve ser peenchido")
	@CPF
	@Column(name = "cpf")
	private String cpf;
	@NotBlank(message = "O Login deve ser preenchido")
	@Column(name = "login")
	private String login;
	@Email
	@NotBlank(message = "O email deve ser preenchido")
	@Column(name = "email")
	private String email;
	@Column(name = "senha")
	private String senha;
	private String nivelPermissao;

	public Usuario(RegistroUsuarioDTO usuario) {
		this.idUsuario = null;
		this.nome = usuario.getNome();
		this.cpf = usuario.getCpf();
		this.login = usuario.getLogin();
		this.senha = usuario.getSenha();
		this.email = usuario.getEmail();
		this.nivelPermissao = "USER";
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return nivelPermissao.toUpperCase().equals("ADMIN")
				? List.of(new SimpleGrantedAuthority("USER_ROLE"), new SimpleGrantedAuthority("ADMIN_ROLE"))
				: List.of(new SimpleGrantedAuthority("USER_ROLE"));
	}

	@Override
	public String getPassword() {
		return this.senha;
	}

	@Override
	public String getUsername() {
		return this.login;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
