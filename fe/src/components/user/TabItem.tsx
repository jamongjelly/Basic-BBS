import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export type TabItemType = {
    name: string;
    type: string;
    activeColor: string;
};

interface TabItemProps extends TabItemStyleProps {
    item: TabItemType;
    index: number;
    onClick: (index: number) => void;
}

interface TabItemStyleProps {
    active: boolean;
}

const Wrapper = styled.li<TabItemStyleProps>`
    margin: 0 0.6rem;
    cursor: pointer;

    position: relative;

    &,
    & > a {
        transition: 0.3s;
    }

    ${({ theme, active, color }) => css`
        a {
            color: ${active ? color : theme.color.subText};
            font-size: ${theme.size.md}rem;
        }
    `}

    a {
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:before {
            background-color: #dfe2ea;
            width: 100%;
            height: 0.5rem;
            border-radius: 0.8rem 0.8rem 0 0;

            content: '';

            position: absolute;
            left: 0;
            bottom: -0.6rem;

            transition: 0.3s;
        }

        &:hover:before {
            opacity: 1;
            bottom: 0;
        }
    }
`;

const TabItem = React.forwardRef<HTMLLIElement, TabItemProps>(
    ({ item, index, active, onClick }, ref) => {
        return (
            <Wrapper
                ref={active ? ref : undefined}
                active={active}
                color={item.activeColor}
            >
                <Link
                    to={{ pathname: '/user/activity', search: `?type=${item.type}` }}
                    onClick={() => onClick(index)}
                >
                    {item.name}
                </Link>
            </Wrapper>
        );
    }
);

export default React.memo(TabItem);
