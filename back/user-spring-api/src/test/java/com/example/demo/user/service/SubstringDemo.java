package com.example.demo.user.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;


import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class SubstringDemo {
    @Test
    public void 문자열_분할() throws Exception {
        var str = "a,b,c";
        str = new StringBuilder(str).append(",d,e,f").toString();

        System.out.println(str);
        var arr = str.split(",");

        assertThat(arr.length).isEqualTo(6);
    }

    @Test
    public void 주민번호로_성별_구분() throws Exception {
        var human1 = "970301-1";
        var human2 = "950101-2";
        var human3 = "020101-3";
        var human4 = "020101-4";
        var human5 = "050101-5";

        var str = new ArrayList<>(Arrays.asList(human1, human2, human3, human4, human5));

        for (String human : str) {
            System.out.println("human" + (str.indexOf(human) + 1) + " - " + "나이: " + birthAge(human) + ", 성별: " + getGender(human));
        }

    }

    private Integer birthAge(String ssn) {
        return Stream.of(ssn)
                .mapToInt(str -> (switch (str.charAt(7)) {
                    case '1', '2', '5', '6' -> 1900 + Integer.parseInt(ssn.substring(0, 2));
                    case '0', '9' -> 1800 + Integer.parseInt(ssn.substring(0, 2));
                    case '3', '4', '7', '8' -> 2000 + Integer.parseInt(ssn.substring(0, 2));
                    default -> 0;
                }))
                .map(i -> i * 10000) // 19920000
                .map(i -> i + Integer.parseInt(ssn.substring(2, 6))) // 19920425
                .map(i -> (Integer.parseInt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"))) - i)/10000) // 31
                .findFirst()
                .getAsInt();
    }

    private String getGender(String ssn) {
        return switch (ssn.charAt(7)) {
            case '0', '2', '4' -> "NW";
            case '1', '3', '9' -> "NM";
            case '5', '7' -> "FM";
            case '6', '8' -> "FW";
            default -> "E";
        };
    }
}
