package com.example.TodoApp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/todoapp")
@CrossOrigin(origins="http://localhost:5173/")

public class TodoappController {
	
	@Autowired
	private TodoappService service;
	
	@GetMapping
	public List<Todoapp> getAllTasks(){
		return service.getAllTasks();
		}
	
	@GetMapping("/{id}")
		public Todoapp getTaskById(@PathVariable int id) {
			return service.getTaskById(id);
		}
	
	@DeleteMapping("/{id}")
	 public String deleteTask(@PathVariable int id) {
		service.deleteTask(id);
		return "Deleted Sucessfully";
		
	}
	
	@PostMapping
		public Todoapp createTask(@RequestBody Todoapp Task) {
		return service.saveTask(Task);
	}
	
	@PutMapping("/{id}")
	public Todoapp updateTask(@PathVariable int id, @RequestBody Todoapp TaskDetails) {
		
		return service.upadateTask(id, TaskDetails);
	}
	
	
	

}
