import React from 'react';
import ToggleButton from 'src/components/ui/buttons/ToggleButton';
import ProfileBox from 'src/components/ui/sidebar/ProfileBox';
import SidebarMenu from 'src/components/ui/sidebar/SidebarMenu';
import UserMenu from 'src/components/ui/sidebar/UserMenu';
import zIndexes from 'src/lib/styles/zIndexes';
import { UserSummary } from 'src/models';
import sidebarRoutes from 'src/routes/sidebarRoutes';
import styled, { css } from 'styled-components';

interface SidebarProps extends ToggleButtonProps {
    user?: UserSummary;
    onToggle: () => void;
    onClickLogin: () => void;
    onClickLogout: () => void;
    themeMode: boolean;
    toggleTheme: () => void;
}

interface ToggleProps {
    open: boolean;
}

interface ToggleButtonProps extends ToggleProps {
    toggleColor?: string;
}

const StyledAside = styled.aside<ToggleProps>`
    z-index: ${zIndexes.Sidebar};
    width: 100%;
    height: 100%;
    position: relative;

    overflow-y: scroll;

    transition: background-color 0.2s ease-in;

    &::-webkit-scrollbar {
        display: none;
    }

    ${({ theme }) => css`
        width: ${theme.size.sidebarWidth}rem;
        background-color: ${theme.color.menu};

        &,
        a {
            color: ${theme.color.menuText};
        }
    `}
`;

const SidebarFooter = styled.div`
    position: relative;

    ${({ theme }) => css`
        padding-bottom: ${theme.unit * 12.5}rem;
    `}
`;

const ThemeToggleButton = styled(ToggleButton)`
    position: fixed;
    bottom: 1rem;
    ${({ theme }) => css`
        left: ${theme.size.sidebarWidth - 6}rem;
    `}
`;

const Sidebar = ({
    user,
    open,
    onToggle,
    onClickLogin,
    onClickLogout,
    toggleColor,
    themeMode,
    toggleTheme,
    ...rest
}: SidebarProps) => {
    return (
        <StyledAside open={open} {...rest}>
            <ProfileBox user={user} />
            <UserMenu
                user={user}
                onClickLogin={onClickLogin}
                onClickLogout={onClickLogout}
            />
            <SidebarMenu menus={sidebarRoutes} />
            <ThemeToggleButton
                id="themeToggle"
                value={themeMode}
                onChange={toggleTheme}
            />
        </StyledAside>
    );
};

export default Sidebar;
