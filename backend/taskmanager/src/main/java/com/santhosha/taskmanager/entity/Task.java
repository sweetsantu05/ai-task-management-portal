package com.santhosha.taskmanager.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String priority;

    private String dueDate;

    private String status;

    private LocalDateTime createdAt;

    private Long userId;

    private String role;

    // @ManyToOne
    // @JoinColumn(name = "user_id", insertable = false, updatable = false)
    // private User user;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();

        if (status == null || status.isEmpty()) {
            status = "TODO";
        }

        if (priority == null || priority.isEmpty()) {
            priority = "MEDIUM";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // public User getUser() {
    //     return user;
    // }

    // public void setUser(User user) {
    //     this.user = user;
    // }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}































// package com.santhosha.taskmanager.entity;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "tasks")
// public class Task {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String title;

//     @Column(length = 1000)
//     private String description;

//     public Task() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getTitle() {
//         return title;
//     }

//     public void setTitle(String title) {
//         this.title = title;
//     }

//     public String getDescription() {
//         return description;
//     }

//     public void setDescription(String description) {
//         this.description = description;
//     }
// }































