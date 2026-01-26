package com.example.todo_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todo_list.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    
}
