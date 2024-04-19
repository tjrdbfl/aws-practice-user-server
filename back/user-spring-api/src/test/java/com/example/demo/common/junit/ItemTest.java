package com.example.demo.common.junit;

import com.example.demo.common.junit.Item;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Assertions;

import static org.hamcrest.MatcherAssert.assertThat;

public class ItemTest {

    @Test
    void print() {
        Item s=new Item();
        String s3=s.print();
        System.out.println("--->"+s3);
        String s2="Hello";
        Assertions.assertEquals(s.print(),"Hello");
    }

    @Test
    void add() {
    }
}