package com.invictus.infra;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.invictus.domain.usuario.Usuario;

@Service
public class TokenService {

	@Value("${api.secret.token}")
	private String secret;

	public String generateToken(Usuario usuario) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			return JWT.create().withIssuer("api-ag").withClaim("permissao", usuario.getNivelPermissao())
					.withClaim("login", usuario.getLogin()).withClaim("nome", usuario.getNome())
					.withClaim("id", usuario.getIdUsuario()).withClaim("cpf", usuario.getCpf())
					.withClaim("email", usuario.getEmail()).withSubject(usuario.getLogin()).sign(algorithm);
		} catch (JWTCreationException ex) {
			throw new RuntimeException("Não foi possível gerar o token");
		}
	}

	public String validateToken(String token) {

		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			return JWT.require(algorithm).withIssuer("api-ag").build().verify(token).getSubject();

		} catch (JWTVerificationException ex) {
			return "";
		}
	}

	private Instant getExpirationDate() {
		return LocalDateTime.now().plusHours(5).toInstant(ZoneOffset.of("-03:00"));
	}
}
