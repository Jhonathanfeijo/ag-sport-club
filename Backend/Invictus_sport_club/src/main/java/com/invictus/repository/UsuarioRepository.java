package com.invictus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.invictus.domain.usuario.Usuario;
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	UserDetails findByLogin(String login);

	@Query(nativeQuery = true, value = "select * from usuario where login =:login")
	Usuario findUsuarioByLogin(@Param("login") String login);
}
