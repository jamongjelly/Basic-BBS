import * as authAPI from 'src/lib/api/authAPI';
import produce from 'immer';
import { JoinForm, LoginForm, UserSummary } from 'src/models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions } from 'src/redux/modules/user';
import {
    ActionType,
    createAction,
    createAsyncAction,
    createReducer,
} from 'typesafe-actions';
import createAsyncSaga, { createRouteAsyncSaga } from 'src/lib/createAsyncSaga';
import { AxiosError } from 'axios';
import { ACCESS_TOKEN, REDIRECT_URL } from 'src/constants';
import { push } from 'connected-react-router';

// Action Types
const SHOW_AUTH_MODAL = 'core/SHOW_AUTH_MODAL';
const CHANGE_AUTH_MODAL_MODE = 'core/CHANGE_AUTH_MODAL_MODE';
const CLOSE_AUTH_MODAL = 'core/CLOSE_AUTH_MODAL';
const JOIN = {
    REQUEST: 'auth/JOIN_REQUEST',
    SUCCESS: 'auth/JOIN_SUCCESS',
    FAILURE: 'auth/JOIN_FAILURE',
} as const;
const LOGIN = {
    REQUEST: 'auth/LOGIN_REQUEST',
    SUCCESS: 'auth/LOGIN_SUCCESS',
    FAILURE: 'auth/LOGIN_FAILURE',
} as const;
const UNREGISTER = {
    REQUEST: 'auth/UNREGISTER_REQUEST',
    SUCCESS: 'auth/UNREGISTER_SUCCESS',
    FAILURE: 'auth/UNREGISTER_FAILURE',
} as const;

// Payload Types
export type AuthMode = 'JOIN' | 'LOGIN';
export interface UnregisterPayload {
    password: string;
}

// Response Types
export interface JoinResponse {
    accessToken: string;
    userSummary: UserSummary;
}
export interface LoginResponse {
    accessToken: string;
    userSummary: UserSummary;
}
export interface UnregisterResponse {
    name: string;
}

// Action Creators
const showAuthModal = createAction(SHOW_AUTH_MODAL)<string | void>();
const changeAuthModalMode = createAction(CHANGE_AUTH_MODAL_MODE)();
const closeAuthModal = createAction(CLOSE_AUTH_MODAL)();
const joinAsync = createAsyncAction(JOIN.REQUEST, JOIN.SUCCESS, JOIN.FAILURE)<
    JoinForm,
    JoinResponse,
    AxiosError
>();
const loginAsync = createAsyncAction(LOGIN.REQUEST, LOGIN.SUCCESS, LOGIN.FAILURE)<
    LoginForm,
    LoginResponse,
    AxiosError
>();
const unregisterAsync = createAsyncAction(
    UNREGISTER.REQUEST,
    UNREGISTER.SUCCESS,
    UNREGISTER.FAILURE
)<UnregisterPayload, string, AxiosError>();

export const authActions = {
    showAuthModal,
    changeAuthModalMode,
    closeAuthModal,
    joinAsync,
    loginAsync,
    unregisterAsync,
};

// Redux-Saga
function* join$(action: ReturnType<typeof joinAsync.request>) {
    try {
        const response: JoinResponse = yield call(authAPI.join, action.payload);
        yield put(joinAsync.success(response));
        yield put(userActions.setCurrentUser(response.userSummary));
        yield put(push(localStorage.getItem(REDIRECT_URL) || '/'));
        yield localStorage.removeItem(REDIRECT_URL);
    } catch (e) {
        console.log(e);
    }
}
function* login$(action: ReturnType<typeof loginAsync.request>) {
    try {
        const response: LoginResponse = yield call(authAPI.login, action.payload);
        yield put(loginAsync.success(response));
        yield put(userActions.setCurrentUser(response.userSummary));
        yield put(push(localStorage.getItem(REDIRECT_URL) || '/'));
        yield localStorage.removeItem(REDIRECT_URL);
    } catch (e) {
        console.log(e);
    }
}
const unregister$ = createRouteAsyncSaga(
    unregisterAsync,
    authAPI.unregister,
    'PUSH',
    () => put(userActions.initCurrentUser())
);

export function* authSaga() {
    yield takeLatest(JOIN.REQUEST, join$);
    yield takeLatest(LOGIN.REQUEST, login$);
    yield takeLatest(UNREGISTER.REQUEST, unregister$);
}

// State & Actions Types
export type AuthState = {
    authModal: {
        visible: boolean;
        mode: AuthMode;
    };
};

export type AuthActions = ActionType<typeof authActions>;

// Initial State
const initState: AuthState = {
    authModal: {
        visible: false,
        mode: 'LOGIN',
    },
};

// Reducer
const auth = createReducer<AuthState, AuthActions>(initState, {
    [SHOW_AUTH_MODAL]: (state, { payload: from }) => {
        if (from) {
            localStorage.setItem(REDIRECT_URL, from);
        }
        return produce(state, (draft) => {
            draft.authModal.visible = true;
        });
    },
    [CHANGE_AUTH_MODAL_MODE]: (state) => {
        return produce(state, (draft) => {
            draft.authModal.mode = draft.authModal.mode === 'LOGIN' ? 'JOIN' : 'LOGIN';
        });
    },
    [CLOSE_AUTH_MODAL]: (state) => {
        return produce(state, (draft) => {
            draft.authModal.visible = false;
            draft.authModal.mode = 'LOGIN';
        });
    },
    [JOIN.SUCCESS]: (state, { payload }) => {
        localStorage.setItem(ACCESS_TOKEN, payload.accessToken);
        return produce(state, (draft) => {
            draft.authModal.visible = false;
            draft.authModal.mode = 'LOGIN';
        });
    },
    [LOGIN.SUCCESS]: (state, { payload }) => {
        localStorage.setItem(ACCESS_TOKEN, payload.accessToken);
        return produce(state, (draft) => {
            draft.authModal.visible = false;
        });
    },
    [UNREGISTER.SUCCESS]: (state) => {
        localStorage.removeItem(ACCESS_TOKEN);
        return state;
    },
});

export default auth;
