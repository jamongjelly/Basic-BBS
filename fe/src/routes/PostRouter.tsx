import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PostViewerContainer } from 'src/pages/containers';
import PostRedirect from 'src/routes/PostRedirect';

const PostRouter = () => {
    return (
        <Switch>
            <Route exact path={`/board/:postId([0-9]+)`} component={PostRedirect} />
            <Route
                exact
                path={`/board/:boardName([a-z]+)/:postId([0-9]+)`}
                component={PostViewerContainer}
            />
        </Switch>
    );
};

export default PostRouter;
