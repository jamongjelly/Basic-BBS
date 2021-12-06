import React, { lazy } from 'react';
import AuthFormContainer from './AuthFormContainer';
import AuthModalContainer from './AuthModalContainer';
import Core from './Core';
import ReplyContainer from './ReplyContainer';
import SidebarContainer from './SidebarContainer';
import TodoListContainer from './TodoListContainer';
import UserImageContainer from './UserImageContainer';
import UserProfileDataContainer from './UserProfileDataContainer';

const BoardListContainer = lazy(() => import('./BoardListContainer'));
const BoardTableContainer = lazy(() => import('./BoardTableContainer'));
const PostEditorContainer = lazy(() => import('./PostEditorContainer'));
const PostViewerContainer = lazy(() => import('./PostViewerContainer'));
const TodoContainer = lazy(() => import('./TodoContainer'));
const UserActivityContainer = lazy(() => import('./UserActivityContainer'));

export {
    AuthFormContainer,
    AuthModalContainer,
    BoardListContainer,
    BoardTableContainer,
    Core,
    PostEditorContainer,
    PostViewerContainer,
    ReplyContainer,
    SidebarContainer,
    TodoContainer,
    TodoListContainer,
    UserActivityContainer,
    UserImageContainer,
    UserProfileDataContainer,
};
