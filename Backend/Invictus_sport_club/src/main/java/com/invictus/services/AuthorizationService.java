package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.invictus.domain.usuario.RegistroUsuarioDTO;
import com.invictus.domain.usuario.Usuario;
import com.invictus.repository.UsuarioRepository;

@Service
public class AuthorizationService implements UserDetailsService, AuthenticationManager {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return usuarioRepository.findByLogin(username);
	}

	public boolean existeLogin(String login) {
		return loadUserByUsername(login) == null ? false : true;
	}

	public Usuario efetuarLogin(String login, String senha) {
		var usuarioSenha = new UsernamePasswordAuthenticationToken(login, senha);

		var auth = this.authenticate(usuarioSenha);
		if (auth == null)
			return null;

		Usuario usuario = usuarioRepository.findUsuarioByLogin(auth.getName());

		return usuario;
	}

	public Usuario cadastrarUsuario(RegistroUsuarioDTO usuarioDto) {
		if (existeLogin(usuarioDto.getLogin()))
			return null;
		
		String senhaEncriptografada = passwordEncoder.encode(usuarioDto.getSenha());
		usuarioDto.setSenha(senhaEncriptografada);
		Usuario usuario = new Usuario(usuarioDto);
		return usuarioRepository.save(usuario);
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		UserDetails usuario = loadUserByUsername(authentication.getName());
		if (usuario == null)
			return null;
		if (!passwordEncoder.matches(authentication.getCredentials().toString(), usuario.getPassword()))
			return null;
		return authentication;
	}
	

}
