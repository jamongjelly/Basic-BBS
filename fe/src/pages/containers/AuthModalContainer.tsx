import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthModal from 'src/components/auth/AuthModal';
import { REDIRECT_URL } from 'src/constants';
import { RootState } from 'src/redux';
import { authActions } from 'src/redux/modules/auth';

const AuthModalContainer = () => {
    const dispatch = useDispatch();
    const { visible, mode } = useSelector((state: RootState) => ({
        visible: state.auth.authModal.visible,
        mode: state.auth.authModal.mode,
    }));

    const onCloseModal = useCallback(() => {
        dispatch(authActions.closeAuthModal());
        localStorage.removeItem(REDIRECT_URL);
    }, []);

    return (
        <>
            {visible && (
                <AuthModal visible={visible} mode={mode} onCloseModal={onCloseModal} />
            )}
        </>
    );
};

export default withRouter(AuthModalContainer);
