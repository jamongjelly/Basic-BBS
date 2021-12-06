import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import auth, { authSaga, AuthState } from 'src/redux/modules/auth';
import board, { boardSaga, BoardState } from 'src/redux/modules/board';
import user, { userSaga, UserState } from 'src/redux/modules/user';
import post, { postSaga, PostState } from 'src/redux/modules/post';
import reply, { replySaga, ReplyState } from 'src/redux/modules/reply';
import todo, { todoSaga, TodoState } from 'src/redux/modules/todo';
import core, { CoreState } from 'src/redux/modules/core';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

const rootReducer = (history: History) =>
    combineReducers({
        auth,
        user,
        board,
        post,
        reply,
        todo,
        core,
        router: connectRouter<any>(history),
    });

export default rootReducer;

export type RootState = {
    auth: AuthState;
    board: BoardState;
    user: UserState;
    post: PostState;
    reply: ReplyState;
    todo: TodoState;
    core: CoreState;
    router: RouterState;
};

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
        fork(boardSaga),
        fork(postSaga),
        fork(replySaga),
        fork(todoSaga),
    ]);
}
