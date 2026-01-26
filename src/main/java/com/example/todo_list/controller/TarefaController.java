package com.example.todo_list.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo_list.model.Tarefa;
import com.example.todo_list.service.TarefaService;

@RestController
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping("/tarefas")
    public List<Tarefa> getTarefas() {
        return tarefaService.listarTodos();
    }

    @GetMapping("/tarefas/{id}")
    Tarefa getById(@PathVariable Long id) {
        return tarefaService.buscarPorId(id);
    }

    @PostMapping("/tarefas")
    public Tarefa postTarefas(@RequestBody Tarefa novaTarefa) {
       return tarefaService.criarTarefa(novaTarefa);
    }

    @DeleteMapping("/tarefas/{id}")
    public void deleteTarefa(@PathVariable Long id) {
        tarefaService.deletarPorId(id);
    }

    @PutMapping("/tarefas/{id}")
    public Tarefa updateTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaAtualizada) {
        tarefaAtualizada.setId(id);
        return tarefaService.atualizarTarefa(tarefaAtualizada);
    }

}
