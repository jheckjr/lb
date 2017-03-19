package com.lb;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadInputException extends RuntimeException {

	public BadInputException(String msg) {
		super("Could not create a note with requested data: " + msg + ".");
	}
}
