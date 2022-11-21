package com.techelevator.controller.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(EndpointException.class)
    public ResponseEntity handleException(EndpointException e) {
        // log exception
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}