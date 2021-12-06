import React, { ReactNode, useCallback, useState } from 'react';
import styledCSS from 'src/lib/styles/styledCSS';
import zIndexes from 'src/lib/styles/zIndexes';
import styled, { css, keyframes } from 'styled-components';

interface ModalWrapperProps {
    visible: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const Wrapper = styled.div<{ visible: boolean }>`
    z-index: ${zIndexes.Popup};
    overflow: auto;
    ${styledCSS.overlay}
    ${styledCSS.flexCenter}

    ${({ visible }) => !visible && 'display: none;'}
`;

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const appear = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const disappear = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

interface ModalContentProps {
    visible: boolean;
}

const ModalContent = styled.div<ModalContentProps>`
    z-index: ${zIndexes.Popup + 1};

    ${({ visible }) =>
        visible
            ? css`
                  animation: ${appear} 0.2s ease-in-out;
                  animation-fill-mode: forwards;
              `
            : css`
                  animation: ${disappear} 0.2s ease-in-out;
                  animation-fill-mode: forwards;
              `}
`;

const ModalOverlay = ({ visible, onClick, children }: ModalWrapperProps) => {
    return (
        <Wrapper visible={visible}>
            <Overlay onClick={onClick} />
            <ModalContent visible={visible}>{children}</ModalContent>
        </Wrapper>
    );
};

export default ModalOverlay;
