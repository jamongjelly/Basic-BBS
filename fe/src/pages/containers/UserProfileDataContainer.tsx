import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileBox from 'src/components/user/UserProfileBox';
import { RootState } from 'src/redux';
import { userActions } from 'src/redux/modules/user';

const UserProfileDataContainer = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const onClickUpdateNickname = useCallback((nickname: string) => {
        dispatch(userActions.changeUserNicknameAsync.request(nickname));
    }, []);

    const onClickUpdateProfileMsg = useCallback((profileMsg: string) => {
        dispatch(userActions.changeUserProfileMsgAsync.request(profileMsg));
    }, []);

    if (!currentUser) return <div>로딩 중</div>;

    return (
        <UserProfileBox
            user={currentUser}
            onClickUpdateNickname={onClickUpdateNickname}
            onClickUpdateProfileMsg={onClickUpdateProfileMsg}
        />
    );
};

export default UserProfileDataContainer;
