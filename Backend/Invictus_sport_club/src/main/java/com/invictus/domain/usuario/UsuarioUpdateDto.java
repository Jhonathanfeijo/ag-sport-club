package com.invictus.domain.usuario;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioUpdateDto {
    @NotBlank
    private String nome;
    @NotBlank
    private String cpf;
    private String nivelPermissao;
    @NotBlank
    private String login;
}
