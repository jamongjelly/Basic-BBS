import { authorizationHeader, userClient } from 'src/lib/api/client';
import { Todo } from 'src/models';

export async function addTodo(text: string) {
    const response = await userClient.post('/todos', { text }, authorizationHeader());
    return response.data;
}

export async function updateTodo(todoRequest: Todo) {
    await userClient.put(`/todos/${todoRequest.id}`, todoRequest, authorizationHeader());
    return todoRequest;
}

export async function removeTodo(todoId: number) {
    await userClient.delete(`/todos/${todoId}`, authorizationHeader());
    return todoId;
}

export async function getTodos() {
    const response = await userClient.get<Todo[]>('/todos', authorizationHeader());
    return response.data;
}
