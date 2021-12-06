import * as replyAPI from 'src/lib/api/replyAPI';
import { AxiosError } from 'axios';
import createAsyncSaga from 'src/lib/createAsyncSaga';
import { Reply } from 'src/models';
import {
    ActionType,
    createAction,
    createAsyncAction,
    createReducer,
} from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

// Action Types
const INIT_REPLIES = 'reply/INIT_REPLIES';
const WRITE_REPLY = {
    REQUEST: 'reply/WRITE_REPLY_REQUEST',
    SUCCESS: 'reply/WRITE_REPLY_SUCCESS',
    FAILURE: 'reply/WRITE_REPLY_FAILURE',
} as const;
const UPDATE_REPLY = {
    REQUEST: 'reply/UPDATE_REPLY_REQUEST',
    SUCCESS: 'reply/UPDATE_REPLY_SUCCESS',
    FAILURE: 'reply/UPDATE_REPLY_FAILURE',
} as const;
const DELETE_REPLY = {
    REQUEST: 'reply/DELETE_REPLY_REQUEST',
    SUCCESS: 'reply/DELETE_REPLY_SUCCESS',
    FAILURE: 'reply/DELETE_REPLY_FAILURE',
} as const;
const GET_REPLIES_BY_POST_ID = {
    REQUEST: 'reply/GET_REPLIES_BY_POST_ID_REQUEST',
    SUCCESS: 'reply/GET_REPLIES_BY_POST_ID_SUCCESS',
    FAILURE: 'reply/GET_REPLIES_BY_POST_ID_FAILURE',
} as const;

// Payload & Response Types
export interface WriteReplyPayload {
    writer: string;
    content: string;
    postId: number;
}

export interface UpdateReplyPayload {
    id: number;
    content: string;
    postId: number;
}

// Action Creators
const initReplies = createAction(INIT_REPLIES)();
const writeReplyAsync = createAsyncAction(
    WRITE_REPLY.REQUEST,
    WRITE_REPLY.SUCCESS,
    WRITE_REPLY.FAILURE
)<WriteReplyPayload, Reply, AxiosError>();
const updateReplyAsync = createAsyncAction(
    UPDATE_REPLY.REQUEST,
    UPDATE_REPLY.SUCCESS,
    UPDATE_REPLY.FAILURE
)<UpdateReplyPayload, Reply, AxiosError>();
const deleteReplyAsync = createAsyncAction(
    DELETE_REPLY.REQUEST,
    DELETE_REPLY.SUCCESS,
    DELETE_REPLY.FAILURE
)<number, number, AxiosError>();
const getRepliesByPostIdAsync = createAsyncAction(
    GET_REPLIES_BY_POST_ID.REQUEST,
    GET_REPLIES_BY_POST_ID.SUCCESS,
    GET_REPLIES_BY_POST_ID.FAILURE
)<number, Reply[], AxiosError>();

export const replyActions = {
    initReplies,
    writeReplyAsync,
    updateReplyAsync,
    deleteReplyAsync,
    getRepliesByPostIdAsync,
};

// Redux-Saga
const writeReply$ = createAsyncSaga(writeReplyAsync, replyAPI.writeReply);
const updateReply$ = createAsyncSaga(updateReplyAsync, replyAPI.updateReply);
const deleteReply$ = createAsyncSaga(deleteReplyAsync, replyAPI.deleteReply);
const getRepliesByPostId$ = createAsyncSaga(
    getRepliesByPostIdAsync,
    replyAPI.getRepliesByPostId
);

export function* replySaga() {
    yield takeLatest(WRITE_REPLY.REQUEST, writeReply$);
    yield takeLatest(UPDATE_REPLY.REQUEST, updateReply$);
    yield takeLatest(DELETE_REPLY.REQUEST, deleteReply$);
    yield takeLatest(GET_REPLIES_BY_POST_ID.REQUEST, getRepliesByPostId$);
}

// State & Actions Types
export type ReplyState = {
    currentReply: Reply | null;
    replies: Reply[] | null;
};

export type ReplyActions = ActionType<typeof replyActions>;

// Initial State
const initState: ReplyState = {
    currentReply: null,
    replies: null,
};

// Reducer
const reply = createReducer<ReplyState, ReplyActions>(initState, {
    [INIT_REPLIES]: (state) => {
        return produce(state, (draft) => {
            draft.replies = initState.replies;
        });
    },
    [GET_REPLIES_BY_POST_ID.SUCCESS]: (state, { payload: replies }) => {
        return produce(state, (draft) => {
            draft.replies = replies;
        });
    },
    [WRITE_REPLY.SUCCESS]: (state, { payload: newReply }) => {
        return produce(state, (draft) => {
            draft.replies?.push(newReply);
        });
    },
    [UPDATE_REPLY.SUCCESS]: (state, { payload: updatedReply }) => {
        return produce(state, (draft) => {
            if (!draft.replies) return;
            draft.replies = draft.replies.map((item) =>
                item.id === updatedReply.id ? updatedReply : item
            );
        });
    },
    [DELETE_REPLY.SUCCESS]: (state, { payload: replyId }) => {
        return produce(state, (draft) => {
            if (!draft.replies) return;
            draft.replies = draft.replies.filter((item) => item.id !== replyId);
        });
    },
});

export default reply;
