package com.invictus.infra;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.invictus.services.AuthorizationService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private SecurityFilter filter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize.requestMatchers("/auth/*").permitAll()
						.requestMatchers(HttpMethod.GET, "/esporte/").hasAnyRole("USER", "ADMIN")
						.requestMatchers(HttpMethod.DELETE,"/esporte/").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PUT,"/esporte/","/esporte").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST,"/esporte/").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET, "/tipo_quadra/*").hasAnyRole("USER", "ADMIN")
						.requestMatchers("/tipo_quadra/").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET,"/form_pagamento/").hasAnyRole("ADMIN", "USER")
						.requestMatchers("/form_pagamento/").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET,"/quadra/").hasAnyRole("ADMIN", "USER")
						.requestMatchers("/quadra/").hasRole("ADMIN")
						.requestMatchers("/usuario/").hasAnyRole("ADMIN","USER")
						.anyRequest().permitAll())
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class).build();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return new AuthorizationService();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
