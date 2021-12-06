import React, { useCallback, useEffect } from 'react';
import UserActivityTab from 'src/components/user/UserActivityTab';
import qs from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'src/redux/modules/user';
import { RootState } from 'src/redux';

const UserActivityContainer = ({ location }: RouteComponentProps) => {
    const dispatch = useDispatch();
    const { currentUser, data, pagination } = useSelector((state: RootState) => ({
        currentUser: state.user.currentUser,
        data: state.user.data,
        pagination: state.user.pagination,
    }));
    const type = qs.parse(location.search).type?.toString() || 'post';

    const pageNum = pagination?.pageNum || 1;

    const onClickInitData = useCallback(() => {
        dispatch(userActions.initUserInfo());
    }, []);

    const onClickPageButton = useCallback((page: number) => {
        dispatch(userActions.setUserInfoPageNum(page));
    }, []);

    useEffect(() => {
        if (currentUser) {
            switch (type) {
                case 'post':
                    dispatch(userActions.fetchMyPostsAsync.request(pageNum));
                    break;
                case 'reply':
                    dispatch(userActions.fetchMyRepliesAsync.request(pageNum));
                    break;
                case 'like':
                    dispatch(userActions.fetchMyFavoritePostsAsync.request(pageNum));
                    break;
            }
        }
    }, [currentUser, type, pageNum]);

    return (
        <UserActivityTab
            data={data}
            type={type}
            pagination={pagination || undefined}
            onClickInitData={onClickInitData}
            onClickPageButton={onClickPageButton}
        />
    );
};

export default withRouter(UserActivityContainer);
