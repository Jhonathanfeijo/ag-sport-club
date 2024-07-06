package com.invictus.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
		Quadra quadra = quadraSevice.obterQuadraPorId(request.getIdQuadra());
		FormPagamento formPagamento = formPagamentoService.buscarFormaPagamentoPorId(request.getIdFormPagamento());
		Reserva reserva = new Reserva(null, usuario, quadra, formPagamento, request.getData(),
				request.getHorarioInicial(), request.getHorasReservadas(), "pendente");
		return reservaRepository.save(reserva);
	}

	public Reserva obterReservaPorId(Long idReserva) {
		verificadorReservaExiste(idReserva);
		return reservaRepository.getReferenceById(idReserva);
	}

	public void pagarReserva(Long idReserva) {
		Reserva reserva = obterReservaPorId(idReserva);
		if (reserva.getStatus().toUpperCase() == "CANCELADO")
			throw new RuntimeException("Essa reserva já foi cancelada");
		reserva.setStatus("PAGO");
		reservaRepository.save(reserva);
	}

	public void verificadorReservaExiste(Long idReserva) {
		if (!reservaRepository.existsById(idReserva))
			throw new RuntimeException("Reserva não foi encontrada");
	}

	public Page<Reserva> obterReservas(Pageable paginacao){
		return reservaRepository.findAll(paginacao);
	}
	
	public List<Reserva> obterReservasPorIdUsuario(Long idUsuario){
		return reservaRepository.findAllByUsuarioIdUsuario(idUsuario);
	}

}
