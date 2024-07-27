package com.invictus.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.invictus.domain.reserva.Reserva;
import com.invictus.domain.reserva.ReservaRequestDTO;
import com.invictus.domain.reserva.ReservaRequestStatusUpdate;
import com.invictus.domain.reserva.ReservaResponseDto;
import com.invictus.mapper.ReservaMapper;
import com.invictus.services.ReservaService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/reserva")
@CrossOrigin("*")
public class ReservaController {

	@Autowired
	private ReservaService reservaService;

	@Autowired
	private ReservaMapper reservaMapper;

	@GetMapping
	public ResponseEntity obterReservas(@PageableDefault(page = 1, size = 10) Pageable paginacao) {
		Page<Reserva> reservas = reservaService.obterReservas(paginacao);
		Page<ReservaResponseDto> response = reservas.map(reserva -> reservaMapper.reservaToReservaResponseDto(reserva));
		return ResponseEntity.ok(response);
	}

	@GetMapping("/verify")
	public ResponseEntity verificarHorariosDisponiveis(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataReserva) {
		List<Integer> horariosDisponiveis = reservaService.obterHorariosDisponiveis(dataReserva);
		return ResponseEntity.ok(horariosDisponiveis);
	}

	@GetMapping("/byUser/{id}")
	public ResponseEntity obterReservasPorIdUsuario(@PathVariable("id") Long idUsuario) {
		List<Reserva> reservasUsuario = reservaService.obterReservasPorIdUsuario(idUsuario);
		List<ReservaResponseDto> response = reservasUsuario.stream()
				.map(reserva -> reservaMapper.reservaToReservaResponseDto(reserva)).collect(Collectors.toList());
		return ResponseEntity.ok(response);
	}

	@Transactional
	@PostMapping
	public ResponseEntity registrarReserva(@RequestBody ReservaRequestDTO request, UriComponentsBuilder builder) {
		Reserva reserva = reservaService.registrarReserva(request);
		URI uri = builder.path("/{id}").buildAndExpand(reserva.getIdReserva()).toUri();
		ReservaResponseDto response = reservaMapper.reservaToReservaResponseDto(reserva);
		return ResponseEntity.created(uri).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity obterReservaPorId(@PathVariable("id") Long idReserva) {
		Reserva reserva = reservaService.obterReservaPorId(idReserva);
		ReservaResponseDto response = reservaMapper.reservaToReservaResponseDto(reserva);
		return ResponseEntity.ok(response);
	}

	@Transactional
	@PutMapping("/status/{id}")
	public ResponseEntity atualizarReserva(@PathVariable("id") Long idQuadra, @RequestBody ReservaRequestStatusUpdate request) {
		System.out.println(request.getStatusReserva());
		Reserva reserva = reservaService.atualizarReserva(idQuadra, request.getStatusReserva());
		return ResponseEntity.ok(reserva);
	}
}
