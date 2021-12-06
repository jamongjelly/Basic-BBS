import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Sidebar from 'src/components/ui/sidebar';
import { RootState } from 'src/redux';
import { authActions } from 'src/redux/modules/auth';
import { coreActions } from 'src/redux/modules/core';
import { userActions } from 'src/redux/modules/user';

interface SidebarContainerProps extends RouteComponentProps {}

const SidebarContainer = ({ location, history }: SidebarContainerProps) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const { currentUser, themeMode } = useSelector((state: RootState) => ({
        currentUser: state.user.currentUser,
        themeMode: state.core.themeMode,
    }));

    const toggleSidebar = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    const onClickLogin = useCallback(() => {
        dispatch(authActions.showAuthModal(`${location.pathname}${location.search}`));
    }, [location]);

    const onClickLogout = useCallback(() => {
        history.push('/');
        dispatch(userActions.logout());
    }, []);

    const toggleTheme = useCallback(() => {
        dispatch(coreActions.toggleTheme(themeMode === 'LIGHT' ? 'DARK' : 'LIGHT'));
    }, [themeMode]);

    return (
        <Sidebar
            user={currentUser ? currentUser : undefined}
            open={open}
            onToggle={toggleSidebar}
            onClickLogin={onClickLogin}
            onClickLogout={onClickLogout}
            themeMode={themeMode === 'LIGHT'}
            toggleTheme={toggleTheme}
        />
    );
};

export default withRouter(SidebarContainer);
