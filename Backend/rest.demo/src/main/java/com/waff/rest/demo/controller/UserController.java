package com.waff.rest.demo.controller;

import java.util.List;

import com.waff.rest.demo.dto.UserDto;
import com.waff.rest.demo.model.UserType;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.waff.rest.demo.model.User;
import com.waff.rest.demo.service.UserService;

import static com.waff.rest.demo.model.UserType.admin;

@RestController
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/admin/user")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }


    @PostMapping("/user")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDto userDto) {
        var user = modelMapper.map(userDto, User.class);
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(admin.name());
        // for security reason normal user can't change any user to admin user
        if(user.getUserType() == admin && !isAdmin) {
            user.setUserType(UserType.user);
        }
        var created = userService.createUser(user).orElse(null);
        if(created != null) {
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        var user = userService.getUserById(id).orElse(null);
        if(user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserDto userDto) {
        var user = modelMapper.map(userDto, User.class);
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(admin.name());
        // for security reason normal user can't change any user to admin user
        if(user.getUserType() == admin && !isAdmin) {
            user.setUserType(UserType.user);
        }
        var updated = userService.updateUser(user).orElse(null);
        if(updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/admin/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if(userService.deleteUserById(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/admin/user/user_type/{userType}")
    public ResponseEntity<List<User>> findUsersByType(@PathVariable UserType userType) {
        return ResponseEntity.ok(userService.getUserByUserType(userType));
    }
}
