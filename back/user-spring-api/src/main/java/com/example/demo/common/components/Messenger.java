package com.example.demo.common.components;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Messenger {
    private String message;
    private int status;
    private String token;
}
