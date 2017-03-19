package com.lb;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
public class NoteController {
	
	@Autowired
	private INoteRepository noteRepository;
	
	/* 
	 * 
	 */
	/**
	 * GET /api/notes return list of note obj
	 * GET /api/notes?query={word} return list of note obj with {word}
	 * @param searchTerm a term matching text in note bodies
	 * @return a List of Notes
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/notes")
	public ResponseEntity<List<Note>> getNotes(@RequestParam(name="query", required=false) String searchTerm) {
		List<Note> notes = null;
		
		if (searchTerm == null || searchTerm == "") {
			notes = (List<Note>) noteRepository.findAll();
		} else {
			notes = noteRepository.findByBodyLikeIgnoreCase("%"+searchTerm+"%");
		}
		
		return new ResponseEntity<List<Note>>(notes, HttpStatus.OK);
	}
	
	/**
	 * POST /api/notes BODY "a note" return a note obj
	 * @param note text to put in a note
	 * @return a new Note obj
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/notes")
	public ResponseEntity<Note> addNote(@RequestBody String input) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			ObjectNode node = mapper.readValue(input, ObjectNode.class);
			Note savedNote;
			
			if (node.get("body") != null) {
				savedNote = noteRepository.save(new Note(node.get("body").textValue()));
				return new ResponseEntity<Note>(savedNote, HttpStatus.OK);
			} else {
				throw new BadInputException(input);
			}
		} catch (IOException e) {
			throw new BadInputException(e.getMessage());
		}
	}
	
	/**
	 * GET /api/notes/{id} return a note obj
	 * @param noteId
	 * @return the note object with id noteId or a 404 error
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/notes/{noteId}")
	public ResponseEntity<Note> getNote(@PathVariable Long noteId) {
		validateNote(noteId);
		return new ResponseEntity<Note>(noteRepository.findOne(noteId), HttpStatus.OK);
	}
	
	/**
	 * Check that a note with id noteId is in the repository
	 * @param noteId
	 */
	private void validateNote(Long noteId) {
		if (noteRepository.findOne(noteId) == null) {
			throw new NoteNotFoundException(noteId.toString());
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/notes/*")
	public ResponseEntity<String> redirectInvalidPost() {
		return new ResponseEntity<String>("See api/", HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/notes/{id}/*")
	public ResponseEntity<String> redirectInvalidGet() {
		return new ResponseEntity<String>("See api/", HttpStatus.NOT_FOUND);
	}
}
