package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.invictus.domain.tipoQuadra.TipoQuadra;
import org.springframework.data.repository.query.Param;

public interface TipoQuadraRepository extends JpaRepository<TipoQuadra, Long> {

	// create view v_obter_tipo_quadras_ordem_alfabetica as select
	// tq.id_tipo_quadra, tq.descricao from tipo_quadra tq order by tq.descricao
	@Query(value = "select * from v_obter_tipo_quadras_ordem_alfabetica", nativeQuery = true)
	List<TipoQuadra> findAllOrderByDescricao();

	@Query(value = "insert into tipo_quadra (descricao) values (:descricao) returning id_tipo_quadra, descricao", nativeQuery = true)
	TipoQuadra criar(@Param("descricao") String descricao);

	@Query(value = "update tipo_quadra set descricao = :descricao where id_quadra = :idQuadra returning id_quadra, descricao", nativeQuery = true)
	TipoQuadra atualizar(@Param("descricao") String descricao, @Param("idQuadra") Long idQuadra);


}
