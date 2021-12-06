import React, { useCallback } from 'react';
import { UserImageContainer, UserProfileDataContainer } from 'src/pages/containers';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'src/styles/palette';
import { darken } from 'polished';
import { KAKAO_UNLINK_URL } from 'src/constants/oauth2';

const Template = styled.div`
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UserProfile = styled.article`
    width: 40rem;
    padding: 6rem;
    padding-bottom: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({ theme }) => css`
        box-shadow: 0 0.2rem 1.2rem ${theme.shadow.level2};
    `}
`;

const ProfileDataBox = styled.div`
    margin-top: 3rem;
`;

const BottomMenu = styled.section`
    width: 40rem;
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    a {
        color: ${palette.red[0]};

        &:hover {
            color: ${darken(0.1, palette.red[0])};
        }
    }
`;

const UserProfilePage = () => {
    return (
        <Template>
            <UserProfile>
                <UserImageContainer />
                <ProfileDataBox>
                    <UserProfileDataContainer />
                </ProfileDataBox>
            </UserProfile>
            <BottomMenu>
                <Link to="/user/unregister">회원 탈퇴</Link>
                <a href={KAKAO_UNLINK_URL}>연결 끊기</a>
            </BottomMenu>
        </Template>
    );
};

export default UserProfilePage;
