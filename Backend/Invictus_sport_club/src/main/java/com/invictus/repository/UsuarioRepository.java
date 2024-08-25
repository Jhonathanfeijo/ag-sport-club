package com.invictus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.invictus.domain.usuario.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	UserDetails findByLogin(String login);

	@Query(nativeQuery = true, value = "select u.id_usuario, u.nome, u.cpf, u.email, u.login, u.senha, u.nivel_permissao from usuario u where u.login =:login")
	Usuario findUsuarioByLogin(@Param("login") String login);

	@Query("select u.nome, u.cpf, u.email, u.email, u.idUsuario from Usuario u order by u.nome asc")
	Page<Usuario> findAllOrderedByNome(Pageable paginacao);
}
