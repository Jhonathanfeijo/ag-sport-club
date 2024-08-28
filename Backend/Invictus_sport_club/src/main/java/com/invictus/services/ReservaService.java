package com.invictus.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.invictus.domain.reserva.ReservaNearResponse;
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
import com.invictus.services.reserva.validador.ValidadoresReserva;

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
	@Autowired
	private List<ValidadoresReserva> validadores;

	public Reserva registrarReserva(ReservaRequestDTO request) {

		validadores.forEach(v -> v.validar(request));

		Usuario usuario = usuarioService.obterUsuario(request.getIdUsuario());
		Quadra quadra = quadraSevice.obterQuadraPorId(request.getIdQuadra());
		FormPagamento formPagamento = formPagamentoService.buscarFormaPagamentoPorId(request.getIdFormPagamento());
		Reserva reserva = new Reserva(null, usuario, quadra, formPagamento, request.getDataReserva(),
				LocalDateTime.now(), request.getHorarioInicial(), quadra.getEsporte().getDescricao(),
				quadra.getValorHora(), "pendente");
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

	public Page<Reserva> obterReservas(Pageable paginacao) {
		return reservaRepository.findAll(paginacao);
	}

	public List<Reserva> obterReservasPorIdUsuario(Long idUsuario) {
		return reservaRepository.findAllByUsuarioIdUsuario(idUsuario);
	}

	public List<Integer> obterHorariosDisponiveis(LocalDate dataReserva) {
		List<Reserva> reservasMarcadasNaData = reservaRepository.findAllByDataReservada(dataReserva);
		ArrayList<Integer> horariosDisponiveis;
		if (dataReserva.getDayOfWeek().toString().toUpperCase().equals("SUNDAY"))
			horariosDisponiveis = new ArrayList<>(Arrays.asList(8, 9, 10, 11, 13, 14, 15, 16, 17));
		else
			horariosDisponiveis = new ArrayList<>(Arrays.asList(8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22));
		for (Reserva reserva : reservasMarcadasNaData) {
			int horarioInicialReserva = reserva.getHorarioInicial();
			horariosDisponiveis.removeIf(horario -> horario == horarioInicialReserva);
		}
		return horariosDisponiveis;
	}

	public Reserva atualizarReserva(Long idReserva, String status) {
		verificadorReservaExiste(idReserva);
		Reserva reserva = reservaRepository.findById(idReserva).get();
		reserva.setStatus(status);
		return reservaRepository.save(reserva);
	}

	public List<ReservaNearResponse> obterReservasProximasUsuario(Long idUsuario) {
		List<Reserva> reservas = reservaRepository.findAllNotCancelReservsNearByCurrentDateByUsuarioId(idUsuario);
		ArrayList<ReservaNearResponse> reservasProximas = new ArrayList<>();
		for (Reserva reserva : reservas) {
			ReservaNearResponse reservaProxima = new ReservaNearResponse();
			reservaProxima.setData(reserva.getData());
			reservaProxima.setDescricaoQuadra(reserva.getQuadra().getLocQuadra());
			reservaProxima.setHorarioInicial(reserva.getHorarioInicial());
			reservaProxima.setStatus(reserva.getStatus());
			reservasProximas.add(reservaProxima);
		}
		return reservasProximas;
	}

}
