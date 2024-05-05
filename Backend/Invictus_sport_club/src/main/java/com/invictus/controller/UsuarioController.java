package com.invictus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invictus.domain.usuario.Usuario;
import com.invictus.domain.usuario.UsuarioResponse;
import com.invictus.mapper.UsuarioMapper;
import com.invictus.services.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping("/{id}")
	public ResponseEntity obterUsuarioPorId(@PathVariable("id") Long idUsuario) {
		Usuario usuario = usuarioService.obterUsuario(idUsuario);
		return ResponseEntity.ok(UsuarioMapper.INSTANCE.toUsuarioResponse(usuario));
	}

	@GetMapping("/all")
	public ResponseEntity obterTodosUsuarios(@PageableDefault Pageable paginacao) {

		Page<UsuarioResponse> usuarios = usuarioService.obterTodosUsuarios(paginacao)
				.map(UsuarioMapper.INSTANCE::toUsuarioResponse);

		return ResponseEntity.ok(usuarios);
	}

}
