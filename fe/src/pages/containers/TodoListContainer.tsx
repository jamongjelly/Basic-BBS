import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from 'src/components/todo/TodoList';
import { Todo } from 'src/models';
import { RootState } from 'src/redux';
import { todoActions } from 'src/redux/modules/todo';

const TodoListContainer = () => {
    const dispatch = useDispatch();
    const { currentUser, todos } = useSelector((state: RootState) => ({
        currentUser: state.user.currentUser,
        todos: state.todo.todos,
    }));

    const onClickUpdate = useCallback((todoRequest: Todo) => {
        dispatch(todoActions.updateTodoAsync.request(todoRequest));
    }, []);

    const onClickDelete = useCallback((todoId: number) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            dispatch(todoActions.removeTodoAsync.request(todoId));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            dispatch(todoActions.getTodosAsync.request());
        }
    }, [currentUser]);

    if (!todos) return <div>로딩 중</div>;

    const todoList = todos.filter((todo) => !todo.done);
    const doneList = todos.filter((todo) => todo.done);
    return (
        <>
            <TodoList
                title="todos"
                todos={todoList}
                onClickUpdate={onClickUpdate}
                onClickDelete={onClickDelete}
            />
            <TodoList
                title="dones"
                todos={doneList}
                onClickUpdate={onClickUpdate}
                onClickDelete={onClickDelete}
            />
        </>
    );
};

export default TodoListContainer;
