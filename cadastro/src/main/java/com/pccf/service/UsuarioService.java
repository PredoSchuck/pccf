package com.pccf.service;

import org.springframework.stereotype.Service;
import com.pccf.model.Usuario;
import com.pccf.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public List<Usuario> listarTodos() {
        return repo.findAll();
    }

    public Optional<Usuario> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Usuario criar(Usuario u) {
        return repo.save(u);
    }

    public Usuario atualizar(Integer id, Usuario dados) {
        return repo.findById(id).map(existing -> {
            existing.setUsuario(dados.getUsuario());
            existing.setSenha(dados.getSenha());
            return repo.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));
    }

    public void remover(Integer id) {
        repo.deleteById(id);
    }

    public boolean autenticar(String usuario, String senha) {
        return repo.findByUsuario(usuario)
                   .map(u -> u.getSenha().equals(senha))
                   .orElse(false);
    }
}