package com.invictus.services;

import java.util.List;

import com.invictus.domain.usuario.UsuarioUpdateDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Usuario> obterTodosUsuarios() {
        return usuarioRepository.findAllOrderedByNome();
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

    public void atualizarUsuarioPorId(UsuarioUpdateDto usuarioUpdateDto, Long idUsuario) {

        if (!usuarioRepository.existsById(idUsuario))
            throw new RuntimeException("Usuario nao encontrado");
        if (usuarioRepository.existsByLoginAndNotIdUsuario(usuarioUpdateDto.getLogin(), idUsuario))
            throw new RuntimeException("Ja existe usuario com esse login");
        Usuario usuario = usuarioRepository.findByIdUsuario(idUsuario);
        usuario.setLogin(usuarioUpdateDto.getLogin());
        usuario.setNome(usuarioUpdateDto.getNome());
        usuario.setCpf(usuarioUpdateDto.getCpf());
        if (usuarioUpdateDto.getNivelPermissao() != null)
            usuario.setNivelPermissao(usuarioUpdateDto.getNivelPermissao());
        usuarioRepository.save(usuario);
    }

    public void alterUserRole(Long idUsuario, String role) {
        if (!usuarioRepository.existsById(idUsuario))
            throw new RuntimeException("Usuário não encontrado");
        usuarioRepository.updateNivelPermissaoByIdUsuario(role, idUsuario);
    }
}
