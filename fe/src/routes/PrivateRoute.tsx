import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { ACCESS_TOKEN } from 'src/constants';
import { authActions } from 'src/redux/modules/auth';
import { LocationFromState } from 'src/models';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, location, ...rest }: PrivateRouteProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            dispatch(
                authActions.showAuthModal(
                    location && `${location.pathname}${location.search}`
                )
            );
        }
    }, []);

    return (
        <Route
            location={location}
            {...rest}
            render={(props: RouteComponentProps<any, any, any | LocationFromState>) =>
                localStorage.getItem(ACCESS_TOKEN) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: props.location.state?.from.pathname,
                            search: props.location.state?.from.search,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
