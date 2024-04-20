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

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PasswordEncoder encoder;

	@PostMapping("/login")
	public ResponseEntity efetuarLogin(@RequestBody UsuarioAuth usuario) {

		var usernamePassword = new UsernamePasswordAuthenticationToken(usuario.getLogin(), usuario.getSenha());

		var auth = this.manager.authenticate(usernamePassword);
		String token = tokenService.generateToken((Usuario) auth.getPrincipal());

		return ResponseEntity.ok(token);
	}

	@Transactional
	@PostMapping("/register")
	public ResponseEntity cadastrar(@RequestBody UsuarioRegisterDTO usuarioRegister) {

		if (usuarioRepository.findByLogin(usuarioRegister.getLogin()) != null)
			return ResponseEntity.badRequest().build();

		var senhaCriptografa = encoder.encode(usuarioRegister.getSenha());
		Usuario usuario = new Usuario(null, usuarioRegister.getNome(), usuarioRegister.getCpf(),
				usuarioRegister.getLogin(), usuarioRegister.getEmail(), senhaCriptografa);
		usuario = usuarioRepository.save(usuario);

		return ResponseEntity.ok().build();

	}
}
