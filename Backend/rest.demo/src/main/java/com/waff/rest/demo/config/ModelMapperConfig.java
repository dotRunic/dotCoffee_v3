package com.waff.rest.demo.config;

import com.waff.rest.demo.model.Category;
import com.waff.rest.demo.dto.CategoryDto;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
