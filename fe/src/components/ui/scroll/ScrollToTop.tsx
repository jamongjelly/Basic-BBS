import React, { ReactNode, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ScrollToTopProps extends RouteComponentProps {
    children: ReactNode;
}

const ScrollToTop = ({ location, children }: ScrollToTopProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return <>{children}</>;
};

export default withRouter(ScrollToTop);
