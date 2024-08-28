package com.invictus.services.formPagamento;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invictus.domain.formPagamento.FormPagamento;
import com.invictus.domain.formPagamento.dto.FormPagamentoRequest;
import com.invictus.mapper.FormPagamentoMapper;
import com.invictus.repository.FormPagamentoRepository;
import com.invictus.repository.ReservaRepository;
import com.invictus.services.formPagamento.validadores.ValidadorFormPagamentoService;

@Service
public class FormPagamentoService {

	@Autowired
	private FormPagamentoRepository formPagamentoRepository;

	@Autowired
	private List<ValidadorFormPagamentoService> validadores;

	@Autowired
	private FormPagamentoMapper formPagamentoMapper;

	@Autowired
	private ReservaRepository reservaRepository;

	public FormPagamento cadastrarFormaPagamento(FormPagamentoRequest request) {

		validadores.forEach((v) -> v.validar(request));
		FormPagamento formPagamento = formPagamentoMapper.FormPagamentoRequestToFormPagamento(request);
		return formPagamentoRepository.saveFormPagamento(formPagamento.getDescricao(), formPagamento.isAtivo());
	}

	public List<FormPagamento> listarFormasPagamento() {
		return formPagamentoRepository.findAllOrderByDescricao();
	}

	public List<FormPagamento> listarFormasPagamentoAtivas() {
		return formPagamentoRepository.findAllByAtivoOrderByDescricao();
	}

	public FormPagamento buscarFormaPagamentoPorId(Long idFormPagamento) {
		verificadorFormaPagamento(idFormPagamento);
		return formPagamentoRepository.findById(idFormPagamento).get();
	}

	public FormPagamento editarFormaPagamentoPorId(Long idFormPagamento, FormPagamentoRequest formPagamento) {
		verificadorFormaPagamento(idFormPagamento);
		if (formPagamentoRepository.existsByDescricaoAndId(formPagamento.getDescricao(), idFormPagamento))
			throw new RuntimeException("Forma de pagamento ja existe");
		FormPagamento form = formPagamentoMapper.FormPagamentoRequestToFormPagamento(formPagamento);
		form.setIdFormPagamento(idFormPagamento);
		return formPagamentoRepository.save(form);
	}

	public void deletarFormaPagamentoPorId(Long idFormPagamento) {
		verificadorFormaPagamento(idFormPagamento);
		if (reservaRepository.existsByFormPagamento(idFormPagamento))
			throw new RuntimeException(
					"Não é possível deletar forma de pagamento, pois já possui reservas com essa forma de pagamento");
		formPagamentoRepository.deleteById(idFormPagamento);
	}

	private void verificadorFormaPagamento(Long idFormPagamento) {
		if (!formPagamentoRepository.existsById(idFormPagamento))
			throw new RuntimeException("Forma de pagamento não encontrada");
	}
}
