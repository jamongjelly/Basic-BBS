import { darken } from 'polished';
import React from 'react';
import { BiLogIn, BiLogOut, BiArea } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { UserSummary } from 'src/models';
import styled, { css } from 'styled-components';

interface UserMenuProps {
    user?: UserSummary;
    onClickLogin: () => void;
    onClickLogout: () => void;
}

const MenuWrapper = styled.ul`
    width: 100%;
    height: 5rem;
    margin-bottom: 3rem;

    cursor: pointer;

    display: flex;

    ${({ theme }) => css`
        font-size: ${theme.size.md}rem;
        font-weight: ${theme.fontWeight.light};

        & > li:first-child {
            padding-left: ${theme.unit * 2}rem;
        }

        & > li:last-child {
            padding-right: ${theme.unit * 2}rem;
        }
    `}

    a,
    li {
        transition: background-color 0.2s ease-in-out;
    }
`;

const ItemWrapper = styled.li`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    & > a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ${({ theme }) => css`
        &:hover {
            background-color: ${darken(0.05, theme.color.menu)};
        }
        svg {
            margin-right: ${theme.unit}rem;
        }
    `}
`;

const UserMenuItem = React.memo(
    ({ children, ...rest }: React.LiHTMLAttributes<HTMLLIElement>) => {
        return <ItemWrapper {...rest}>{children}</ItemWrapper>;
    }
);

const UserMenu = ({ user, onClickLogin, onClickLogout }: UserMenuProps) => {
    return (
        <MenuWrapper>
            {user ? (
                <>
                    <UserMenuItem>
                        <Link to="/user/profile">
                            <CgProfile />
                            Profile
                        </Link>
                    </UserMenuItem>
                    <UserMenuItem>
                        <Link to="/user/activity">
                            <BiArea />
                            Activity
                        </Link>
                    </UserMenuItem>
                    <UserMenuItem onClick={onClickLogout}>
                        <div>
                            <BiLogOut />
                            Logout
                        </div>
                    </UserMenuItem>
                </>
            ) : (
                <UserMenuItem onClick={onClickLogin}>
                    <BiLogIn />
                    Login
                </UserMenuItem>
            )}
        </MenuWrapper>
    );
};

export default UserMenu;
