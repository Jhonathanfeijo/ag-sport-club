-- Criação das tabelas

CREATE TABLE form_pagamento (
                                       id_form_pagamento bigserial NOT NULL,
                                       ativo bool NOT NULL,
                                       descricao varchar(255) NULL,
                                       CONSTRAINT form_pagamento_pkey PRIMARY KEY (id_form_pagamento)
);

CREATE TABLE esporte ( 
                                id_esporte bigserial NOT NULL,
                                ativo bool NOT NULL,
                                descricao varchar(255) NULL,
                                CONSTRAINT esporte_pkey PRIMARY KEY (id_esporte)
);

CREATE TABLE tipo_quadra (
                                    id_tipo_quadra bigserial NOT NULL,
                                    descricao varchar(255) NULL,
                                    CONSTRAINT tipo_quadra_pkey PRIMARY KEY (id_tipo_quadra)
);

CREATE TABLE quadra (
                               id_quadra bigserial NOT NULL,
                               ativo bool NOT NULL,
                               loc_quadra varchar(255) NULL,
                               valor_hora numeric(38, 2) NULL,
                               id_esporte int8 NULL,
                               id_tipo_quadra int8 NULL,
                               CONSTRAINT quadra_pkey PRIMARY KEY (id_quadra)
);

CREATE TABLE usuario (
                                id_usuario bigserial NOT NULL,
                                cpf varchar(255) NULL,
                                email varchar(255) NULL,
                                login varchar(255) NULL,
                                nivel_permissao varchar(255) NULL,
                                nome varchar(255) NULL,
                                senha varchar(255) NULL,
                                CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
);

CREATE TABLE reserva (
                                id_reserva bigserial NOT NULL,
                                "data" date NULL,
                                esporte_reserva varchar(255) NULL,
                                horario_inicial int4 NOT NULL,
                                realizacao_reserva timestamp(6) NULL,
                                status varchar(255) NULL,
                                valor_reserva numeric(38, 2) NULL,
                                id_form_pagamento int8 NULL,
                                id_quadra int8 NULL,
                                id_usuario int8 NULL,
                                CONSTRAINT reserva_pkey PRIMARY KEY (id_reserva)
);

-- Adicionando constraints (foreign keys)

ALTER TABLE quadra
    ADD CONSTRAINT fk_esporte
        FOREIGN KEY (id_esporte) REFERENCES esporte(id_esporte);

ALTER TABLE quadra
    ADD CONSTRAINT fk_tipo_quadra
        FOREIGN KEY (id_tipo_quadra) REFERENCES tipo_quadra(id_tipo_quadra);

ALTER TABLE reserva
    ADD CONSTRAINT fk_quadra
        FOREIGN KEY (id_quadra) REFERENCES quadra(id_quadra);

ALTER TABLE reserva
    ADD CONSTRAINT fk_form_pagamento
        FOREIGN KEY (id_form_pagamento) REFERENCES form_pagamento(id_form_pagamento);

ALTER TABLE reserva
    ADD CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);
