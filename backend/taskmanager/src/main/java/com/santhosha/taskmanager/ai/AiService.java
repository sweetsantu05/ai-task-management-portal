package com.santhosha.taskmanager.ai;

import com.santhosha.taskmanager.dto.GeminiRequest;
import com.santhosha.taskmanager.dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AiService {

    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    public AiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateTaskDescription(String title) {

        String prompt =
        """
        For the task title: %s

        Generate:

        Description:
        A detailed task description.

        Priority:
        LOW, MEDIUM, or HIGH

        Estimated Time:
        Example: 2 Hours

        Return only the result.
        """.formatted(title);

        GeminiRequest.Part part =
                new GeminiRequest.Part(prompt);

        GeminiRequest.Content content =
                new GeminiRequest.Content(List.of(part));

        GeminiRequest request =
                new GeminiRequest(List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GeminiRequest> entity =
                new HttpEntity<>(request, headers);

        String url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
        + apiKey;

        try {

    ResponseEntity<GeminiResponse> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    GeminiResponse.class
            );

    return response.getBody()
            .getCandidates()
            .get(0)
            .getContent()
            .getParts()
            .get(0)
            .getText();

} 

        catch (Exception e) {

        e.printStackTrace();

        return "ERROR: " + e.getMessage();
        }
    }
}