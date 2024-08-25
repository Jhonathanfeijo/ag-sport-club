package com.invictus.repository;

import java.util.List;

import com.invictus.domain.esporte.EsportesJogadosResponse;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.SqlResultSetMappings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invictus.domain.esporte.Esporte;

public interface EsporteRepository extends JpaRepository<Esporte, Long> {

	@Query(value = "select exists (select 1 from esporte e where UPPER(e.descricao) = UPPER(:descricao) )as esporte_existe", nativeQuery = true)
	boolean existsByDescricao(@Param("descricao") String descricao);

	@Query(value = "select exists (select 1 from esporte e where UPPER(e.descricao) = UPPER(:descricao) and e.id_esporte != :idEsporte) as esporte_existe ", nativeQuery = true)
	boolean existsByDescricaoAndIdEsporte(@Param("descricao") String descricao, @Param("idEsporte") Long idEsporte);

	// create view v_esportes_ordem_alfabetica as select e.id_esporte, e.descricao,
	// e.ativo from esporte e order by e.descricao;
	@Query(value = "select * from v_esportes_ordem_alfabetica", nativeQuery = true)
	List<Esporte> findAll();

	@Query(value = "select e.descricao from esporte e where e.id_esporte = :id order by e.descricao ", nativeQuery = true)
	List<Esporte> findAllById(@Param("id") Long idUsuario);

	@Query(value = "select exists (select 1 from esporte e where e.id_esporte = :idEsporte) as esporte_existe", nativeQuery = true)
	boolean existsById(@Param("idEsporte") Long idEsporte);

	@Query(value = "delete from esporte where id_esporte = :idEsporte", nativeQuery = true)
	@Modifying
	void deleteById(@Param("idEsporte") Long idEsporte);

	// create view v_esportes_ativos_ordem_alfabetica as select e.id_esporte,
	// e.descricao, e.ativo from esporte e where e.ativo = true order by
	// e.descricao;
	@Query(value = "select * from v_esportes_ativos_ordem_alfabetica", nativeQuery = true)
	List<Esporte> findAllByAtivoOrderByDescricao();

	@Query(value = "insert into esporte(descricao, ativo) values (:descricao, :ativo) returning id_esporte, descricao, ativo", nativeQuery = true)
	Esporte saveEsporte(@Param("descricao") String descricao,
			@Param("ativo") boolean ativo);

	@Query(value = "SELECT COUNT(*) AS quantidade, e.descricao " + "FROM reserva r " + "INNER JOIN quadra q ON q.id_quadra = r.id_quadra " + "INNER JOIN esporte e ON e.id_esporte = q.id_esporte " + "WHERE r.id_usuario = :idUsuario " + "GROUP BY e.id_esporte " + "ORDER BY e.id_esporte DESC " + "LIMIT 3", nativeQuery = true)
	List<Object[]> sportsMoreReservedByUserId(@Param("idUsuario") Long idUsuario);


}
