package com.santhosha.taskmanager.controller;

import com.santhosha.taskmanager.ai.AiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public String generateDescription(
            @RequestParam String title) {

        return aiService.generateTaskDescription(title);
    }
}