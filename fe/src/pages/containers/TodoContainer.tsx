import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoComponent from 'src/components/todo/TodoComponent';
import { User } from 'src/models';
import { RootState } from 'src/redux';
import { todoActions } from 'src/redux/modules/todo';

const todos2 = [
    {
        id: 1,
        done: false,
        text: '저녁 장보기',
    },
    {
        id: 2,
        done: true,
        text: '세탁소에 패딩 맡기기',
    },
    {
        id: 3,
        done: false,
        text: '닭 가슴살 샐러드 만들기',
    },
];

const user: User = {
    id: 1,
    email: 'user@gmail.com',
    nickname: 'Kim Chaewon',
    imgUrl: 'https://pbs.twimg.com/profile_images/1229593632627249152/Kc7s3DUx.jpg',
};

const TodoContainer = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const onAddTodo = useCallback((text: string) => {
        dispatch(todoActions.addTodoAsync.request(text));
    }, []);

    if (!currentUser) return <div>로딩 중</div>;

    return <TodoComponent width={60} user={currentUser} onAddTodo={onAddTodo} />;
};

export default TodoContainer;
