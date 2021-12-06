import * as postAPI from 'src/lib/api/postAPI';
import { AxiosError } from 'axios';
import createAsyncSaga, { createRouteAsyncSaga } from 'src/lib/createAsyncSaga';
import { PostDetail, PageRequest, PostItem, Pagination } from 'src/models';
import {
    ActionType,
    createAction,
    createAsyncAction,
    createReducer,
} from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { replace } from 'connected-react-router';

// Action Types
const INIT_CURRENT_POST = 'post/INIT_CURRENT_POST';
const SET_CURRENT_POST = 'post/SET_CURRENT_POST';
const INIT_POSTS = 'post/INIT_POSTS';
const INCREASE_REPLY_CNT = 'post/INCREASE_REPLY_CNT';
const DECREASE_REPLY_CNT = 'post/DECREASE_REPLY_CNT';
const WRITE_POST = {
    REQUEST: 'post/WRITE_POST_REQUEST',
    SUCCESS: 'post/WRITE_POST_SUCCESS',
    FAILURE: 'post/WRITE_POST_FAILURE',
} as const;
const READ_POST = {
    REQUEST: 'post/READ_POST_REQUEST',
    SUCCESS: 'post/READ_POST_SUCCESS',
    FAILURE: 'post/READ_POST_FAILURE',
} as const;
const UPDATE_POST = {
    REQUEST: 'post/UPDATE_POST_REQUEST',
    SUCCESS: 'post/UPDATE_POST_SUCCESS',
    FAILURE: 'post/UPDATE_POST_FAILURE',
} as const;
const DELETE_POST = {
    REQUEST: 'post/DELETE_POST_REQUEST',
    SUCCESS: 'post/DELETE_POST_SUCCESS',
    FAILURE: 'post/DELETE_POST_FAILURE',
} as const;
const GET_ALL_POSTS = {
    REQUEST: 'post/GET_ALL_POSTS_REQUEST',
    SUCCESS: 'post/GET_ALL_POSTS_SUCCESS',
    FAILURE: 'post/GET_ALL_POSTS_FAILURE',
} as const;
const GET_POSTS_BY_BOARD_ID = {
    REQUEST: 'post/GET_POSTS_BY_BOARD_ID_REQUEST',
    SUCCESS: 'post/GET_POSTS_BY_BOARD_ID_SUCCESS',
    FAILURE: 'post/GET_POSTS_BY_BOARD_ID_FAILURE',
} as const;
const SEARCH_POSTS = {
    REQUEST: 'post/SEARCH_POSTS_REQUEST',
    SUCCESS: 'post/SEARCH_POSTS_SUCCESS',
    FAILURE: 'post/SEARCH_POSTS_FAILURE',
} as const;
const SEARCH_POSTS_BY_SUBJECT_ID = {
    REQUEST: 'post/SEARCH_POSTS_BY_SUBJECT_ID_REQUEST',
    SUCCESS: 'post/SEARCH_POSTS_BY_SUBJECT_ID_SUCCESS',
    FAILURE: 'post/SEARCH_POSTS_BY_SUBJECT_ID_FAILURE',
} as const;
const POST_LIKE = {
    REQUEST: 'post/POST_LIKE_REQUEST',
    SUCCESS: 'post/POST_LIKE_SUCCESS',
    FAILURE: 'post/POST_LIKE_FAILURE',
} as const;
const POST_UNLIKE = {
    REQUEST: 'post/POST_UNLIKE_REQUEST',
    SUCCESS: 'post/POST_UNLIKE_SUCCESS',
    FAILURE: 'post/POST_UNLIKE_FAILURE',
} as const;

// Payload & Response Types
export interface WritePostPayload {
    title: string;
    writer: string;
    content: string;
    showReply: boolean;
    boardId: number;
    subjectId?: number;
}
export type SearchType = 't' | 'w' | 'c' | 'tc' | '';
export interface GetPostsByBoardIdPayload extends PageRequest {
    boardId: number;
}
export interface SearchPostsPayload extends PageRequest {
    boardId?: number;
    searchType?: SearchType;
    keyword: string;
}
export interface SearchPostsBySubjectIdPayload extends PageRequest {
    subjectId: number;
}
export interface PostItemResponse extends Pagination {
    body: PostItem[];
}
export interface AddPostAttachmentPayload {
    postId: number;
    formData: FormData;
}
export interface UpdatePostPayload {
    id: number;
    title: string;
    content: string;
    showReply: boolean;
    boardId: number;
    subjectId?: number;
}
export interface DeletePostPayload {
    postId: number;
}

// Action Creators
const initCurrentPost = createAction(INIT_CURRENT_POST)();
const setCurrentPost = createAction(SET_CURRENT_POST)<PostDetail>();
const initPosts = createAction(INIT_POSTS)();
const increaseReplyCnt = createAction(INCREASE_REPLY_CNT)();
const decreaseReplyCnt = createAction(DECREASE_REPLY_CNT)();
const writePostAsync = createAsyncAction(
    WRITE_POST.REQUEST,
    WRITE_POST.SUCCESS,
    WRITE_POST.FAILURE
)<WritePostPayload, PostDetail, AxiosError>();
const readPostAsync = createAsyncAction(
    READ_POST.REQUEST,
    READ_POST.SUCCESS,
    READ_POST.FAILURE
)<number, PostDetail, AxiosError>();
const updatePostAsync = createAsyncAction(
    UPDATE_POST.REQUEST,
    UPDATE_POST.SUCCESS,
    UPDATE_POST.FAILURE
)<UpdatePostPayload, PostDetail, AxiosError>();
const deletePostAsync = createAsyncAction(
    DELETE_POST.REQUEST,
    DELETE_POST.SUCCESS,
    DELETE_POST.FAILURE
)<DeletePostPayload, number, AxiosError>();
const getAllPostsAsync = createAsyncAction(
    GET_ALL_POSTS.REQUEST,
    GET_ALL_POSTS.SUCCESS,
    GET_ALL_POSTS.FAILURE
)<PageRequest, PostItemResponse, AxiosError>();
const getPostsByBoardIdAsync = createAsyncAction(
    GET_POSTS_BY_BOARD_ID.REQUEST,
    GET_POSTS_BY_BOARD_ID.SUCCESS,
    GET_POSTS_BY_BOARD_ID.FAILURE
)<GetPostsByBoardIdPayload, PostItemResponse, AxiosError>();
const searchPostsAsync = createAsyncAction(
    SEARCH_POSTS.REQUEST,
    SEARCH_POSTS.SUCCESS,
    SEARCH_POSTS.FAILURE
)<SearchPostsPayload, PostItemResponse, AxiosError>();
const searchPostsBySubjectIdAsync = createAsyncAction(
    SEARCH_POSTS_BY_SUBJECT_ID.REQUEST,
    SEARCH_POSTS_BY_SUBJECT_ID.SUCCESS,
    SEARCH_POSTS_BY_SUBJECT_ID.FAILURE
)<SearchPostsBySubjectIdPayload, PostItemResponse, AxiosError>();
const postLikeAsync = createAsyncAction(
    POST_LIKE.REQUEST,
    POST_LIKE.SUCCESS,
    POST_LIKE.FAILURE
)<number, number, AxiosError>();
const postUnlikeAsync = createAsyncAction(
    POST_UNLIKE.REQUEST,
    POST_UNLIKE.SUCCESS,
    POST_UNLIKE.FAILURE
)<number, number, AxiosError>();

export const postActions = {
    initCurrentPost,
    setCurrentPost,
    initPosts,
    increaseReplyCnt,
    decreaseReplyCnt,
    writePostAsync,
    readPostAsync,
    updatePostAsync,
    deletePostAsync,
    getAllPostsAsync,
    getPostsByBoardIdAsync,
    searchPostsAsync,
    searchPostsBySubjectIdAsync,
    postLikeAsync,
    postUnlikeAsync,
};

// Redux-Saga
const writePost$ = function* (action: ReturnType<typeof writePostAsync.request>) {
    try {
        const response: PostDetail = yield call(postAPI.writePost, action.payload);
        yield put(writePostAsync.success(response));
        yield put(replace(`/board/${response.board.path}/${response.id}`));
    } catch (e) {
        yield put(writePostAsync.failure(e));
    }
};
const readPost$ = createAsyncSaga(readPostAsync, postAPI.readPost);
const updatePost$ = createRouteAsyncSaga(updatePostAsync, postAPI.updatePost, 'REPLACE');
const deletePost$ = createRouteAsyncSaga(deletePostAsync, postAPI.deletePost);
const getAllPosts$ = createAsyncSaga(getAllPostsAsync, postAPI.getAllPosts);
const getPostsByBoardId$ = createAsyncSaga(
    getPostsByBoardIdAsync,
    postAPI.getPostsByBoardId
);
const searchPosts$ = createAsyncSaga(searchPostsAsync, postAPI.searchPosts);
const searchPostsBySubjectId$ = createAsyncSaga(
    searchPostsBySubjectIdAsync,
    postAPI.searchPostsBySubjectId
);
const postLike$ = createAsyncSaga(postLikeAsync, postAPI.postLike);
const postUnlike$ = createAsyncSaga(postUnlikeAsync, postAPI.postUnlike);

export function* postSaga() {
    yield takeLatest(WRITE_POST.REQUEST, writePost$);
    yield takeLatest(READ_POST.REQUEST, readPost$);
    yield takeLatest(UPDATE_POST.REQUEST, updatePost$);
    yield takeLatest(DELETE_POST.REQUEST, deletePost$);
    yield takeLatest(GET_ALL_POSTS.REQUEST, getAllPosts$);
    yield takeLatest(GET_POSTS_BY_BOARD_ID.REQUEST, getPostsByBoardId$);
    yield takeLatest(SEARCH_POSTS.REQUEST, searchPosts$);
    yield takeLatest(SEARCH_POSTS_BY_SUBJECT_ID.REQUEST, searchPostsBySubjectId$);
    yield takeLatest(POST_LIKE.REQUEST, postLike$);
    yield takeLatest(POST_UNLIKE.REQUEST, postUnlike$);
}

// State & Actions Types
export type PostState = {
    currentPost: PostDetail | null;
    posts: PostItem[] | null;
    pagination: Pagination;
};

export type PostActions = ActionType<typeof postActions>;

// Initial State
const initState: PostState = {
    currentPost: null,
    posts: null,
    pagination: {
        pageNum: 1,
        pageSize: 10,
        totalPages: 1,
    },
};

// Reducer
const post = createReducer<PostState, PostActions>(initState, {
    [INIT_CURRENT_POST]: (state) => {
        return produce(state, (draft) => {
            draft.currentPost = initState.currentPost;
        });
    },
    [SET_CURRENT_POST]: (state, { payload: currentPost }) => {
        return produce(state, (draft) => {
            draft.currentPost = currentPost;
        });
    },
    [INIT_POSTS]: (state) => {
        return produce(state, (draft) => {
            draft.posts = initState.posts;
        });
    },
    [INCREASE_REPLY_CNT]: (state) => {
        return produce(state, (draft) => {
            if (!draft.currentPost) return;
            draft.currentPost.replyCnt += 1;
        });
    },
    [DECREASE_REPLY_CNT]: (state) => {
        return produce(state, (draft) => {
            if (!draft.currentPost) return;
            if (draft.currentPost.replyCnt === 0) return;
            draft.currentPost.replyCnt -= 1;
        });
    },
    [DELETE_POST.SUCCESS]: (state, { payload: postId }) => {
        return produce(state, (draft) => {
            if (!draft.posts) return;
            draft.posts = draft.posts.filter((item) => item.id !== postId);
        });
    },
    [READ_POST.SUCCESS]: (state, { payload: currentPost }) => {
        return produce(state, (draft) => {
            draft.currentPost = currentPost;
            if (!draft.posts) return;
            draft.posts = draft.posts.map((item) =>
                item.id === currentPost.id ? currentPost : item
            );
        });
    },
    [GET_ALL_POSTS.SUCCESS]: (state, { payload: { body: posts, ...pagination } }) => {
        return produce(state, (draft) => {
            draft.posts = posts;
            draft.pagination = pagination;
        });
    },
    [GET_POSTS_BY_BOARD_ID.SUCCESS]: (
        state,
        { payload: { body: posts, ...pagination } }
    ) => {
        return produce(state, (draft) => {
            draft.posts = posts;
            draft.pagination = pagination;
        });
    },
    [SEARCH_POSTS.SUCCESS]: (state, { payload: { body: posts, ...pagination } }) => {
        return produce(state, (draft) => {
            draft.posts = posts;
            draft.pagination = pagination;
        });
    },
    [SEARCH_POSTS_BY_SUBJECT_ID.SUCCESS]: (
        state,
        { payload: { body: posts, ...pagination } }
    ) => {
        return produce(state, (draft) => {
            draft.posts = posts;
            draft.pagination = pagination;
        });
    },
    [POST_LIKE.SUCCESS]: (state, { payload: postId }) => {
        return produce(state, (draft) => {
            if (!draft.currentPost) return;
            draft.currentPost.likeCnt += 1;
            draft.currentPost.like = true;

            if (!draft.posts) return;
            draft.posts = draft.posts.map((item) =>
                item.id === postId ? { ...item, likeCnt: item.likeCnt + 1 } : item
            );
        });
    },
    [POST_UNLIKE.SUCCESS]: (state, { payload: postId }) => {
        return produce(state, (draft) => {
            if (!draft.currentPost) return;
            draft.currentPost.likeCnt -= 1;
            draft.currentPost.like = false;

            if (!draft.posts) return;
            draft.posts = draft.posts.map((item) =>
                item.id === postId ? { ...item, likeCnt: item.likeCnt - 1 } : item
            );
        });
    },
});

export default post;
