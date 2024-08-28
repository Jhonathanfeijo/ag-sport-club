package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.invictus.domain.formPagamento.FormPagamento;

public interface FormPagamentoRepository extends JpaRepository<FormPagamento, Long> {

	@Query(value = "select exists (select 1 from form_pagamento f where UPPER(f.descricao) = UPPER(:descricao)) as form_pagamento_existe", nativeQuery = true)
	boolean existsByDescricao(String descricao);

	@Query(value = "select exists (select 1 from form_pagamento f where UPPER(f.descricao) = UPPER(:descricao) and f.id_form_pagamento != :idFormPagamento) as form_pagamento_existe", nativeQuery = true)
	boolean existsByDescricaoAndId(@Param("descricao") String descricao, @Param("idFormPagamento") Long id);
	// create view v_form_pagamento_ordem_alfabetica as select f.id_form_pagamento,
	// f.descricao, f.ativo from form_pagamento f order by f.descricao;
	@Query(value = "select * from v_form_pagamento_ordem_alfabetica", nativeQuery = true)
	List<FormPagamento> findAllOrderByDescricao();

	// create view v_form_pagamentos_ativos_ordem_alfabetica as select
	// f.id_form_pagamento, f.descricao, f.ativo from form_pagamento f where f.ativo
	// = true order by f.descricao;
	@Query(value = "select * from v_form_pagamentos_ativos_ordem_alfabetica", nativeQuery = true)
	List<FormPagamento> findAllByAtivoOrderByDescricao();

	@Query(value = "insert into form_pagamento (descricao, ativo) values (:descricao, :ativo) returning id_form_pagamento, descricao, ativo", nativeQuery = true)
	FormPagamento saveFormPagamento(@Param("descricao") String descricao, @Param("ativo") boolean ativo);

	@Query(value = "delete from form_pagamento where id_form_pagamento = :id_form_pagamento", nativeQuery = true)
	@Modifying
	void deleteById(@Param("id_form_pagamento") Long idFormPagamento);

}
