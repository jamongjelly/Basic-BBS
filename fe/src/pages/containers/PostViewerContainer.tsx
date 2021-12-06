import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { REDIRECT_URL } from 'src/constants';
import PostViewer from 'src/pages/presenters/PostViewer';
import { RootState } from 'src/redux';
import { postActions } from 'src/redux/modules/post';
import * as qs from 'query-string';

interface MatchParams {
    postId?: string;
}

const PostViewerContainer = ({ match, location }: RouteComponentProps<MatchParams>) => {
    const dispatch = useDispatch();
    const { currentUser, currentPost } = useSelector((state: RootState) => ({
        currentUser: state.user.currentUser,
        currentPost: state.post.currentPost,
    }));

    const query = qs.parse(location.search);
    const pageSize = query.pageSize?.toString();

    const postId = match.params.postId && parseInt(match.params.postId);

    const onClickDelete = useCallback(
        (localPostId: number) => {
            if (window.confirm('정말 삭제하시겠습니까?')) {
                const redirectUrl = `/board/${currentPost?.board.path}${
                    pageSize && `?pageSize=${pageSize}`
                }`;
                localStorage.setItem(REDIRECT_URL, redirectUrl);
                dispatch(
                    postActions.deletePostAsync.request({
                        postId: localPostId,
                    })
                );
            }
        },
        [currentPost, pageSize]
    );

    const onClickLike = useCallback((localPostId: number, like: boolean) => {
        if (like) {
            dispatch(postActions.postUnlikeAsync.request(localPostId));
        } else {
            dispatch(postActions.postLikeAsync.request(localPostId));
        }
    }, []);

    useEffect(() => {
        if (!currentPost && postId) {
            dispatch(postActions.readPostAsync.request(postId));
        }
    }, [currentPost, postId]);

    useEffect(() => {
        return () => {
            dispatch(postActions.initCurrentPost());
        };
    }, [postId]);

    if (!currentPost) return <div>로딩 중</div>;

    return (
        <PostViewer
            currentPost={currentPost}
            currentUser={currentUser}
            onClickDelete={onClickDelete}
            onClickLike={onClickLike}
        />
    );
};

export default PostViewerContainer;
