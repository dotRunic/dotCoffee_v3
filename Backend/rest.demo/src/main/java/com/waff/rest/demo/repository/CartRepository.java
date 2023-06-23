package com.waff.rest.demo.repository;

import com.waff.rest.demo.model.Cart;
import com.waff.rest.demo.model.Category;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, String> {
    Optional<Cart> findByUser_Id(@NotBlank String userId);
}
