import React, { useCallback, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import CloseButton from 'src/components/ui/buttons/CloseButton';
import TransparentButton from 'src/components/ui/buttons/TransparentButton';
import WordCounter from 'src/components/ui/WordCounter';
import { NICKNAME_MAX_LENGTH } from 'src/constants';
import * as userAPI from 'src/lib/api/userAPI';
import styled, { css } from 'styled-components';

interface UserNicknameBoxProps {
    defaultNickname: string;
    onClickUpdateNickname: (nickname: string) => void;
}

type NicknameStyleProps = {
    editMode: boolean;
};

const NicknameEditButton = styled(TransparentButton)`
    position: absolute;
    bottom: 2rem;
    right: -2.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-out;
`;

const Wrapper = styled.div<NicknameStyleProps>`
    position: relative;

    &:hover {
        ${NicknameEditButton} {
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
            ${NicknameEditButton} {
                opacity: 1;
            }
        `}
    `}
`;

const NicknameInput = styled.input`
    width: 100%;
    border: none;
    border-bottom: 0.1rem solid transparent;
    outline: none;

    text-align: center;

    ${({ theme, readOnly }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        padding: ${theme.unit * 4}rem 0;
        font-size: ${theme.size.h3}rem;
        font-weight: ${theme.fontWeight.bold};

        ${!readOnly && `border-color: ${theme.color.subText}`};
    `}
`;

const NicknameCloseButton = styled(CloseButton)`
    position: absolute;
    top: 0;
    right: -2.7rem;
`;

const UserNicknameBox = ({
    defaultNickname,
    onClickUpdateNickname,
}: UserNicknameBoxProps) => {
    const [nickname, setNickname] = useState(defaultNickname);
    const [nicknameEditMode, setNicknameEditMode] = useState(false);

    const nicknameInput = useRef<HTMLInputElement>(null);

    const onChangeNickname = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= NICKNAME_MAX_LENGTH) {
            setNickname(event.target.value);
        }
    }, []);

    const handleUpdateNickname = useCallback(() => {
        if (nickname === defaultNickname) {
            setNicknameEditMode(false);
            return;
        }

        userAPI.checkNickname(nickname).then(({ available }) => {
            if (available) {
                onClickUpdateNickname(nickname);
                alert('닉네임이 변경되었습니다');
                setNicknameEditMode(false);
            } else {
                alert('다른 닉네임을 선택해주세요');
            }
        });
    }, [nickname, defaultNickname]);

    const openNicknameEditor = useCallback(() => {
        setNicknameEditMode(true);
        const target = nicknameInput.current;
        if (target) {
            target.focus();
            target.setSelectionRange(target.value.length, target.value.length);
        }
    }, [nicknameInput]);
    const closeNicknameEditor = useCallback(() => {
        setNickname(defaultNickname);
        setNicknameEditMode(false);
    }, [defaultNickname]);

    return (
        <Wrapper editMode={nicknameEditMode}>
            <NicknameInput
                ref={nicknameInput}
                readOnly={!nicknameEditMode}
                maxLength={NICKNAME_MAX_LENGTH}
                value={nickname}
                onChange={onChangeNickname}
            />
            <WordCounter
                length={nickname?.length}
                maxLength={NICKNAME_MAX_LENGTH}
                show={nicknameEditMode}
            />
            <NicknameEditButton
                fontSize="sm"
                onClick={nicknameEditMode ? handleUpdateNickname : openNicknameEditor}
            >
                <MdEdit />
            </NicknameEditButton>
            {nicknameEditMode && (
                <NicknameCloseButton onClick={closeNicknameEditor} top={1} right={1} />
            )}
        </Wrapper>
    );
};

export default UserNicknameBox;
