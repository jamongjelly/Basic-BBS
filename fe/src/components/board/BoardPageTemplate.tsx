import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface BoardPageTemplateProps {
    children: ReactNode;
}

const Wrapper = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${({ theme: { size } }) => css`
        padding: 0 ${size.nav}rem 7rem ${size.nav}rem;
    `}
`;

const BoardPageTemplate = ({ children }: BoardPageTemplateProps) => {
    return <Wrapper>{children}</Wrapper>;
};

export default BoardPageTemplate;
