package com.invictus.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invictus.domain.quadra.Quadra;

public interface QuadraRepository extends JpaRepository<Quadra, Long> {

	@Query(value = "insert into quadra (id_esporte, id_tipo_quadra, ativo, loc_quadra, valor_hora)"
			+ " values(:idEsporte, :idTipoQuadra, :ativo, :loc_quadra, :valorHora)"
			+ " returning id_quadra, loc_quadra, valor_hora, ativo, id_tipo_quadra, id_esporte ", nativeQuery = true)
	public Quadra save(@Param("idEsporte") Long idEsporte, @Param("idTipoQuadra") Long idTipoQuadra,
			@Param("ativo") boolean ativo, @Param("loc_quadra") String locQuadra,
			@Param("valorHora") BigDecimal valorHora);

	@Query(value = "select exists (select 1 from quadra q where upper(q.loc_quadra) = upper(:locQuadra)) as quadra_existe", nativeQuery = true)
	public boolean existsByLocQuadra(@Param("locQuadra") String locQuadra);

	@Query(value = "select q.id_quadra, q.id_tipo_quadra, q.id_esporte, q.loc_quadra, q.valor_hora, q.ativo from quadra q where q.id_esporte = :idEsporte order by q.loc_quadra", nativeQuery = true)
	List<Quadra> findAllByEsporteIdEsporte(@Param("idEsporte") Long esporteId);

	@Query(value = "select exists (select 1 from quadra q where q.id_esporte = :id_esporte) as esporte_existe", nativeQuery = true)
	boolean existsByEsporteId(@Param("id_esporte") Long idEsporte);

	@Query(value = "select exists (select 1 from quadra q where q.id_tipo_quadra = :id_tipo_quadra) as tipo_quadra_existe", nativeQuery = true)
	boolean existsByTipoQuadraId(@Param("id_tipo_quadra") Long idTipoQuadra);

	// create view v_obter_quadra_ordem_alfabetica as select q.id_quadra,
	// q.id_tipo_quadra, q.id_esporte, q.loc_quadra, q.valor_hora, q.ativo from
	// quadra q order by q.loc_quadra
	@Query(value = "select * from v_obter_quadra_ordem_alfabetica ", nativeQuery = true)
	List<Quadra> findAllOrderByLocDescricao();

	// create view v_obter_quadras_ativas_ordem_alfabetica as select q.id_quadra,
	// q.id_tipo_quadra, q.id_esporte, q.loc_quadra, q.valor_hora, q.ativo from
	// quadra q where q.ativo = true order by q.loc_quadra
	@Query(value = "select * from v_obter_quadras_ativas_ordem_alfabetica ", nativeQuery = true)
	List<Quadra> findAllByAtivoOrderByLocDescricao();

	@Query(value = "update quadra"
			+ " set loc_quadra = :locQuadra, valor_hora =:valorHora, ativo = :ativo, id_esporte = :idEsporte, id_tipo_quadra = :idTipoQuadra"
			+ " where id_quadra = :idQuadra", nativeQuery = true)
	void updateQuadraById(@Param("idQuadra") Long idQuadra, @Param("locQuadra") String locQuadra,
			@Param("valorHora") BigDecimal valorHora, @Param("idEsporte") Long idEsporte,
			@Param("idTipoQuadra") Long idTipoQuadra, @Param("ativo") boolean ativo);

	@Modifying
	@Query(value = "delete from quadra where id_quadra = :idQuadra", nativeQuery = true)
	void deleteById(@Param("idQuadra") Long idQuadra);

	@Query(value = "select q.loc_quadra from quadra q inner join reserva r on r.id_quadra = q.id_quadra inner join usuario u on u.id_usuario = r.id_usuario where upper( r.status) <> upper('cancelado') and u.id_usuario = :idUsuario order by r.data desc limit 3", nativeQuery = true)
	List<String> lastQuadrasReserved(@Param("idUsuario") Long idUsuario);

	//create view v_obter_quadras_disponiveis_para_locacao as
	//select q.id_quadra,
	//	   q.loc_quadra,
	//	   q.id_esporte,
	//	   q.id_tipo_quadra,
	//	   q.valor_hora,
	//	   q.ativo
	//from quadra q
	//inner join esporte e
	//	on e.id_esporte = q.id_esporte
	//where e.ativo = true
	//	and q.ativo = true
	//order by q.loc_quadra asc;
	@Query(value = "select * from v_obter_quadras_disponiveis_para_locacao;", nativeQuery = true)
	List<Quadra> findAllAvailableQuadras();

}
