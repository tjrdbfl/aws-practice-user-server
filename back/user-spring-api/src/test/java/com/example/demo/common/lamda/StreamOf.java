package com.example.demo.common.lamda;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamOf {
    @Test
    public void testSame(){
        int arr[]={1,2,3,4,5};

        System.out.println("Arrays.stream(arr)");
        IntStream intStream= Arrays.stream(arr);
        intStream.forEach(str-> System.out.print(str+" "));

        System.out.println();
        System.out.println("Stream.of(arr)");
        Stream<int[]> stream=Stream.of(arr);
        stream.forEach(str-> System.out.print(str+" "));

//        Arrays.stream(arr)
//        1 2 3 4 5
//        Stream.of(arr)
//                [I@233fe9b6
//        Process finished with exit code 0

    }

    @Test
    public void testDifferent(){
        int arr[]={1,2,3,4,5};

        System.out.println("Arrays.stream(arr)");
        IntStream intStream= Arrays.stream(arr);
        intStream.forEach(str-> System.out.print(str+" "));

        System.out.println();
        System.out.println("Stream.of(arr)");
        Stream<int[]> stream=Stream.of(arr);
        IntStream intStreamNew=stream.flatMapToInt(Arrays::stream);
        //intStreamNew.forEach(str-> System.out.print(str+" "));

    }
}
