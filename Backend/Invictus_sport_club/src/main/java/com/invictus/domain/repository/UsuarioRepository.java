package com.invictus.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invictus.domain.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
