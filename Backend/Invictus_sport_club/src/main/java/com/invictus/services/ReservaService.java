package com.invictus.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.reserva.Reserva;
import com.invictus.domain.reserva.ReservaRequestDTO;
import com.invictus.domain.usuario.Usuario;
import com.invictus.repository.ReservaRepository;
import com.invictus.services.formPagamento.FormPagamentoService;
import com.invictus.services.quadra.QuadraService;

@Service
public class ReservaService {

	@Autowired
	private UsuarioService usuarioService;
	@Autowired
	private FormPagamentoService formPagamentoService;
	@Autowired
	private QuadraService quadraSevice;
	@Autowired
	private ReservaRepository reservaRepository;

	public Reserva registrarReserva(ReservaRequestDTO request) {

		Usuario usuario = usuarioService.obterUsuario(request.getIdUsuario());
		Quadra quadra = quadraSevice.obterQuadra(request.getIdQuadra());
		FormPagamento formPagamento = formPagamentoService.buscarFormaPagamentoPorId(request.getIdPagamento());
		Reserva reserva = new Reserva(null, usuario, quadra, formPagamento, request.getData(),
				request.getHorarioInicial(), request.getHorasReservadas());
		return reservaRepository.save(reserva);

	}

}
