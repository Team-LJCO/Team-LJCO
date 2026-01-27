package com.korit.team_ljco.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Value("${server.port:8080}")
    private String serverPort;

    @Bean
    public OpenAPI openAPI() {
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name("Authorization");

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("Bearer Authentication");

        return new OpenAPI()
                .info(apiInfo())
                .servers(List.of(
                        new Server().url("http://localhost:" + serverPort).description("로컬 서버"),
                        new Server().url("https://api.fridgemate.com").description("운영 서버")
                ))
                .components(new Components().addSecuritySchemes("Bearer Authentication", securityScheme))
                .addSecurityItem(securityRequirement);
    }

    private Info apiInfo() {
        return new Info()
                .title("냉장고 파먹기 (FridgeMate) API")
                .description("사용자 보유 재료 기반 레시피 추천 시스템 API 문서입니다.\n\n" +
                        "## 인증 방법\n" +
                        "1. OAuth2 소셜 로그인 (Google, Naver, Kakao)\n" +
                        "2. 로그인 성공 시 JWT Access Token 발급\n" +
                        "3. 인증이 필요한 API 호출 시 헤더에 토큰 포함\n" +
                        "   ```\n" +
                        "   Authorization: Bearer {your-jwt-token}\n" +
                        "   ```\n\n" +
                        "## API 그룹\n" +
                        "- **Auth**: 인증 관련 API\n" +
                        "- **Ingredients**: 재료 관리 API (인증 불필요)\n" +
                        "- **Recipes**: 레시피 관리 API (인증 불필요)\n" +
                        "- **User Ingredients**: 사용자 보유 재료 관리 API (인증 필요)\n")
                .version("v1.0.0")
                .contact(new Contact()
                        .name("Team LJCO")
                        .email("team-ljco@example.com")
                        .url("https://github.com/team-ljco"))
                .license(new License()
                        .name("MIT License")
                        .url("https://opensource.org/licenses/MIT"));
    }
}