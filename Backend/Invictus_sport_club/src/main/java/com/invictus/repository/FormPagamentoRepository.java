package com.invictus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.invictus.domain.formPagamento.FormPagamento;

public interface FormPagamentoRepository extends JpaRepository<FormPagamento, Long> {

	boolean existsByDescricao(String descricao);
	//create view v_form_pagamento_ordem_alfabetica as select f.id_form_pagamento, f.descricao, f.ativo from form_pagamento f order by f.descricao;
	@Query(value = "select * from v_form_pagamento_ordem_alfabetica", nativeQuery = true)
	List<FormPagamento> findAllOrderByDescricao();
	//create view v_form_pagamentos_ativos_ordem_alfabetica as select f.id_form_pagamento, f.descricao, f.ativo from form_pagamento f where f.ativo = true order by f.descricao;
	@Query(value = "select * from v_form_pagamentos_ativos_ordem_alfabetica", nativeQuery = true)
	List<FormPagamento> findAllByAtivoOrderByDescricao();

}
