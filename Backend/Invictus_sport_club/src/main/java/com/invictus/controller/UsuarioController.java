package com.invictus.controller;

import com.invictus.domain.usuario.RequestResetUserPassword;
import com.invictus.domain.usuario.Usuario;
import com.invictus.domain.usuario.UsuarioUpdateDto;
import com.invictus.mapper.UsuarioMapper;
import com.invictus.services.UsuarioService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        List<Usuario> usuarios = usuarioService.obterTodosUsuarios();

        return ResponseEntity.ok(usuarios);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity atualizarUsuarioPorId(@Valid @RequestBody UsuarioUpdateDto usuarioUpdateDto, @PathVariable("id") Long idUsuario) {
        usuarioService.atualizarUsuarioPorId(usuarioUpdateDto, idUsuario);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @PostMapping("/resetPassword")
    public ResponseEntity redefinirSenha(@RequestBody RequestResetUserPassword request) {
        usuarioService.resetPassword(request);
        return ResponseEntity.noContent().build();
    }

}
