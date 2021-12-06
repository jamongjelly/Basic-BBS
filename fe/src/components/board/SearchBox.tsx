import React, { useEffect, useState } from 'react';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Selector from 'src/components/ui/Selector';
import { convertStringToSearchType } from 'src/lib/utils/typeUtils';
import { SearchType } from 'src/redux/modules/post';
import styled, { css } from 'styled-components';

interface SearchBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    path: string;
    pageNum?: number;
    pageSize?: number;
    defaultSearchType?: SearchType;
    defaultKeyword: string;
    onEnterSearchInput: (
        event: React.KeyboardEvent<HTMLInputElement>,
        searchUrl: string
    ) => void;
}

const Wrapper = styled.div`
    height: 3.5rem;
    outline: none;

    display: flex;

    ${({ theme }) => css`
        color: ${theme.color.subText};
    `}

    & > * + * {
        margin-left: 1rem;
    }
`;

const SearchInput = styled.input`
    border: none;
    outline: none;

    ${({ theme }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        border-bottom: 0.2rem solid ${theme.color.subMenu};
        padding: 0 ${theme.unit * 2}rem;
    `}

    &::placeholder {
        ${({ theme }) => css`
            color: ${theme.color.subText};
        `}
    }
`;

const searchButtonSize = 3;

const SearchButton = styled(Link)`
    display: flex;
    align-items: center;

    svg {
        width: ${searchButtonSize}rem;
        height: ${searchButtonSize}rem;
    }
`;

const SearchBox = ({
    path,
    pageNum,
    pageSize,
    defaultSearchType = '',
    defaultKeyword,
    onEnterSearchInput,
    ...rest
}: SearchBoxProps) => {
    const [searchType, setSearchType] = useState(defaultSearchType);
    const [keyword, setKeyword] = useState(defaultKeyword);

    useEffect(() => {
        setSearchType(defaultSearchType);
        setKeyword(defaultKeyword);
    }, [defaultSearchType, defaultKeyword]);

    const searchUrl = `/board/${path}?${pageNum ? `pageNum=${pageNum}&` : ''}${
        pageSize ? `pageSize=${pageSize}&` : ''
    }${searchType ? `searchType=${searchType}&` : ''}${
        keyword ? `keyword=${keyword}` : ''
    }`;

    return (
        <Wrapper {...rest}>
            <Selector
                value={searchType}
                onChange={(event) =>
                    setSearchType(convertStringToSearchType(event.target.value))
                }
            >
                <option value="">전체</option>
                <option value="t">제목</option>
                <option value="c">내용</option>
                <option value="w">작성자</option>
                <option value="tc">제목+내용</option>
            </Selector>
            <SearchInput
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={(event) => onEnterSearchInput(event, searchUrl)}
            />
            <SearchButton to={searchUrl}>
                <IoSearchCircleSharp />
            </SearchButton>
        </Wrapper>
    );
};

export default SearchBox;
