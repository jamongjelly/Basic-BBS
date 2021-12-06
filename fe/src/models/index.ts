// Common
export type ToastType = 'info' | 'success' | 'warn' | 'error';
export interface ToastResponse {
    type: ToastType;
    msg: string;
}

export interface Pagination {
    pageNum: number;
    pageSize: number;
    totalElements?: number;
    totalPages: number;
}

export interface LocationFromState {
    from?: Location;
}

// Auth
export interface User {
    id: number;
    email: string;
    nickname: string;
    imgUrl: string;
}

export interface UserSummary {
    id: number;
    email: string;
    nickname: string;
    imgUrl: string;
    profileMsg: string | null;
    provider?: string;
}

export interface JoinForm {
    email: string;
    nickname: string;
    password: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export type ValidationStatus = 'VALID' | 'INVALID' | '';

// Board
export interface Board {
    id: number;
    name: string;
    path: string;
    sort: number;
}

export interface PageRequest {
    pageNum?: number;
    pageSize?: number;
}

// Subject
export interface Subject {
    id: number;
    name: string;
    boardId: number;
}

// Post
export interface PostDetail {
    id: number;
    title: string;
    writer: string;
    avatar: string;
    content: string;
    showReply: boolean;
    viewCnt: number;
    likeCnt: number;
    replyCnt: number;
    createdAt: string;
    createdBy: number;
    board: Board;
    subject?: Subject;
    like: boolean;
}

export interface PostItem {
    id: number;
    title: string;
    writer: string;
    viewCnt: number;
    likeCnt: number;
    replyCnt: number;
    createdAt: string;
    createdBy: number;
    avatar: string;
    board: Board;
    subject?: Subject;
}

export interface UserPostItem {
    id: number;
    title: string;
    viewCnt: number;
    likeCnt: number;
    replyCnt: number;
    createdAt: string;
    createdBy: number;
    board: Board;
}

// Reply
export interface Reply {
    id: number;
    writer: string;
    avatar: string;
    content: string;
    createdAt: string;
    createdBy: number;
}

export interface UserReply {
    id: number;
    content: string;
    createdAt: string;
    postId: number;
    postTitle: string;
    board: Board;
}

// Todo
export interface Todo {
    id: number;
    done: boolean;
    text: string;
}

// etc
export interface HistoryPayload {
    history: any;
}
