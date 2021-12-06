import { lazy } from 'react';

const BoardPage = lazy(() => import('./BoardPage'));
const PostEditor = lazy(() => import('./PostEditor'));
const PostViewer = lazy(() => import('./PostViewer'));
const TodoPage = lazy(() => import('./TodoPage'));
const UnregisterPage = lazy(() => import('./UnregisterPage'));
const UserActivityPage = lazy(() => import('./UserActivityPage'));
const UserProfilePage = lazy(() => import('./UserProfilePage'));

export {
    BoardPage,
    PostEditor,
    PostViewer,
    TodoPage,
    UnregisterPage,
    UserActivityPage,
    UserProfilePage,
};
