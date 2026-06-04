package com.santhosha.taskmanager.repository;

import com.santhosha.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}