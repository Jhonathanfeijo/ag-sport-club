package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.invictus.domain.tipoQuadra.TipoQuadra;

public interface TipoQuadraRepository extends JpaRepository<TipoQuadra, Long> {

	// create view v_obter_tipo_quadras_ordem_alfabetica as select
	// tq.id_tipo_quadra, tq.descricao from tipo_quadra tq order by tq.descricao
	@Query(value = "select * from v_obter_tipo_quadras_ordem_alfabetica", nativeQuery = true)
	List<TipoQuadra> findAllOrderByDescricao();

}
