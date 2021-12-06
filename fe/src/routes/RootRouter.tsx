import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import OAuth2Redirect from 'src/routes/OAuth2Redirect';
import PrivateRoute from 'src/routes/PrivateRoute';
import {
    BoardPage,
    TodoPage,
    UnregisterPage,
    UserActivityPage,
    UserProfilePage,
} from 'src/pages/presenters';

const RootRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Redirect exact path="/" to="/board" />
                <PrivateRoute exact path="/todo" component={TodoPage} />
                <Route path="/board" component={BoardPage} />
                <Route exact path="/oauth2/redirect" component={OAuth2Redirect} />
                <PrivateRoute exact path="/user/activity" component={UserActivityPage} />
                <PrivateRoute exact path="/user/profile" component={UserProfilePage} />
                <PrivateRoute exact path="/user/unregister" component={UnregisterPage} />
                <Redirect path="*" to="/" />
            </Switch>
        </Suspense>
    );
};

export default RootRouter;
