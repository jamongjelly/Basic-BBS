import React, { ChangeEvent, useEffect, useRef } from 'react';
import Button from 'src/components/ui/buttons/Button';
import palette from 'src/styles/palette';
import styled, { css } from 'styled-components';

interface TodoInputProps {
    show: boolean;
    name: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
`;

const StyledInput = styled.input`
    width: 100%;
    margin-right: 0.5rem;
    padding: 0.7rem 1.5rem;
    outline: none;
    ${({ theme }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        border: 0.1rem solid ${theme.color.subMenu};

        &::placeholder {
            color: ${theme.color.subText};
        }
    `}
`;

const TodoInput = ({
    show,
    name,
    placeholder,
    value,
    onChange,
    ...rest
}: TodoInputProps) => {
    const todoInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (show) {
            todoInput.current?.focus();
        }
    }, [show, todoInput]);

    return (
        <Wrapper>
            <StyledInput
                ref={todoInput}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...rest}
            />
            <Button
                type="submit"
                bgColor={palette.mint[0]}
                fontWeight="bold"
                color="#FFF"
            >
                등록
            </Button>
        </Wrapper>
    );
};

export default TodoInput;
