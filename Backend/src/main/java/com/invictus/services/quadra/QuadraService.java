package com.invictus.services.quadra;

import java.util.List;

import com.invictus.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.invictus.domain.esporte.Esporte;
import com.invictus.domain.quadra.Quadra;
import com.invictus.domain.quadra.dto.QuadraRequest;
import com.invictus.domain.tipoQuadra.TipoQuadra;
import com.invictus.repository.QuadraRepository;
import com.invictus.services.EsporteService;
import com.invictus.services.TipoQuadraService;

@Service
public class QuadraService {

    @Autowired
    private QuadraRepository quadraRepository;

    @Autowired
    private EsporteService esporteService;

    @Autowired
    private TipoQuadraService tipoQuadraService;

    @Lazy
    @Autowired
    private ReservaService reservaService;

    @Autowired
    private List<ValidadorQuadraService> validadores;

    public Quadra registrarQuadra(QuadraRequest request) {

        validadores.forEach((v) -> v.validar(request));

        return quadraRepository.save(request.getIdEsporte(), request.getIdTipoQuadra(), request.getAtivo(),
                request.getLocQuadra(), request.getValorHora());

    }

    public List<Quadra> obterQuadras() {
        return quadraRepository.findAllOrderByLocDescricao();
    }

    public List<Quadra> obterQuadrasAtivas() {
        return quadraRepository.findAllByAtivoOrderByLocDescricao();
    }

    public Quadra obterQuadraPorId(Long idQuadra) {
        verificaQuadraExiste(idQuadra);
        return quadraRepository.findById(idQuadra).get();
    }

    public List<Quadra> obterQuadrasPorIdEsporte(Long idEsporte) {
        return quadraRepository.findAllByEsporteIdEsporte(idEsporte);
    }

    public Quadra editarQuadraPorId(Long idQuadra, QuadraRequest request) {

        verificaQuadraExiste(idQuadra);
        Esporte esporte = esporteService.buscarEsportePorId(request.getIdEsporte());
        TipoQuadra tipoQuadra = tipoQuadraService.buscarTipoQuadraPorId(request.getIdTipoQuadra());

        Quadra quadra = new Quadra(idQuadra, tipoQuadra, esporte, request.getLocQuadra(), request.getValorHora(),
                request.getAtivo());
        return quadraRepository.save(quadra);

    }

    public void deletarQuadraPorId(Long idQuadra) {
        verificaQuadraExiste(idQuadra);
        if(reservaService.existeReservaComQuadra(idQuadra))
            throw new RuntimeException("Não é possível excluir quadra, pois já existem reservas que esse relacionem com essa entidade");
        quadraRepository.deleteById(idQuadra);
    }

    public void verificaQuadraExiste(Long idQuadra) {
        if (!quadraRepository.existsById(idQuadra))
            throw new RuntimeException("Quadra não foi encontrada");
    }

    public List<String> obterUltimasQuadrasReservadas(Long idUsuario) {
        return quadraRepository.lastQuadrasReserved(idUsuario);
    }

    public List<Quadra> obterQuadrasDisponiveisParaLocacao() {
        return quadraRepository.findAllAvailableQuadras();
    }
}
