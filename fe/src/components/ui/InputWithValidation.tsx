import React from 'react';
import { MdCheckCircle, MdRemoveCircle } from 'react-icons/md';
import Input from 'src/components/ui/Input';
import { InputProps } from 'src/components/ui/Input';
import { ValidationStatus } from 'src/models';
import styled, { css } from 'styled-components';

interface InputValidationProps extends InputProps, InputValidationStyleProps {
    validMsg: string;
    invalidMsg?: string;
}

interface InputValidationStyleProps {
    status?: ValidationStatus;
}

const Wrapper = styled.div<InputValidationStyleProps>`
    margin-bottom: 5px;

    ${({ status }) => css`
        & > input {
            ${status === 'INVALID' && 'box-shadow: 0 0 0.5rem red;'}
        }
        & > span {
            ${(status === 'VALID' && 'color: #11C807;') ||
            (status === 'INVALID' && 'color: red;')}
        }
    `}
`;

const StyledInput = styled(Input)`
    width: 100%;
`;

const MessageBox = styled.span`
    height: 2rem;
    margin-left: 0.5rem;
    font-size: 1.3rem;

    display: flex;
    align-items: center;

    svg {
        margin-right: 0.4rem;
        font-size: 1.5rem;
    }
`;

const InputWithValidation = ({
    value,
    status,
    size,
    maxLength,
    onChange,
    onBlur,
    validMsg,
    invalidMsg,
    style,
    ...rest
}: InputValidationProps) => {
    return (
        <Wrapper status={status} style={style}>
            <StyledInput
                value={value}
                maxLength={maxLength}
                onChange={onChange}
                onBlur={onBlur}
                size={size}
                {...rest}
            />
            <MessageBox>
                {(status === 'VALID' && validMsg && (
                    <>
                        <MdCheckCircle color="#11C807" />
                        {validMsg}
                    </>
                )) ||
                    (status === 'INVALID' && (
                        <>
                            <MdRemoveCircle color="red" />
                            {invalidMsg}
                        </>
                    ))}
            </MessageBox>
        </Wrapper>
    );
};

InputWithValidation.defaultProps = {
    fontSize: 'md',
};

export default InputWithValidation;
