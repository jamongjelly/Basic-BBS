import {
    EMAIL_MAX_LENGTH,
    EMAIL_REGEX,
    NICKNAME_MAX_LENGTH,
    NICKNAME_MIN_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from 'src/constants';

export interface ValidationProps {
    status: '' | 'VALID' | 'INVALID';
    invalidMsg?: string;
}

export const validateEmail = (email: string): ValidationProps => {
    const limitMsg = `(길이 제한 : ${EMAIL_MAX_LENGTH}자 이하)`;
    if (!email) {
        return {
            status: 'INVALID',
            invalidMsg: '이메일을 입력해주세요',
        };
    }

    if (!EMAIL_REGEX.test(email)) {
        return {
            status: 'INVALID',
            invalidMsg: '이메일 형식이 아닙니다',
        };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
        return {
            status: 'INVALID',
            invalidMsg: `이메일이 너무 깁니다 ${limitMsg}`,
        };
    }

    return {
        status: '',
    };
};

export const validateNickname = (nickname: string): ValidationProps => {
    const limitMsg = `(길이 제한 : ${NICKNAME_MIN_LENGTH}~${NICKNAME_MAX_LENGTH}자)`;
    if (!nickname) {
        return {
            status: 'INVALID',
            invalidMsg: '닉네임을 입력해주세요',
        };
    }

    if (nickname.length < NICKNAME_MIN_LENGTH) {
        return {
            status: 'INVALID',
            invalidMsg: `닉네임이 너무 짧습니다 ${limitMsg}`,
        };
    }

    if (nickname.length > NICKNAME_MAX_LENGTH) {
        return {
            status: 'INVALID',
            invalidMsg: `닉네임이 너무 깁니다 ${limitMsg}`,
        };
    }

    return {
        status: '',
    };
};

export const validatePassword = (password: string): ValidationProps => {
    const limitMsg = `(길이 제한 : ${PASSWORD_MIN_LENGTH}~${PASSWORD_MAX_LENGTH}자)`;

    if (!password) {
        return {
            status: 'INVALID',
            invalidMsg: '비밀번호를 입력해주세요',
        };
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return {
            status: 'INVALID',
            invalidMsg: `비밀번호가 너무 짧습니다 ${limitMsg}`,
        };
    }

    if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            status: 'INVALID',
            invalidMsg: `비밀번호가 너무 깁니다 ${limitMsg}`,
        };
    }

    return {
        status: 'VALID',
    };
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): ValidationProps => {
    if (!confirmPassword) {
        return {
            status: 'INVALID',
            invalidMsg: '확인용 비밀번호를 입력해주세요',
        };
    }

    if (
        password === confirmPassword &&
        confirmPassword.length >= PASSWORD_MIN_LENGTH &&
        confirmPassword.length <= PASSWORD_MAX_LENGTH
    ) {
        return {
            status: 'VALID',
        };
    }

    return {
        status: 'INVALID',
        invalidMsg: '비밀번호가 일치하지 않습니다',
    };
};

export const validatePostForm = (
    locBoardId: number | undefined,
    title: string,
    content: string
) => {
    if (!locBoardId) {
        alert('게시판을 선택해주세요');
        return false;
    } else if (title.length === 0) {
        alert('제목을 입력해주세요');
        return false;
    } else if (content.length === 0) {
        alert('내용을 입력해주세요');
        return false;
    }
    return true;
};

export const validateReplyForm = (content: string) => {
    if (content.trim().length === 0) {
        alert('내용을 입력해주세요');
        return false;
    }
    return true;
};

export const validateTodoForm = (text: string) => {
    if (text.trim().length === 0) {
        alert('내용을 입력해주세요');
        return false;
    }
    return true;
};
