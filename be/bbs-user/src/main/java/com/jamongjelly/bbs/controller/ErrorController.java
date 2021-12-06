package com.jamongjelly.bbs.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/errors")
public class ErrorController {

    @GetMapping("/entrypoint")
    public void entrypoint() {
        System.out.println("오류 : Entrypoint 진입");
    }

}
