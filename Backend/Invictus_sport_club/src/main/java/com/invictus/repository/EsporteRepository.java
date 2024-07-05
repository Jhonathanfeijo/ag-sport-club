package com.invictus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invictus.domain.esporte.Esporte;

public interface EsporteRepository extends JpaRepository<Esporte, Long> {

	boolean existsByDescricao(String descricao);

}
