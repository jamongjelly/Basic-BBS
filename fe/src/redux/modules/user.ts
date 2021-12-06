import * as userAPI from 'src/lib/api/userAPI';
import * as postAPI from 'src/lib/api/postAPI';
import * as replyAPI from 'src/lib/api/replyAPI';
import { AxiosError } from 'axios';
import produce from 'immer';
import { Pagination, PostItem, ToastResponse, UserReply, UserSummary } from 'src/models';
import {
    ActionType,
    createAction,
    createAsyncAction,
    createReducer,
} from 'typesafe-actions';
import createAsyncSaga from 'src/lib/createAsyncSaga';
import { takeLatest } from 'redux-saga/effects';
import { ACCESS_TOKEN } from 'src/constants';

// Action Types
const INIT_CURRENT_USER = 'user/INIT_CURRENT_USER';
const SET_CURRENT_USER = 'user/SET_CURRENT_USER';
const SET_CURRENT_USER_PROFILE_IMG = 'user/SET_CURRENT_USER_PROFILE_IMG';
const INIT_USER_INFO = 'user/INIT_USER_INFO';
const INIT_USER_INFO_PAGE_NUM = 'user/INIT_USER_INFO_PAGE_NUM';
const SET_USER_INFO_PAGE_NUM = 'user/SET_USER_INFO_PAGE_NUM';
const LOGOUT = 'auth/LOGOUT';
const LOAD_CURRENT_USER = {
    REQUEST: 'user/LOAD_CURRENT_USER_REQUEST',
    SUCCESS: 'user/LOAD_CURRENT_USER_SUCCESS',
    FAILURE: 'user/LOAD_CURRENT_USER_FAILURE',
} as const;
const CHANGE_USER_NICKNAME = {
    REQUEST: 'user/CHANGE_USER_NICKNAME_REQUEST',
    SUCCESS: 'user/CHANGE_USER_NICKNAME_SUCCESS',
    FAILURE: 'user/CHANGE_USER_NICKNAME_FAILURE',
} as const;
const CHANGE_USER_PROFILE_MSG = {
    REQUEST: 'user/CHANGE_USER_PROFILE_MSG_REQUEST',
    SUCCESS: 'user/CHANGE_USER_PROFILE_MSG_SUCCESS',
    FAILURE: 'user/CHANGE_USER_PROFILE_MSG_FAILURE',
} as const;
const CHANGE_PROFILE_IMG = {
    REQUEST: 'user/CHANGE_PROFILE_IMG_REQUEST',
    SUCCESS: 'user/CHANGE_PROFILE_IMG_SUCCESS',
    FAILURE: 'user/CHANGE_PROFILE_IMG_FAILURE',
} as const;
const FETCH_MY_POSTS = {
    REQUEST: 'user/FETCH_MY_POSTS_REQUEST',
    SUCCESS: 'user/FETCH_MY_POSTS_SUCCESS',
    FAILURE: 'user/FETCH_MY_POSTS_FAILURE',
} as const;
const FETCH_MY_FAVORITE_POSTS = {
    REQUEST: 'user/FETCH_MY_FAVORITE_POSTS_REQUEST',
    SUCCESS: 'user/FETCH_MY_FAVORITE_POSTS_SUCCESS',
    FAILURE: 'user/FETCH_MY_FAVORITE_POSTS_FAILURE',
} as const;
const FETCH_MY_REPLIES = {
    REQUEST: 'user/FETCH_MY_REPLIES_REQUEST',
    SUCCESS: 'user/FETCH_MY_REPLIES_SUCCESS',
    FAILURE: 'user/FETCH_MY_REPLIES_FAILURE',
} as const;

// Payload & Response Types
export interface UserAvatarPayload {
    formData: FormData;
}
export interface ChangeUserProfileResponse {
    nickname: string;
    profileMsg: string;
}
export interface PostItemResponse extends Pagination {
    body: PostItem[];
}
export interface ReplyItemResponse extends Pagination {
    body: UserReply[];
}

// Action Creator Types
const initCurrentUser = createAction(INIT_CURRENT_USER)();
const setCurrentUser = createAction(SET_CURRENT_USER)<UserSummary>();
const setCurrentUserProfileImg = createAction(SET_CURRENT_USER_PROFILE_IMG)<
    string | ArrayBuffer
>();
const initUserInfo = createAction(INIT_USER_INFO)();
const initUserInfoPageNum = createAction(INIT_USER_INFO_PAGE_NUM)();
const setUserInfoPageNum = createAction(SET_USER_INFO_PAGE_NUM)<number>();
const logout = createAction(LOGOUT)();
const loadCurrentUserAsync = createAsyncAction(
    LOAD_CURRENT_USER.REQUEST,
    LOAD_CURRENT_USER.SUCCESS,
    LOAD_CURRENT_USER.FAILURE
)<void, UserSummary, AxiosError>();
const changeUserNicknameAsync = createAsyncAction(
    CHANGE_USER_NICKNAME.REQUEST,
    CHANGE_USER_NICKNAME.SUCCESS,
    CHANGE_USER_NICKNAME.FAILURE
)<string, string, AxiosError>();
const changeUserProfileMsgAsync = createAsyncAction(
    CHANGE_USER_PROFILE_MSG.REQUEST,
    CHANGE_USER_PROFILE_MSG.SUCCESS,
    CHANGE_USER_PROFILE_MSG.FAILURE
)<string, string, AxiosError>();
const changeProfileImgAsync = createAsyncAction(
    CHANGE_PROFILE_IMG.REQUEST,
    CHANGE_PROFILE_IMG.SUCCESS,
    CHANGE_PROFILE_IMG.FAILURE
)<UserAvatarPayload, string, AxiosError>();
const fetchMyPostsAsync = createAsyncAction(
    FETCH_MY_POSTS.REQUEST,
    FETCH_MY_POSTS.SUCCESS,
    FETCH_MY_POSTS.FAILURE
)<number, PostItemResponse, AxiosError>();
const fetchMyFavoritePostsAsync = createAsyncAction(
    FETCH_MY_FAVORITE_POSTS.REQUEST,
    FETCH_MY_FAVORITE_POSTS.SUCCESS,
    FETCH_MY_FAVORITE_POSTS.FAILURE
)<number, PostItemResponse, AxiosError>();
const fetchMyRepliesAsync = createAsyncAction(
    FETCH_MY_REPLIES.REQUEST,
    FETCH_MY_REPLIES.SUCCESS,
    FETCH_MY_REPLIES.FAILURE
)<number, ReplyItemResponse, AxiosError>();

export const userActions = {
    initCurrentUser,
    setCurrentUser,
    setCurrentUserProfileImg,
    initUserInfo,
    initUserInfoPageNum,
    setUserInfoPageNum,
    logout,
    loadCurrentUserAsync,
    changeUserNicknameAsync,
    changeUserProfileMsgAsync,
    changeProfileImgAsync,
    fetchMyPostsAsync,
    fetchMyFavoritePostsAsync,
    fetchMyRepliesAsync,
};

// Redux-Saga
const loadCurrentUser$ = createAsyncSaga(loadCurrentUserAsync, userAPI.getCurrentUser);
const changeUserNickname$ = createAsyncSaga(
    changeUserNicknameAsync,
    userAPI.changeUserNickname
);
const changeUserProfileMsg$ = createAsyncSaga(
    changeUserProfileMsgAsync,
    userAPI.changeUserProfileMsg
);
const changeProfileImg$ = createAsyncSaga(
    changeProfileImgAsync,
    userAPI.changeProfileImg
);
const fetchMyPosts$ = createAsyncSaga(fetchMyPostsAsync, postAPI.getCurrentUserPosts);
const fetchMyFavoritePosts$ = createAsyncSaga(
    fetchMyFavoritePostsAsync,
    postAPI.getUserLikedPosts
);
const fetchMyReplies$ = createAsyncSaga(
    fetchMyRepliesAsync,
    replyAPI.getCurrentUserReplies
);

export function* userSaga() {
    yield takeLatest(LOAD_CURRENT_USER.REQUEST, loadCurrentUser$);
    yield takeLatest(CHANGE_USER_NICKNAME.REQUEST, changeUserNickname$);
    yield takeLatest(CHANGE_USER_PROFILE_MSG.REQUEST, changeUserProfileMsg$);
    yield takeLatest(CHANGE_PROFILE_IMG.REQUEST, changeProfileImg$);
    yield takeLatest(FETCH_MY_POSTS.REQUEST, fetchMyPosts$);
    yield takeLatest(FETCH_MY_FAVORITE_POSTS.REQUEST, fetchMyFavoritePosts$);
    yield takeLatest(FETCH_MY_REPLIES.REQUEST, fetchMyReplies$);
}

// State & Actions Types
export type UserActions = ActionType<typeof userActions>;

export type UserState = {
    currentUser: UserSummary | null;
    data?: PostItem[] | UserReply[];
    pagination: Pagination | null;
};

// Initial State
const initState: UserState = {
    currentUser: null,
    data: undefined,
    pagination: null,
};

const user = createReducer<UserState, UserActions>(initState, {
    [INIT_CURRENT_USER]: (state) => {
        return produce(state, (draft) => {
            draft.currentUser = initState.currentUser;
        });
    },
    [SET_CURRENT_USER]: (state, { payload: currentUser }) => {
        return produce(state, (draft) => {
            draft.currentUser = currentUser;
        });
    },
    [INIT_USER_INFO]: (state) => {
        return produce(state, (draft) => {
            draft.data = initState.data;
            draft.pagination = initState.pagination;
        });
    },
    [INIT_USER_INFO_PAGE_NUM]: (state) => {
        return produce(state, (draft) => {
            draft.pagination = initState.pagination;
        });
    },
    [SET_USER_INFO_PAGE_NUM]: (state, { payload: pageNum }) => {
        return produce(state, (draft) => {
            if (!draft.pagination) return;
            draft.pagination.pageNum = pageNum;
        });
    },
    [LOGOUT]: (state) => {
        localStorage.removeItem(ACCESS_TOKEN);
        return produce(state, (draft) => {
            draft.currentUser = null;
        });
    },
    [LOAD_CURRENT_USER.SUCCESS]: (state, { payload }) => {
        return produce(state, (draft) => {
            draft.currentUser = payload;
        });
    },
    [CHANGE_USER_NICKNAME.SUCCESS]: (state, { payload: nickname }) => {
        return produce(state, (draft) => {
            if (!draft.currentUser) return;
            draft.currentUser.nickname = nickname;
        });
    },
    [CHANGE_USER_PROFILE_MSG.SUCCESS]: (state, { payload: profileMsg }) => {
        return produce(state, (draft) => {
            if (!draft.currentUser) return;
            draft.currentUser.profileMsg = profileMsg;
        });
    },
    [CHANGE_PROFILE_IMG.SUCCESS]: (state, { payload: newImgUrl }) => {
        return produce(state, (draft) => {
            if (!draft.currentUser) return;
            draft.currentUser.imgUrl = newImgUrl;
        });
    },
    [FETCH_MY_POSTS.SUCCESS]: (state, { payload: { body: data, ...pagination } }) => {
        return produce(state, (draft) => {
            draft.data = data;
            draft.pagination = pagination;
        });
    },
    [FETCH_MY_FAVORITE_POSTS.SUCCESS]: (
        state,
        { payload: { body: data, ...pagination } }
    ) => {
        return produce(state, (draft) => {
            draft.data = data;
            draft.pagination = pagination;
        });
    },
    [FETCH_MY_REPLIES.SUCCESS]: (state, { payload: { body: data, ...pagination } }) => {
        return produce(state, (draft) => {
            draft.data = data;
            draft.pagination = pagination;
        });
    },
});

export default user;
