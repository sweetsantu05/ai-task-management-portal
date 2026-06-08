package com.santhosha.taskmanager.service;

import com.santhosha.taskmanager.entity.Task;
import com.santhosha.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }
}