import React, { useCallback, useState } from 'react';
import Button from 'src/components/ui/buttons/Button';
import styled, { css } from 'styled-components';

interface ReplyEditorProps {
    onClickAdd: (value: string, callback: Function) => void;
}

const Wrapper = styled.div`
    display: flex;
`;

const editorSize = 9;

const StyledTextArea = styled.textarea`
    resize: none;
    outline: none;
    width: 100%;
    min-height: ${editorSize}rem;

    ${({ theme }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        border: 0.1rem solid ${theme.color.subMenu};
        padding: ${theme.unit * 3}rem;

        &::placeholder {
            color: ${theme.color.subText};
        }
    `}
`;

const ReplyEditor = ({ onClickAdd }: ReplyEditorProps) => {
    const [value, setValue] = useState<string>('');

    return (
        <Wrapper>
            <StyledTextArea
                placeholder={'댓글을 입력해주세요'}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <Button
                bgColor="#50D2BC"
                color="#fff"
                fontWeight="bold"
                width={`${editorSize}rem`}
                onClick={() => onClickAdd(value, () => setValue(''))}
            >
                등록
            </Button>
        </Wrapper>
    );
};

export default ReplyEditor;
