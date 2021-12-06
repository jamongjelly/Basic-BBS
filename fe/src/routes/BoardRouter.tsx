import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { BoardTableContainer, PostEditorContainer } from 'src/pages/containers';
import PrivateRoute from 'src/routes/PrivateRoute';

interface BoardRouterProps extends RouteComponentProps {}

const BoardRouter = ({ match }: BoardRouterProps) => {
    return (
        <Switch>
            <PrivateRoute
                exact
                path={`${match.url}/editor`}
                component={PostEditorContainer}
            />
            <Route
                path={`${match.url}/:boardName([a-z]+)?`}
                component={BoardTableContainer}
            />
        </Switch>
    );
};

export default BoardRouter;
