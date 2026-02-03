package com.korit.team_ljco.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${user.dir}")
    private String projectPath;

    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        final String uploadPath = projectPath + "/uploads/images/";
        registry.addResourceHandler("/images/**")                //외부에서 localhost:8080/image/** 의 요청이 들어오면
                .addResourceLocations("file:///" + uploadPath)  //스프링 부트 서버 PC의 프로젝트 폴더 안의 upload폴더로
                .resourceChain(true)                            //연결
                .addResolver(new PathResourceResolver() {       //요청 URL에 한글이 들어있을 수 있으니 한글 디코딩
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        resourcePath = URLDecoder.decode(resourcePath, StandardCharsets.UTF_8);
                        return super.getResource(resourcePath, location);
                    }
                });
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = allowedOrigins.toArray(new String[0]);

        registry.addMapping("/api/**")
                .allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/images/**")
                .allowedOrigins(origins)
                .allowedMethods("GET")
                .allowedHeaders("*");
    }
}



