import React, { useCallback } from 'react';
import { IoMdCamera } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'src/components/ui/Avatar';
import { RootState } from 'src/redux';
import { userActions } from 'src/redux/modules/user';
import styled, { css } from 'styled-components';

const cameraIconSize = 1.75;

const ProfileImgBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    label {
        background-color: #fff;
        width: 3rem;
        height: 3rem;
        padding: 0.4rem;
        border-radius: 50%;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        right: 0;
        bottom: 0;

        svg {
            color: #666;
            width: ${cameraIconSize}rem;
            height: ${cameraIconSize}rem;
        }

        ${({ theme }) => css`
            border: 0.1rem solid ${theme.color.subText};
        `}
    }
    input {
        display: none;
    }
`;

const UserImageContainer = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const onChangeFile = useCallback(
        (event) => {
            if (event.target.files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const formData = new FormData();
                    formData.append('file', event.target.files[0]);
                    dispatch(userActions.changeProfileImgAsync.request({ formData }));
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        },
        [dispatch]
    );
    return (
        <ProfileImgBox>
            <Avatar src={currentUser?.imgUrl} size={20} />
            <label htmlFor="profileImgInput">
                <IoMdCamera />
            </label>
            <input
                id="profileImgInput"
                type="file"
                accept="image/*"
                onChange={onChangeFile}
            />
        </ProfileImgBox>
    );
};

export default UserImageContainer;
