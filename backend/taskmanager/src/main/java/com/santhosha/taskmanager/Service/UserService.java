// package com.santhosha.taskmanager.service;

// import com.santhosha.taskmanager.entity.User;
// import com.santhosha.taskmanager.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     public User registerUser(User user) {
//         return userRepository.save(user);
//     }
// }
package com.santhosha.taskmanager.service;

import com.santhosha.taskmanager.entity.User;
import com.santhosha.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return userRepository.save(user);
    }
    public User loginUser(String email, String password) {


        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}