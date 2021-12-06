import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'src/components/ui/buttons/Button';
import Input from 'src/components/ui/Input';
import PageTemplate from 'src/components/ui/PageTemplate';
import { authActions } from 'src/redux/modules/auth';
import palette from 'src/styles/palette';
import styled, { css } from 'styled-components';

const Jumbotron = styled.div`
    width: 80%;
    height: 30rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
        margin-bottom: 3rem;
    }

    div {
        label {
            margin-right: 1rem;
        }

        input {
            border-radius: 0.5rem;
        }

        button {
            margin-left: 1rem;
        }
    }

    ${({ theme }) => css`
        background-color: ${theme.color.menu};
        border-radius: ${theme.unit * 4}rem;
    `}
`;

const UnregisterPage = () => {
    const dispatch = useDispatch();
    const [confirmPassword, setConfirmPassword] = useState('');

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConfirmPassword(value);
    }, []);

    const onClickConfirm = useCallback((password: string) => {
        dispatch(authActions.unregisterAsync.request({ password }));
    }, []);

    return (
        <PageTemplate center>
            <Jumbotron>
                <h3>정말 탈퇴하시겠습니까?</h3>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인 :</label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={onChange}
                    />
                    <Button
                        bgColor={palette.mint[0]}
                        color={palette.white[0]}
                        fontWeight="bold"
                        onClick={() => onClickConfirm(confirmPassword)}
                    >
                        확인
                    </Button>
                </div>
            </Jumbotron>
        </PageTemplate>
    );
};

export default UnregisterPage;
