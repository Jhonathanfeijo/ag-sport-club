package com.invictus.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invictus.domain.usuario.RegistroUsuarioDTO;
import com.invictus.domain.usuario.Usuario;
import com.invictus.domain.usuario.UsuarioAuth;
import com.invictus.domain.usuario.UsuarioAuthResponse;
import com.invictus.infra.TokenService;
import com.invictus.services.AuthorizationService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

	@Autowired
	private TokenService tokenService;

	@Autowired
	private AuthorizationService authService;

	
	
	@PostMapping("/login")
	public ResponseEntity efetuarLogin(@RequestBody UsuarioAuth usuarioAuth) {

		
		Usuario usuario = authService.efetuarLogin(usuarioAuth.getLogin(), usuarioAuth.getSenha());
		if (usuario == null)
			return ResponseEntity.badRequest().body("Login/Senha inválido");

		String token = tokenService.generateToken(usuario);

		return ResponseEntity.ok(new UsuarioAuthResponse(usuario, token));
	}

	@Transactional
	@PostMapping("/register")
	public ResponseEntity cadastrar(@Valid @RequestBody RegistroUsuarioDTO usuarioRegister) {

		Usuario usuario = authService.cadastrarUsuario(usuarioRegister);
		if (usuario == null)
			return ResponseEntity.badRequest().body("Usuário já cadastrado");

		return ResponseEntity.ok().build();

	}
}
