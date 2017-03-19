package com.lb;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Note {
	
	@Id
	@GeneratedValue
	private long id;
	private String body;
	
	public Note() {
		this.body = "";
	}
	
	public Note(String body) {
		this.body = body;
	}
	
	public long getId() {
		return id;
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
}
