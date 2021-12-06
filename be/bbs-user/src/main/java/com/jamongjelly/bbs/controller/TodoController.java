package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.dto.request.TodoRequest;
import com.jamongjelly.bbs.dto.response.TodoResponse;
import com.jamongjelly.bbs.security.CurrentUser;
import com.jamongjelly.bbs.security.UserPrincipal;
import com.jamongjelly.bbs.service.todo.TodoService;
import com.jamongjelly.bbs.util.HttpUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(WebConst.TODOS)
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<TodoResponse>> getCurrentUserTodos(@CurrentUser UserPrincipal currentUser) {
        List<TodoResponse> todos = todoService.getTodosByUserId(currentUser.getUserId());
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TodoResponse> addTodo(@RequestBody @Valid TodoRequest request) {
        TodoResponse response = todoService.addTodo(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{todoId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TodoResponse> updateTodo(@PathVariable Long todoId, @RequestBody @Valid TodoRequest request) {
        TodoResponse response = todoService.updateTodo(todoId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{todoId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> removeTodo(@PathVariable Long todoId) {
        boolean result = todoService.removeTodo(todoId);
        return HttpUtils.stringResponse(result, "할 일 삭제 성공", "할 일 삭제 실패");
    }

}
