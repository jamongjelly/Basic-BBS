import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface PageTemplateWrapperProps {
    vertical?: boolean;
    center?: boolean;
    children: ReactNode;
}

interface PageTemplateProps extends PageTemplateWrapperProps {}

const Wrapper = styled.section<PageTemplateWrapperProps>`
    width: 100%;
    height: 100%;
    padding: 4rem;

    ${({ vertical, center }) => css`
        display: flex;
        flex-direction: ${vertical ? 'row' : 'column'};
        ${center &&
        `
            justify-content: center;
            align-items: center;
        `}
    `}
`;

const PageTemplate = ({ vertical, center, children }: PageTemplateProps) => {
    return (
        <Wrapper vertical={vertical} center={center}>
            {children}
        </Wrapper>
    );
};

export default React.memo(PageTemplate);
