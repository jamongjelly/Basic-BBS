import React from 'react';
import UserNicknameBox from 'src/components/user/UserNicknameBox';
import UserProfileMsgBox from 'src/components/user/UserProfileMsgBox';
import { UserSummary } from 'src/models';
import styled, { css } from 'styled-components';

interface UserProfileBoxProps {
    user: UserSummary;
    onClickUpdateNickname: (nickname: string) => void;
    onClickUpdateProfileMsg: (profileMsg: string) => void;
}

const Email = styled.p`
    text-align: center;

    ${({ theme }) => css`
        padding: ${theme.unit * 2}rem 0;
        color: ${theme.color.subText};
    `}
`;

const UserProfileBox = ({
    user,
    onClickUpdateNickname,
    onClickUpdateProfileMsg,
}: UserProfileBoxProps) => {
    return (
        <>
            <Email>{user?.email}</Email>
            <UserNicknameBox
                defaultNickname={user.nickname}
                onClickUpdateNickname={onClickUpdateNickname}
            />
            <UserProfileMsgBox
                user={user}
                onClickUpdateProfileMsg={onClickUpdateProfileMsg}
            />
        </>
    );
};

export default UserProfileBox;
