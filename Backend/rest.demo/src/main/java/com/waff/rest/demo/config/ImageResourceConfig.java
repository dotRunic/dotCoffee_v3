package com.waff.rest.demo.config;

import com.waff.rest.demo.service.StorageService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;


@Configuration
public class ImageResourceConfig implements WebMvcConfigurer {

    public final StorageConfig storageConfig;

    public ImageResourceConfig(StorageConfig storageConfig) {
        this.storageConfig = storageConfig;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(storageConfig.getLocationPathPattern())
                .addResourceLocations(storageConfig.getResourceLocation());
    }
}
