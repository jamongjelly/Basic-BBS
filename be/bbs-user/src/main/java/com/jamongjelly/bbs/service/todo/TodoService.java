package com.jamongjelly.bbs.service.todo;

import com.jamongjelly.bbs.dto.request.TodoRequest;
import com.jamongjelly.bbs.dto.response.TodoResponse;
import com.jamongjelly.bbs.domain.todo.Todo;
import com.jamongjelly.bbs.domain.todo.TodoRepository;
import com.jamongjelly.bbs.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<TodoResponse> getTodosByUserId(Long userId) {
        return todoRepository.findByUserIdIn(userId)
                .stream().map(TodoResponse::of).collect(Collectors.toList());
    }

    public TodoResponse addTodo(TodoRequest request) {
        Todo todo = request.toEntity();
        return TodoResponse.of(todoRepository.save(todo));
    }

    @Transactional
    public TodoResponse updateTodo(Long todoId, TodoRequest request) {
        return todoRepository.findById(todoId)
                .map(todo -> {
                    todo.update(request.getDone(), request.getText());
                    return TodoResponse.of(todo);
                }).orElseThrow(() -> new BadRequestException("할 일 수정 실패"));
    }

    @Transactional
    public boolean removeTodo(Long todoId) {
        return todoRepository.findById(todoId)
                .map(todo -> {
                    todoRepository.delete(todo);
                    return true;
                }).orElseGet(() -> false);
    }

}
