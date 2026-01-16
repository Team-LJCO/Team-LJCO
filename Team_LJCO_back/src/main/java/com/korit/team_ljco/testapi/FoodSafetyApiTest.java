package com.korit.team_ljco.testapi;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class FoodSafetyApiTest {

    public static void main(String[] args) throws Exception {

        String serviceKey = "161778d13da04f1782f8";
        String url =
                "https://openapi.foodsafetykorea.go.kr/api/"
                        + serviceKey
                        + "/COOKRCP01/json/1/5";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("HTTP 상태 코드: " + response.statusCode());
        System.out.println("응답 바디 ↓↓↓");
        System.out.println(response.body());
    }
}
