import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import CloseButton from 'src/components/ui/buttons/CloseButton';
import TransparentButton from 'src/components/ui/buttons/TransparentButton';
import WordCounter from 'src/components/ui/WordCounter';
import { PROFILE_MSG_MAX_LENGTH } from 'src/constants';
import { UserSummary } from 'src/models';
import styled, { css } from 'styled-components';

interface UserProfileMsgBoxProps {
    user: UserSummary;
    onClickUpdateProfileMsg: (profileMsg: string) => void;
}

type ProfileMsgStyleProps = {
    editMode: boolean;
};

const ProfileMsgEditButton = styled(TransparentButton)`
    position: absolute;
    bottom: 2rem;
    right: -2.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-out;
`;

const Wrapper = styled.div<ProfileMsgStyleProps>`
    margin-top: 2rem;

    position: relative;

    &:hover {
        ${ProfileMsgEditButton} {
            opacity: 1;
        }
    }

    ${({ theme, editMode }) => css`
        font-size: ${theme.size.sm}rem;
        h6 {
            font-size: ${theme.size.sm}rem;
            color: ${theme.color.subText};
        }

        ${editMode &&
        css`
            ${ProfileMsgEditButton} {
                opacity: 1;
            }
        `}
    `}
`;

const ProfileMsgEditor = styled.textarea`
    width: 100%;
    margin-top: 1.3rem;
    margin-left: 0.5rem;
    border: none;
    border-bottom: 0.1rem solid transparent;
    outline: none;
    resize: none;

    font-family: inherit;
    font-size: inherit;

    ${({ theme, readOnly }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        border-color: ${!readOnly && theme.color.subText};
        padding: 0;
        line-height: ${theme.lineHeight.sm};
    `}

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ProfileMsgCloseButton = styled(CloseButton)`
    position: absolute;
    top: 0;
    right: -2.7rem;
`;

const UserProfileMsgBox = ({ user, onClickUpdateProfileMsg }: UserProfileMsgBoxProps) => {
    const defaultProfileMsg = user.profileMsg || '';

    const [profileMsg, setProfileMsg] = useState(defaultProfileMsg);
    const [profileMsgEditMode, setProfileMsgEditMode] = useState(false);

    const profileMsgEditor = useRef<HTMLTextAreaElement>(null);

    const openProfileMsgEditor = useCallback(() => {
        setProfileMsgEditMode(true);
        const target = profileMsgEditor.current;
        if (target) {
            target.focus();
            target.setSelectionRange(target.value.length, target.value.length);
        }
    }, [profileMsgEditor, profileMsg]);

    const closeProfileMsgEditor = useCallback(() => {
        setProfileMsg(defaultProfileMsg);
        setProfileMsgEditMode(false);
    }, [defaultProfileMsg]);

    const onChangeProfileMsg = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setProfileMsg(event.target.value);
        },
        []
    );

    const handleUpdateProfileMsg = useCallback(() => {
        if (profileMsg !== user.profileMsg) {
            onClickUpdateProfileMsg(profileMsg);
            alert('프로필 메시지가 변경되었습니다');
        }
        setProfileMsgEditMode(false);
    }, [profileMsg, user]);

    useEffect(() => {
        const target = profileMsgEditor.current;
        if (target) {
            target.style.height = '';
            target.style.height = `${
                target.scrollHeight > 192 ? 192 : target.scrollHeight + 2
            }px`;
        }
    }, [profileMsgEditor, profileMsg]);

    const profileMsgPlaceholder = '프로필 메시지를 작성해주세요';

    return (
        <Wrapper editMode={profileMsgEditMode}>
            <h6>
                <b>P</b>rofile <b>M</b>essage
            </h6>
            <ProfileMsgEditor
                ref={profileMsgEditor}
                readOnly={!profileMsgEditMode}
                maxLength={PROFILE_MSG_MAX_LENGTH}
                placeholder={profileMsgPlaceholder}
                value={profileMsg}
                onChange={onChangeProfileMsg}
            />
            <WordCounter
                length={profileMsg?.length}
                maxLength={PROFILE_MSG_MAX_LENGTH}
                show={profileMsgEditMode}
            />

            <ProfileMsgEditButton
                fontSize="sm"
                onClick={
                    profileMsgEditMode ? handleUpdateProfileMsg : openProfileMsgEditor
                }
            >
                <MdEdit />
            </ProfileMsgEditButton>
            {profileMsgEditMode && (
                <ProfileMsgCloseButton
                    onClick={closeProfileMsgEditor}
                    top={1}
                    right={1}
                />
            )}
        </Wrapper>
    );
};

export default UserProfileMsgBox;
