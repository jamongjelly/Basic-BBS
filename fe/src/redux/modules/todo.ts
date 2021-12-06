import * as todoAPI from 'src/lib/api/todoAPI';
import { AxiosError } from 'axios';
import { ToastResponse, Todo } from 'src/models';
import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import createAsyncSaga from 'src/lib/createAsyncSaga';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

// Action Types
const ADD_TODO = {
    REQUEST: 'todo/ADD_TODO_REQUEST',
    SUCCESS: 'todo/ADD_TODO_SUCCESS',
    FAILURE: 'todo/ADD_TODO_FAILURE',
} as const;
const UPDATE_TODO = {
    REQUEST: 'todo/UPDATE_TODO_REQUEST',
    SUCCESS: 'todo/UPDATE_TODO_SUCCESS',
    FAILURE: 'todo/UPDATE_TODO_FAILURE',
} as const;
const REMOVE_TODO = {
    REQUEST: 'todo/REMOVE_TODO_REQUEST',
    SUCCESS: 'todo/REMOVE_TODO_SUCCESS',
    FAILURE: 'todo/REMOVE_TODO_FAILURE',
} as const;
const GET_TODOS = {
    REQUEST: 'todo/GET_TODOS_REQUEST',
    SUCCESS: 'todo/GET_TODOS_SUCCESS',
    FAILURE: 'todo/GET_TODOS_FAILURE',
} as const;

// Payload & Response Types

// Action Creators
const addTodoAsync = createAsyncAction(
    ADD_TODO.REQUEST,
    ADD_TODO.SUCCESS,
    ADD_TODO.FAILURE
)<string, Todo, AxiosError>();
const updateTodoAsync = createAsyncAction(
    UPDATE_TODO.REQUEST,
    UPDATE_TODO.SUCCESS,
    UPDATE_TODO.FAILURE
)<Todo, Todo, AxiosError>();
const removeTodoAsync = createAsyncAction(
    REMOVE_TODO.REQUEST,
    REMOVE_TODO.SUCCESS,
    REMOVE_TODO.FAILURE
)<number, number, AxiosError>();
const getTodosAsync = createAsyncAction(
    GET_TODOS.REQUEST,
    GET_TODOS.SUCCESS,
    GET_TODOS.FAILURE
)<void, Todo[], AxiosError>();

export const todoActions = {
    addTodoAsync,
    updateTodoAsync,
    removeTodoAsync,
    getTodosAsync,
};

// Redux-Saga
const addTodo$ = createAsyncSaga(addTodoAsync, todoAPI.addTodo);
const updateTodo$ = createAsyncSaga(updateTodoAsync, todoAPI.updateTodo);
const removeTodo$ = createAsyncSaga(removeTodoAsync, todoAPI.removeTodo);
const getTodos$ = createAsyncSaga(getTodosAsync, todoAPI.getTodos);

export function* todoSaga() {
    yield takeLatest(ADD_TODO.REQUEST, addTodo$);
    yield takeLatest(UPDATE_TODO.REQUEST, updateTodo$);
    yield takeLatest(REMOVE_TODO.REQUEST, removeTodo$);
    yield takeLatest(GET_TODOS.REQUEST, getTodos$);
}

// State & Actions Types
export type TodoState = {
    todos: Todo[] | null;
};

export type TodoActions = ActionType<typeof todoActions>;

// Initial State
const initState: TodoState = {
    todos: null,
};

// Reducer
const todo = createReducer<TodoState, TodoActions>(initState, {
    [ADD_TODO.SUCCESS]: (state, { payload: newTodo }) => {
        return produce(state, (draft) => {
            if (!draft.todos) {
                draft.todos = [newTodo];
            } else {
                draft.todos.push(newTodo);
            }
        });
    },
    [UPDATE_TODO.SUCCESS]: (state, { payload: modifiedTodo }) => {
        return produce(state, (draft) => {
            if (!draft.todos) return;
            const todoIdx = draft.todos.findIndex((item) => item.id === modifiedTodo.id);
            draft.todos[todoIdx] = modifiedTodo;
        });
    },
    [REMOVE_TODO.SUCCESS]: (state, { payload: id }) => {
        return produce(state, (draft) => {
            if (!draft.todos) return;
            const todoIdx = draft.todos.findIndex((item) => item.id === id);
            draft.todos.splice(todoIdx, 1);
        });
    },
    [GET_TODOS.SUCCESS]: (state, { payload: todos }) => {
        return produce(state, (draft) => {
            draft.todos = todos;
        });
    },
});

export default todo;
