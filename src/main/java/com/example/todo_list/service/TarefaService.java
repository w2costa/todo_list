package com.example.todo_list.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.todo_list.model.Tarefa;
import com.example.todo_list.repository.TarefaRepository;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<Tarefa> listarTodos() {
        return tarefaRepository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada com ID: " + id));
    }

    @Transactional
    public Tarefa salvarTarefa(String texto) {
        Tarefa tarefa = new Tarefa();
        tarefa.setTexto(texto);

        return tarefaRepository.save(tarefa);
    }

    public Tarefa criarTarefa(Tarefa tarefa) {
        tarefa.setId(null);
        // tarefa.setCreatedAt(LocalDateTime.now());
        // tarefa.setUpdatedAt(LocalDateTime.now());
        return tarefaRepository.save(tarefa);
    }

    public void deletarPorId(Long id) {
        if (id == null || !tarefaRepository.existsById(id)) {
            throw new NoSuchElementException("Tarefa não encontrada com ID: " + id);
        }
        tarefaRepository.deleteById(id);
    }

    public Tarefa atualizarTarefa(Tarefa tarefa) {
        Tarefa tarefaExistente = tarefaRepository.findById(tarefa.getId())
                .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada com ID: " + tarefa.getId()));
        tarefaExistente.setTexto(tarefa.getTexto());
        // tarefaExistente.setUpdatedAt(LocalDateTime.now());
        tarefaRepository.save(tarefaExistente);
        return tarefaExistente;
    }
}
