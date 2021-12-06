import React, { useCallback, useEffect, useRef, useState } from 'react';
import TabItem, { TabItemType } from 'src/components/user/TabItem';
import styled, { css } from 'styled-components';

interface UserActivityTabBarProps {
    type: string;
    onClickInitData: () => void;
}

const Nav = styled.nav`
    overflow: hidden;
    padding: 0 2rem;

    position: relative;
    display: inline-flex;

    ${({ theme }) => css`
        box-shadow: 0 0.2rem 1rem ${theme.shadow.level1};
        border-radius: ${theme.unit * 20}rem;
    `}
`;

const NavMenu = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
`;

type ActiveStyleType = {
    width: number;
    left: number;
    color: string;
};

const NavIndicator = styled.span<{ activeStyle: ActiveStyleType }>`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.5rem;
    border-radius: 0.8rem 0.8rem 0 0;

    transition: 0.4s;

    ${({ activeStyle }) => css`
        background-color: ${activeStyle.color};
        width: ${activeStyle.width}px;
        left: ${activeStyle.left}px;
    `}
`;

const items: TabItemType[] = [
    {
        name: 'Posts',
        type: 'post',
        activeColor: 'orange',
    },
    { name: 'Replies', type: 'reply', activeColor: 'green' },
    { name: 'Likes', type: 'like', activeColor: 'red' },
];

const UserActivityTabBar = ({ type, onClickInitData }: UserActivityTabBarProps) => {
    const [activeItem, setActiveItem] = useState(
        items.findIndex((item) => item.type === type)
    );
    const [activeStyle, setActiveStyle] = useState<ActiveStyleType>({
        width: 0,
        left: 0,
        color: '',
    });
    const activeChild = useRef<HTMLLIElement>(null);

    const onClickItem = useCallback(
        (index: number) => {
            setActiveItem(index);
            onClickInitData();
        },
        [activeStyle]
    );

    useEffect(() => {
        if (activeChild.current) {
            const target = activeChild.current;
            setActiveStyle({
                width: target.offsetWidth,
                left: target.offsetLeft,
                color: items[activeItem].activeColor,
            });
        }
    }, [activeItem, activeChild]);

    return (
        <Nav>
            <NavMenu>
                {items &&
                    items.map((item, idx) => (
                        <TabItem
                            key={item.name}
                            ref={activeChild}
                            index={idx}
                            item={item}
                            active={activeItem === idx}
                            onClick={onClickItem}
                        />
                    ))}
                <NavIndicator activeStyle={activeStyle} />
            </NavMenu>
        </Nav>
    );
};

export default UserActivityTabBar;
