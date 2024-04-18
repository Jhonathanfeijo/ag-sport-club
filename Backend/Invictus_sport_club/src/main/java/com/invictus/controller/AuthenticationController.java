package com.invictus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invictus.domain.infra.TokenService;
import com.invictus.domain.model.Usuario;
import com.invictus.domain.repository.UsuarioRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@PostMapping("/login")
	public ResponseEntity efetuarLogin(@RequestBody UsuarioAuth usuario) {

		var usernamePassword = new UsernamePasswordAuthenticationToken(usuario.getLogin(), usuario.getSenha());
		var auth = authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generateToken((Usuario) auth.getPrincipal());

		return ResponseEntity.ok(token);
	}

	@PostMapping("/register")
	public ResponseEntity cadastrar(@RequestBody UsuarioRegisterDTO usuarioRegister) {

		var senhaCriptografa = passwordEncoder.encode(usuarioRegister.getSenha());
		Usuario usuario = new Usuario(null, usuarioRegister.getPrimeironome(), usuarioRegister.getSobrenome(),
				usuarioRegister.getCpf(), usuarioRegister.getLogin(), usuarioRegister.getEmail(),
				senhaCriptografa);
		usuario = usuarioRepository.save(usuario);

		var usernamePassword = new UsernamePasswordAuthenticationToken(usuario.getLogin(), usuario.getSenha());
		var auth = authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generateToken((Usuario) auth.getPrincipal());

		return ResponseEntity.ok(token);

	}
}
