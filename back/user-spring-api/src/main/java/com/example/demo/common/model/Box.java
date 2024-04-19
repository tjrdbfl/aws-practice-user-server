package com.example.demo.common.model;


import java.util.*;

public class Box<T>{
    private Map<String, T> box;

    public Box() {
        this.box = new HashMap<>();
    }
    public void put(List<String> keys, Inventory<T> values){
        box = new HashMap<>();

        for(int i =0; i<keys.size();i++) {
            box.put(keys.get(i), values.get(i));
        }
        box.forEach((k,v)->{
            System.out.println(String.format("%s : %s",k,v));
        });
    }
    public T put(String k, T t) {
        return box.put(k,t);
    }
    public T get(String k) {
        return box.get(k);
    }
    public int size() {
        return box.size();
    }
    public void clear() {
        box.clear();
    }


}