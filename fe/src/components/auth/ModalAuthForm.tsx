import React, { ChangeEvent } from 'react';
import Button from 'src/components/ui/buttons/Button';
import TransparentButton from 'src/components/ui/buttons/TransparentButton';
import { AuthMode } from 'src/redux/modules/auth';
import palette from 'src/styles/palette';
import styled, { css } from 'styled-components';

interface ModalAuthFormProps {
    mode: AuthMode;
    onToggleMode: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    inputs: JSX.Element;
    onSubmitLoginForm: (event: React.FormEvent) => void;
    onSubmitJoinForm: (event: React.FormEvent) => void;
    isFormInvalid: () => boolean;
}

const FormTitle = styled.h4`
    ${({ theme }) => css`
        font-weight: ${theme.fontWeight.bold};
    `}
`;

const Form = styled.form`
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
`;

const AuthLinkBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
        border: none;
        outline: none;
        background-color: transparent;
    }

    ${({ theme }) => css`
        margin-top: 1rem;
        button {
            color: ${theme.color.highlight};
            font-size: ${theme.size.md}rem;
            font-weight: ${theme.fontWeight.bold};
        }
    `}
`;

const ModalAuthForm = ({
    mode,
    onToggleMode,
    inputs,
    onSubmitLoginForm,
    onSubmitJoinForm,
    isFormInvalid,
}: ModalAuthFormProps) => {
    const modeText = mode === 'LOGIN' ? '로그인' : '회원가입';

    return (
        <>
            <FormTitle>{modeText}</FormTitle>
            <Form
                onSubmit={(event) =>
                    mode === 'LOGIN' ? onSubmitLoginForm(event) : onSubmitJoinForm(event)
                }
            >
                {inputs}
                <Button
                    type="submit"
                    size="lg"
                    bgColor={palette.blue[1]}
                    color="#fff"
                    disabled={isFormInvalid()}
                >
                    {modeText}
                </Button>
                <AuthLinkBox>
                    <p>
                        {mode === 'LOGIN'
                            ? '신규 가입을 원하시나요?'
                            : '아이디가 있으신가요?'}
                    </p>
                    <TransparentButton onClick={(event) => onToggleMode(event)}>
                        {mode === 'LOGIN' ? '회원가입' : '로그인'}
                    </TransparentButton>
                </AuthLinkBox>
            </Form>
        </>
    );
};

export default React.memo(ModalAuthForm);
