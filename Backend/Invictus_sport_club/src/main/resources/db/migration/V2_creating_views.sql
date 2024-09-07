create view v_esportes_ordem_alfabetica as
select e.id_esporte,
       e.descricao,
       e.ativo
from esporte e
order by e.descricao;

create view v_esportes_ativos_ordem_alfabetica as
select e.id_esporte,
       e.descricao,
       e.ativo
from esporte e
where e.ativo = true
order by e.descricao;
create view v_form_pagamento_ordem_alfabetica as
select f.id_form_pagamento,
       f.descricao,
       f.ativo
from form_pagamento f
order by f.descricao;

create view v_form_pagamentos_ativos_ordem_alfabetica as
select f.id_form_pagamento,
       f.descricao,
       f.ativo
from form_pagamento f
where f.ativo
          = true
order by f.descricao;

create view v_obter_quadra_ordem_alfabetica as
select q.id_quadra,
       q.id_tipo_quadra,
       q.id_esporte,
       q.loc_quadra,
       q.valor_hora,
       q.ativo
from quadra q
order by q.loc_quadra;

create view v_obter_quadras_ativas_ordem_alfabetica as
select q.id_quadra,
       q.id_tipo_quadra,
       q.id_esporte,
       q.loc_quadra,
       q.valor_hora,
       q.ativo
from quadra q
where q.ativo = true
order by q.loc_quadra;
create view v_obter_tipo_quadras_ordem_alfabetica as

select tq.id_tipo_quadra,
       tq.descricao
from tipo_quadra tq
order by tq.descricao;

create view v_obter_quadras_disponiveis_para_locacao as
select q.id_quadra,
       q.loc_quadra,
       q.id_esporte,
       q.id_tipo_quadra,
       q.valor_hora,
       q.ativo
from quadra q
         inner join esporte e
                    on e.id_esporte = q.id_esporte
where e.ativo = true
  and q.ativo = true
order by q.loc_quadra asc;