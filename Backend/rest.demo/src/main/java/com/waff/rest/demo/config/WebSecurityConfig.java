package com.waff.rest.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

import static com.waff.rest.demo.controller.UserController.*;
import static com.waff.rest.demo.model.UserType.*;

@Configuration
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig {

    private static final String[] SWAGGER_WHITELIST = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

    private static final String[] ADMIN_WHITELIST = {
            "/user/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

    private static final String[] ANONYMOUS_WHITELIST = {
            "/register",
            "/login",
            "/logout"
    };


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, DaoAuthenticationProvider daoAuthenticationProvider, StorageConfig storageConfig) throws Exception {

        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");

        http.csrf().disable();
        // https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/dao-authentication-provider.html
        // authenticationProvider
        http.authenticationProvider(daoAuthenticationProvider);
        // basic authentication
        http.httpBasic();
        // session management
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(1);
        // form login
        http.formLogin().disable();
                //.defaultSuccessUrl("/swagger-ui/index.html");

        // config access with authorities
        http.authorizeHttpRequests()
                .requestMatchers(SWAGGER_WHITELIST).hasAnyAuthority(admin.name(), user.name())
                .requestMatchers(Arrays.stream(ANONYMOUS_WHITELIST)
                        .map(AntPathRequestMatcher::antMatcher)
                        .toArray(RequestMatcher[]::new)).permitAll()
                .requestMatchers( "/admin/**").hasAnyAuthority(admin.name())
                .requestMatchers(storageConfig.getLocationPathPattern()).permitAll()
                .requestMatchers(HttpMethod.POST, "/user").permitAll()
                .requestMatchers(HttpMethod.GET, "/product/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/product/search/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/category/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated();

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(UserDetailsService userDetailsService, UserDetailsPasswordService userDetailsPasswordService){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setUserDetailsPasswordService(userDetailsPasswordService);
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

}
