package com.example.todo_list.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@Entity
@Data
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String texto;

// --- DATAS AUTOMÁTICAS ---
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Antes de salvar pela primeira vez
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Antes de atualizar qualquer dado
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
