import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { SidebarMenuRoute } from 'src/routes/sidebarRoutes';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import styledCSS from 'src/lib/styles/styledCSS';

interface SidebarMenuProps {
    menus?: SidebarMenuRoute[];
}

const sidebarItemHeight = 5.5;
const sidebarItemPadding = 3;
const selectedItemColor = (color: string) => darken(0.05, color);

const Menu = styled.ul`
    & > li + li {
        margin-top: 1rem;
    }
`;

const MenuItemLabel = styled.span`
    overflow: hidden;
    text-align: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${({ theme }) => css`
        width: ${theme.size.sidebarWidth -
        (sidebarItemPadding + theme.size.lg + 1) * 2}rem;
    `}
`;

const MenuItem = styled.li`
    height: ${sidebarItemHeight}rem;
    transition: all 0.2s ease-in-out;

    ${({ theme: { size, fontWeight } }) => css`
        font-size: ${size.lg}rem;
        font-weight: ${fontWeight.light};
    `}

    svg {
        position: absolute;
        left: ${sidebarItemPadding}rem;

        ${({ theme: { size } }) => css`
            width: ${size.lg}rem;
            height: ${size.lg}rem;
            top: ${(sidebarItemHeight - size.lg) / 2}rem;
        `}
    }

    &:hover {
        ${({ theme: { color } }) => css`
            background-color: ${selectedItemColor(color.menu)};
            & > a {
                color: ${color.text};
            }
        `}
    }
`;

const activeClassName = 'selected';

const Marker = styled.span`
    width: 0.6rem;
    height: 100%;
    background-color: transparent;

    position: absolute;
    top: 0;
    left: 0;

    transition: background-color 0.2s ease-in;
`;

const StyledNavLink = styled(NavLink)`
    width: 100%;
    height: 100%;
    padding: 0 ${sidebarItemPadding}rem;

    position: relative;
    ${styledCSS.flexCenter}

    ${({ theme: { color } }) => css`
        &.${activeClassName} {
            background-color: ${selectedItemColor(color.menu)};
            color: ${color.text};

            ${Marker} {
                background-color: ${color.highlight};
            }
        }
    `}
`;

interface SidebarMenuItemProps extends RouteComponentProps {
    menu: SidebarMenuRoute;
}

const SidebarMenuItem = withRouter(({ menu, location }: SidebarMenuItemProps) => {
    return (
        <MenuItem>
            <StyledNavLink
                exact={menu.exact}
                to={{
                    pathname: menu.path,
                    state: {
                        from: location,
                    },
                }}
                activeClassName={activeClassName}
            >
                <Marker />
                <menu.icon />
                <MenuItemLabel>{menu.label}</MenuItemLabel>
            </StyledNavLink>
        </MenuItem>
    );
});

const SidebarMenu = ({ menus, ...rest }: SidebarMenuProps) => {
    return (
        <Menu {...rest}>
            {menus &&
                menus.map((menu) => <SidebarMenuItem key={menu.path} menu={menu} />)}
        </Menu>
    );
};

export default React.memo(SidebarMenu);
