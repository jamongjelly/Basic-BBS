import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState } from 'src/redux';
import { postActions } from 'src/redux/modules/post';

interface MatchParams {
    postId?: string;
}

const PostRedirect = ({ match }: RouteComponentProps<MatchParams>) => {
    const dispatch = useDispatch();
    const currentPost = useSelector((state: RootState) => state.post.currentPost);

    const postId = match.params.postId && parseInt(match.params.postId);

    useEffect(() => {
        if (postId) {
            dispatch(postActions.readPostAsync.request(postId));
        }
    }, [postId]);

    if (currentPost) {
        return <Redirect to={`/board/${currentPost.board.path}/${currentPost.id}`} />;
    }

    return <div>로딩 중</div>;
};

export default PostRedirect;
