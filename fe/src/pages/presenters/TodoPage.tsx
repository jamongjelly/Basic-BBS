import React from 'react';
import TodoPageTemplate from 'src/components/todo/TodoPageTemplate';
import { TodoContainer } from 'src/pages/containers';
import styled, { css } from 'styled-components';

const Typhography = styled.div`
    padding: 2rem;
    color: #fff;
    flex: 1;

    ${({ theme: { fontWeight } }) => css`
        font-weight: ${fontWeight.bold};
    `}
`;

const TodoPage = () => {
    return (
        <TodoPageTemplate bgColor="#090023">
            <Typhography></Typhography>
            <TodoContainer />
        </TodoPageTemplate>
    );
};

export default TodoPage;
