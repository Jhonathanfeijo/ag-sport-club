package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.invictus.domain.usuario.RegistroUsuarioDTO;
import com.invictus.domain.usuario.Usuario;
import com.invictus.repository.UsuarioRepository;

@Service
public class AuthorizationService implements UserDetailsService {

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
		if(!existeLogin(login))
			return null;
		UserDetails credenciais = loadUserByUsername(login);
		Usuario usuario = new Usuario();
		usuario.setLogin(credenciais.getUsername());
		usuario.setSenha(credenciais.getPassword());
		return this.passwordEncoder.matches(senha, usuario.getPassword())? usuario : null;
	}
	
	public Usuario cadastrarUsuario(RegistroUsuarioDTO usuarioDto) {
		if(existeLogin(usuarioDto.getLogin()))
				return null;
		String senhaEncriptografada = passwordEncoder.encode(usuarioDto.getSenha());
		usuarioDto.setSenha(senhaEncriptografada);
		Usuario usuario = new Usuario(usuarioDto);
		return usuarioRepository.save(usuario);
	}

}
