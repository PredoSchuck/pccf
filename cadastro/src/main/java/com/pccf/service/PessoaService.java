package com.pccf.service;

import org.springframework.stereotype.Service;
import com.pccf.model.Pessoa;
import com.pccf.repository.PessoaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    public final PessoaRepository repo;

    public PessoaService(PessoaRepository repo) {
        this.repo = repo;
    }

    public List<Pessoa> listarTodas() {
        return repo.findAll();
    }

    public Optional<Pessoa> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Pessoa criar(Pessoa p) {
        return repo.save(p);
    }

    public Pessoa atualizar(Integer id, Pessoa p) {
        return repo.findById(id).map(existing -> {
            existing.setNome(p.getNome());
            existing.setCpf(p.getCpf());
            existing.setRg(p.getRg());
            existing.setDataNascimento(p.getDataNascimento());
            existing.setTelefone(p.getTelefone());
            existing.setTipo(p.getTipo());
            return repo.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Pessoa não encontrada: " + id));
    }

    public void remover(Integer id) {
        repo.deleteById(id);
    }
}