package com.invictus.repository;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.invictus.domain.usuario.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	UserDetails findByLogin(String login);

	@Query(nativeQuery = true,
			value =
					"select u.id_usuario," +
                            " u.nome," +
                            " u.cpf," +
                            " u.email," +
                            " u.login," +
                            " u.senha," +
                            " u.nivel_permissao" +
                            " from usuario u" +
                            " where u.login =:login")
	Usuario findUsuarioByLogin(@Param("login") String login);

	@Query(value = "insert into usuario "
			+ "(nome, cpf, email, login, senha, nivel_permissao)"
			+ " values( :nome, :cpf, :email, :login, :senha, :nivel_permissao)"
			+ " returning id_usuario, nome, cpf, email, login, senha, nivel_permissao",
			nativeQuery = true)
	public Usuario save(@Param("nome") String nome, @Param("cpf") String cpf, @Param("email") String email,
			@Param("login") String login, @Param("senha") String senha,
			@Param("nivel_permissao") String nivel_permissao);

	@Query(value = "select u.id_usuario, u.nome, u.cpf, u.email, u.senha, u.login, u.nivel_permissao from Usuario u order by u.nome asc", nativeQuery = true)
	List<Usuario> findAllOrderedByNome();

	@Query(nativeQuery = true, value = "select exists (select 1 from usuario u where u.login = :login and u.id_usuario <> :idUsuario) as existe_usuario")
	boolean existsByLoginAndNotIdUsuario(@Param("login") String login, @Param("idUsuario") Long idUsuario);

	@Query(nativeQuery = true, value = "select u.id_usuario, u.nome, u.email, u.senha, u.nivel_permissao, u.login, u.cpf from usuario u where u.id_usuario = :idUsuario")
	public Usuario findByIdUsuario(@Param("idUsuario") Long idUsuario);
	@Query(value = "select exists(select 1 from usuario u where u.cpf = :cpf) as existe_usuario", nativeQuery = true)
	boolean existsByCpf(@NotBlank @Param("cpf") String cpf);
}
