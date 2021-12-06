import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { ACCESS_TOKEN, REDIRECT_URL } from 'src/constants';
import qs from 'query-string';

const OAuth2Redirect = ({ location }: RouteComponentProps) => {
    const query = qs.parse(location.search);

    if (query.token) {
        localStorage.setItem(ACCESS_TOKEN, query.token && query.token.toString());
        const redirect_url = localStorage.getItem(REDIRECT_URL);
        localStorage.removeItem(REDIRECT_URL);
        return <Redirect to={redirect_url || '/'} />;
    } else {
        if (query.error) {
            alert(query.error);
        }
        return <Redirect to="/board" />;
    }
};

export default OAuth2Redirect;
