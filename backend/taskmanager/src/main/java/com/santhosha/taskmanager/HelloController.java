package com.santhosha.taskmanager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "Task Manager Backend Running!, created by santhosha ";
    }
}
