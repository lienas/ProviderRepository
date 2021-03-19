package com.osde.prepo.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import java.util.List;
import java.util.stream.Collectors;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    @ExceptionHandler(ValidationException.class)
    protected ResponseEntity<List<String>> handleTransactionException(ValidationException ex) {

        if(!(ex instanceof ConstraintViolationException)) throw ex;

        ConstraintViolationException validationException = (ConstraintViolationException) ex;

        List<String> message = validationException.getConstraintViolations().stream()
                .map(ConstraintViolation::getMessage).collect(Collectors.toList());

        return  new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
