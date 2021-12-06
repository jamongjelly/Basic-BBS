import React from 'react';
import SocialLogin from 'src/components/auth/SocialLogin';
import ModalOverlay from 'src/components/ui/ModalOverlay';
import styled, { css } from 'styled-components';
import CloseButton from 'src/components/ui/buttons/CloseButton';
import palette from 'src/styles/palette';
import { AuthMode } from 'src/redux/modules/auth';
import { AuthFormContainer } from 'src/pages/containers';

interface AuthModalProps {
    visible: boolean;
    mode: AuthMode;
    onCloseModal: () => void;
}

interface ModalStyleProps {
    mode: AuthMode;
}

const ModalWrapper = styled.div<ModalStyleProps>`
    width: 65rem;
    max-height: 100vh;

    position: relative;
    display: flex;
    overflow: hidden;

    transition: height 0.2s ease-out;

    ${({ theme, mode }) => css`
        background-color: ${theme.color.background};
        border-radius: ${theme.unit * 4}rem;
        height: ${mode === 'LOGIN' ? 47 : 60}rem;
    `}
`;

const SideSection = styled.section`
    width: 22rem;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${({ theme }) => css`
        background-color: ${theme.color.logo};
        h2 {
            color: ${theme.color.background};
            font-size: ${theme.size.h1}rem;
            font-weight: ${theme.fontWeight.bold};
        }
    `}

    & > * + * {
        margin-top: 3rem;
    }

    span {
        color: ${palette.coral[0]};
    }
`;

const ModalContentsSection = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    ${({ theme }) => css`
        padding: ${theme.unit * 7}rem;
        padding-top: ${theme.unit * 15}rem;
    `}

    & > form {
        flex: 1;
    }
`;

const AuthModal = ({ visible, mode, onCloseModal }: AuthModalProps) => {
    return (
        <ModalOverlay visible={visible} onClick={onCloseModal}>
            <ModalWrapper mode={mode}>
                <SideSection>
                    <h2>
                        <span>Basic</span>
                    </h2>
                    <h2>BBS</h2>
                </SideSection>
                <ModalContentsSection>
                    <AuthFormContainer />
                    <SocialLogin mode={mode} />
                </ModalContentsSection>
                <CloseButton onClick={onCloseModal} top={1} right={1} />
            </ModalWrapper>
        </ModalOverlay>
    );
};

export default React.memo(AuthModal);
