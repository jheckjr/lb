package com.lb;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INoteRepository extends CrudRepository<Note, Long> {

	public List<Note> findByBodyLikeIgnoreCase(String searchTerm);
}
