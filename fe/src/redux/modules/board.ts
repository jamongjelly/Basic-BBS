import { AxiosError } from 'axios';
import { takeLatest } from 'redux-saga/effects';
import createAsyncSaga from 'src/lib/createAsyncSaga';
import * as boardAPI from 'src/lib/api/boardAPI';
import * as subjectAPI from 'src/lib/api/subjectAPI';
import produce from 'immer';
import { Board, Subject } from 'src/models';
import {
    ActionType,
    createAction,
    createAsyncAction,
    createReducer,
} from 'typesafe-actions';

// Action Types
const INIT_CURRENT_BOARD = 'board/INIT_CURRENT_BOARD';
const SET_CURRENT_BOARD_BY_PATH = 'board/SET_CURRENT_BOARD_BY_PATH';
const GET_BOARD = {
    REQUEST: 'board/GET_BOARD_REQUEST',
    SUCCESS: 'board/GET_BOARD_SUCCESS',
    FAILURE: 'board/GET_BOARD_FAILURE',
} as const;
const GET_BOARDS = {
    REQUEST: 'board/GET_BOARDS_REQUEST',
    SUCCESS: 'board/GET_BOARDS_SUCCESS',
    FAILURE: 'board/GET_BOARDS_FAILURE',
} as const;
const GET_BOARD_BY_PATH = {
    REQUEST: 'board/GET_BOARD_BY_PATH_REQUEST',
    SUCCESS: 'board/GET_BOARD_BY_PATH_SUCCESS',
    FAILURE: 'board/GET_BOARD_BY_PATH_FAILURE',
} as const;
const GET_SUBJECTS_BY_BOARD_ID = {
    REQUEST: 'board/GET_SUBJECTS_BY_BOARD_ID_REQUEST',
    SUCCESS: 'board/GET_SUBJECTS_BY_BOARD_ID_SUCCESS',
    FAILURE: 'board/GET_SUBJECTS_BY_BOARD_ID_FAILURE',
} as const;

// Action Creators
const initCurrentBoard = createAction(INIT_CURRENT_BOARD)();
const setCurrentBoardByPath = createAction(SET_CURRENT_BOARD_BY_PATH)<string>();
const getBoardAsync = createAsyncAction(
    GET_BOARD.REQUEST,
    GET_BOARD.SUCCESS,
    GET_BOARD.FAILURE
)<number, Board, AxiosError>();
const getBoardsAsync = createAsyncAction(
    GET_BOARDS.REQUEST,
    GET_BOARDS.SUCCESS,
    GET_BOARDS.FAILURE
)<void, Board[], AxiosError>();
const getBoardByPathAsync = createAsyncAction(
    GET_BOARD_BY_PATH.REQUEST,
    GET_BOARD_BY_PATH.SUCCESS,
    GET_BOARD_BY_PATH.FAILURE
)<string, Board, AxiosError>();
const getSubjectsByBoardIdAsync = createAsyncAction(
    GET_SUBJECTS_BY_BOARD_ID.REQUEST,
    GET_SUBJECTS_BY_BOARD_ID.SUCCESS,
    GET_SUBJECTS_BY_BOARD_ID.FAILURE
)<number, Subject[], AxiosError>();

export const boardActions = {
    initCurrentBoard,
    setCurrentBoardByPath,
    getBoardAsync,
    getBoardsAsync,
    getBoardByPathAsync,
    getSubjectsByBoardIdAsync,
};

// Redux-Saga
const getBoard$ = createAsyncSaga(getBoardAsync, boardAPI.getBoard);
const getBoards$ = createAsyncSaga(getBoardsAsync, boardAPI.getBoards);
const getBoardByPath$ = createAsyncSaga(getBoardByPathAsync, boardAPI.getBoardByPath);
const getSubjectsByBoardId$ = createAsyncSaga(
    getSubjectsByBoardIdAsync,
    subjectAPI.getSubjectsByBoardId
);

export function* boardSaga() {
    yield takeLatest(GET_BOARD.REQUEST, getBoard$);
    yield takeLatest(GET_BOARDS.REQUEST, getBoards$);
    yield takeLatest(GET_BOARD_BY_PATH.REQUEST, getBoardByPath$);
    yield takeLatest(GET_SUBJECTS_BY_BOARD_ID.REQUEST, getSubjectsByBoardId$);
}

// State & Actions Types
export type BoardState = {
    currentBoard?: Board;
    boards: Board[] | null;
    subjects?: Subject[];
};

export type BoardActions = ActionType<typeof boardActions>;

// Initial State
const initState: BoardState = {
    currentBoard: undefined,
    boards: null,
    subjects: undefined,
};

// Reducer
const board = createReducer<BoardState, BoardActions>(initState, {
    [INIT_CURRENT_BOARD]: (state) => {
        return produce(state, (draft) => {
            draft.currentBoard = initState.currentBoard;
            draft.subjects = initState.subjects;
        });
    },
    [SET_CURRENT_BOARD_BY_PATH]: (state, { payload: path }) => {
        return produce(state, (draft) => {
            if (!state.boards) return;
            const currentBoardIdx = state.boards.findIndex((item) => item.path === path);
            const currentBoard = state.boards[currentBoardIdx];
            draft.currentBoard = currentBoard;
        });
    },
    [GET_BOARD.SUCCESS]: (state, { payload: currentBoard }) => {
        return produce(state, (draft) => {
            draft.currentBoard = currentBoard;
        });
    },
    [GET_BOARDS.SUCCESS]: (state, { payload: boards }) => {
        return produce(state, (draft) => {
            draft.boards = boards;
        });
    },
    [GET_BOARD_BY_PATH.SUCCESS]: (state, { payload: currentBoard }) => {
        return produce(state, (draft) => {
            draft.currentBoard = currentBoard;
        });
    },
    [GET_SUBJECTS_BY_BOARD_ID.SUCCESS]: (state, { payload: subjects }) => {
        return produce(state, (draft) => {
            draft.subjects = subjects;
        });
    },
});

export default board;
