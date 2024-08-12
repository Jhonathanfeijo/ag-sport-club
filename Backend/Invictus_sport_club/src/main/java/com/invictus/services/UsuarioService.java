package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.invictus.domain.usuario.RequestResetUserPassword;
import com.invictus.domain.usuario.Usuario;
import com.invictus.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PasswordEncoder encoder;

	public Usuario obterUsuario(Long idUsuario) {
		Usuario usuario = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new RuntimeException("Usuário não existe"));
		return usuario;
	}

	public Page<Usuario> obterTodosUsuarios(@PageableDefault Pageable paginacao) {
		return usuarioRepository.findAll(paginacao);
	}

	public void resetPassword(RequestResetUserPassword request) {

		if (!usuarioRepository.existsById(request.getIdUsuario()))
			throw new RuntimeException("Usuário não encontrado");

		Usuario usuario = usuarioRepository.getReferenceById(request.getIdUsuario());
		if (!encoder.matches(request.getSenhaAtual(), usuario.getSenha()))
			throw new RuntimeException("Senha atual não confere");
		String senhaCriptografada = encoder.encode(request.getSenhaNova());
		usuario.setSenha(senhaCriptografada);

	}
}
