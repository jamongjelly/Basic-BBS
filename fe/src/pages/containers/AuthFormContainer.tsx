import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalAuthForm from 'src/components/auth/ModalAuthForm';
import InputWithValidation from 'src/components/ui/InputWithValidation';
import { RootState } from 'src/redux';
import { authActions } from 'src/redux/modules/auth';
import {
    validateConfirmPassword,
    validateEmail,
    validateNickname,
    validatePassword,
    ValidationProps,
} from 'src/lib/utils/validationUtils';
import {
    EMAIL_MAX_LENGTH,
    NICKNAME_MAX_LENGTH,
    NICKNAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from 'src/constants';
import * as userAPI from 'src/lib/api/userAPI';

interface StatusFieldForm extends ValidationProps {
    value: string;
}

const fieldForm: StatusFieldForm = {
    value: '',
    status: '',
    invalidMsg: '',
};

const loginFormState = {
    email: fieldForm,
    password: fieldForm,
};

const joinFormState = {
    email: fieldForm,
    nickname: fieldForm,
    password: fieldForm,
    confirmPassword: fieldForm,
};

const AuthFormContainer = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.auth.authModal.mode);

    const [loginForm, setLoginForm] = useState(loginFormState);
    const [joinForm, setJoinForm] = useState(joinFormState);

    const onToggleMode = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            dispatch(authActions.changeAuthModalMode());
            if (mode === 'LOGIN') {
                setLoginForm(loginFormState);
            } else {
                setJoinForm(joinFormState);
            }
        },
        [mode]
    );

    const onChangeLoginForm = useCallback(
        (name: keyof typeof loginFormState, value: string) => {
            value = value.trim();
            setLoginForm((prevState) => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value,
                },
            }));
        },
        []
    );

    const onChangeJoinForm = useCallback(
        (
            name: keyof typeof joinFormState,
            value: string,
            validationFunc: ValidationProps
        ) => {
            value = value.trim();
            setJoinForm((prevState) => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value,
                    ...validationFunc,
                },
            }));

            if (name === 'password') {
                setJoinForm((prevState) => ({
                    ...prevState,
                    confirmPassword: {
                        ...prevState.confirmPassword,
                        status: '',
                    },
                }));
            }
        },
        [joinForm]
    );

    const onBlurInput = useCallback(
        (name: keyof typeof joinFormState, initValidation: ValidationProps) => {
            setJoinForm((prevState) => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    ...initValidation,
                },
            }));
        },
        []
    );

    const onBlurAxiosInput = useCallback(
        (
            name: keyof typeof joinFormState,
            value: string,
            asyncFunc: ((value: string) => Promise<any>) | null,
            initValidation: ValidationProps,
            invalidMsg: string,
            minLength: number | null,
            maxLength: number
        ) => {
            onBlurInput(name, initValidation);

            if (
                asyncFunc &&
                initValidation.status !== 'INVALID' &&
                value.length >= (minLength || 1) &&
                value.length <= maxLength
            ) {
                asyncFunc(value).then((response) => {
                    if (response.available) {
                        setJoinForm((prevState) => ({
                            ...prevState,
                            [name]: {
                                ...prevState[name],
                                status: 'VALID',
                            },
                        }));
                    } else {
                        setJoinForm((prevState) => ({
                            ...prevState,
                            [name]: {
                                ...prevState[name],
                                status: 'INVALID',
                                invalidMsg,
                            },
                        }));
                    }
                });
            }
        },
        [onBlurInput]
    );

    const onSubmitLoginForm = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            dispatch(
                authActions.loginAsync.request({
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                })
            );
        },
        [mode, loginForm]
    );

    const onSubmitJoinForm = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            dispatch(
                authActions.joinAsync.request({
                    email: joinForm.email.value,
                    nickname: joinForm.nickname.value,
                    password: joinForm.password.value,
                })
            );
        },
        [mode, joinForm]
    );

    const isFormInvalid = useCallback(() => {
        if (mode === 'LOGIN') {
            return !(
                loginForm.email.value.length !== 0 &&
                loginForm.password.value.length !== 0
            );
        } else {
            return !(
                joinForm.email.status === 'VALID' &&
                joinForm.nickname.status === 'VALID' &&
                joinForm.password.status !== 'INVALID' &&
                joinForm.confirmPassword.status === 'VALID'
            );
        }
    }, [mode, loginForm, joinForm]);

    const inputs =
        mode === 'LOGIN' ? (
            <>
                <InputWithValidation
                    type="email"
                    placeholder="이메일"
                    maxLength={EMAIL_MAX_LENGTH + 1}
                    value={loginForm.email.value}
                    onChange={(event) => onChangeLoginForm('email', event.target.value)}
                    fontSize="lg"
                    status={loginForm.email.status}
                    validMsg="성공"
                    invalidMsg={loginForm.email.invalidMsg}
                />
                <InputWithValidation
                    type="password"
                    placeholder="비밀번호"
                    maxLength={PASSWORD_MAX_LENGTH + 1}
                    value={loginForm.password.value}
                    onChange={(event) =>
                        onChangeLoginForm('password', event.target.value)
                    }
                    fontSize="lg"
                    status={loginForm.password.status}
                    validMsg="성공"
                    invalidMsg={loginForm.password.invalidMsg}
                />
            </>
        ) : (
            <>
                <InputWithValidation
                    type="email"
                    placeholder="이메일"
                    maxLength={EMAIL_MAX_LENGTH + 1}
                    value={joinForm.email.value}
                    onChange={(event) =>
                        onChangeJoinForm(
                            'email',
                            event.target.value,
                            validateEmail(event.target.value)
                        )
                    }
                    fontSize="lg"
                    status={joinForm.email.status}
                    validMsg="사용 가능한 이메일입니다"
                    invalidMsg={joinForm.email.invalidMsg}
                    onBlur={(event) =>
                        onBlurAxiosInput(
                            'email',
                            event.target.value,
                            userAPI.checkEmail,
                            validateEmail(event.target.value),
                            '이미 등록된 이메일입니다',
                            null,
                            EMAIL_MAX_LENGTH
                        )
                    }
                />
                <InputWithValidation
                    type="text"
                    placeholder="닉네임"
                    maxLength={NICKNAME_MAX_LENGTH + 1}
                    value={joinForm.nickname.value}
                    onChange={(event) =>
                        onChangeJoinForm(
                            'nickname',
                            event.target.value,
                            validateNickname(event.target.value)
                        )
                    }
                    fontSize="lg"
                    status={joinForm.nickname.status}
                    validMsg="사용 가능한 닉네임입니다"
                    invalidMsg={joinForm.nickname.invalidMsg}
                    onBlur={(event) =>
                        onBlurAxiosInput(
                            'nickname',
                            event.target.value,
                            userAPI.checkNickname,
                            validateNickname(event.target.value),
                            '사용 중인 닉네임입니다.',
                            NICKNAME_MIN_LENGTH,
                            NICKNAME_MAX_LENGTH
                        )
                    }
                />
                <InputWithValidation
                    type="password"
                    placeholder="비밀번호"
                    maxLength={PASSWORD_MAX_LENGTH + 1}
                    value={joinForm.password.value}
                    onChange={(event) =>
                        onChangeJoinForm(
                            'password',
                            event.target.value,
                            validatePassword(event.target.value)
                        )
                    }
                    fontSize="lg"
                    status={joinForm.password.status}
                    validMsg=""
                    invalidMsg={joinForm.password.invalidMsg}
                    onBlur={(event) =>
                        onBlurInput('password', validatePassword(event.target.value))
                    }
                />
                <InputWithValidation
                    type="password"
                    placeholder="비밀번호 확인"
                    maxLength={PASSWORD_MAX_LENGTH + 1}
                    value={joinForm.confirmPassword.value}
                    onChange={(event) =>
                        onChangeJoinForm(
                            'confirmPassword',
                            event.target.value,
                            validateConfirmPassword(
                                joinForm.password.value,
                                event.target.value
                            )
                        )
                    }
                    fontSize="lg"
                    status={joinForm.confirmPassword.status}
                    validMsg="비밀번호가 일치합니다"
                    invalidMsg={joinForm.confirmPassword.invalidMsg}
                    onBlur={(event) =>
                        onBlurInput(
                            'confirmPassword',
                            validateConfirmPassword(
                                joinForm.password.value,
                                event.target.value
                            )
                        )
                    }
                />
            </>
        );

    return (
        <ModalAuthForm
            mode={mode}
            onToggleMode={onToggleMode}
            inputs={inputs}
            onSubmitLoginForm={onSubmitLoginForm}
            onSubmitJoinForm={onSubmitJoinForm}
            isFormInvalid={isFormInvalid}
        />
    );
};

export default AuthFormContainer;
