import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface TodoPageTemplateProps extends TodoPageTemplateWrapperProps {
    children: ReactNode;
}

interface TodoPageTemplateWrapperProps {
    bgColor?: string;
}

const Wrapper = styled.main<TodoPageTemplateWrapperProps>`
    background-color: ${({ bgColor }) => bgColor};
    width: 100%;
    height: 100%;
    padding: 2rem;

    display: flex;
`;

const TodoPageTemplate = ({ bgColor, children }: TodoPageTemplateProps) => {
    return <Wrapper bgColor={bgColor}>{children}</Wrapper>;
};

export default TodoPageTemplate;
