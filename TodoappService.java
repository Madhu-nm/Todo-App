package com.example.TodoApp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TodoappService {
	
	@Autowired
	private TodoappRepository repository;
	
	public List<Todoapp> getAllTasks(){
		return repository.findAll();
	}
	public Todoapp getTaskById(int id) {
        return repository.findById(id).orElse(null);
    }
	
	public void deleteTask(int id) {
		repository.deleteById(id);
	}
	
	public Todoapp saveTask(Todoapp todoapp) {
		return repository.save(todoapp);
	}
	
	public Todoapp upadateTask(int id, Todoapp Taskdetails) {
		Todoapp Task=repository.findById(id).orElse(null);
		if(Task !=null) {
			Task.setTaskname(Taskdetails.getTaskname());
			Task.setDescription(Taskdetails.getDescription());
			Task.setCategory(Taskdetails.getCategory());
			return repository.save(Task);
		}
		return null;
	}
}
