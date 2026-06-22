package com.santhosha.taskmanager.service;

import com.santhosha.taskmanager.entity.Task;
import com.santhosha.taskmanager.entity.User;
import com.santhosha.taskmanager.repository.TaskRepository;
import com.santhosha.taskmanager.repository.UserRepository;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getPrincipal().toString();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Task> getAllTasks() {
        User currentUser = getCurrentUser();
        return taskRepository.findByUserId(currentUser.getId());
    }

    public Task createTask(Task task) {
        User currentUser = getCurrentUser();
        task.setUserId(currentUser.getId());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        User currentUser = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUserId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized: Cannot delete this task");
        }

        taskRepository.deleteById(id);
    }

    public Task updateTask(Long id, Task updatedTask) {
        User currentUser = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUserId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized: Cannot update this task");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }
}