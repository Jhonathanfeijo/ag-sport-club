package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import com.invictus.domain.usuario.Usuario;
import com.invictus.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	public Usuario obterUsuario(Long idUsuario) {
		Usuario usuario = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new RuntimeException("Usuário não existe"));
		return usuario;
	}

	public Page<Usuario> obterTodosUsuarios(@PageableDefault Pageable paginacao) {
		return usuarioRepository.findAll(paginacao);
	}
}
