package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invictus.domain.esporte.Esporte;

public interface EsporteRepository extends JpaRepository<Esporte, Long> {

	@Query(value ="select exists (select 1 from esporte e where e.descricao = :descricao) as esporte_existe", nativeQuery = true)
	boolean existsByDescricao(@Param("descricao") String descricao);

	@Query(value = "select e.id_esporte, e.descricao, e.ativo from esporte e order by e.descricao", nativeQuery = true)
	List<Esporte> findAll();

	@Query(value = "select e.descricao from esporte e where e.id_esporte = :id order by e.descricao ", nativeQuery = true)
	List<Esporte> findAllById(@Param("id") Long idUsuario);
	
	
	//create view v_esportes_ativos_ordem_alfabetica as select e.id_esporte, e.descricao, e.ativo from esporte e where e.ativo = true order by e.descricao;
	@Query(value = "select * from v_esportes_ativos_ordem_alfabetica", nativeQuery = true)
	List<Esporte> findAllByAtivoOrderByDescricao();

}
