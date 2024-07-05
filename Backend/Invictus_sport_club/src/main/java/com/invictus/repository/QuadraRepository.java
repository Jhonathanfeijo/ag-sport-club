package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invictus.domain.quadra.Quadra;

public interface QuadraRepository extends JpaRepository<Quadra, Long> {

	public boolean existsByLocQuadra(String locQuadra);

	List<Quadra> findAllByEsporteIdEsporte(Long esporteId);
	
}
