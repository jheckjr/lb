package com.lb;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoteNotFoundException extends RuntimeException {
	
	public NoteNotFoundException(String noteId) {
		super("Could not find note " + noteId + ".");
	}
}
