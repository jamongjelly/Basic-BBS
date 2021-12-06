import React, { useCallback } from 'react';
import TransparentButton from 'src/components/ui/buttons/TransparentButton';
import UserIcon from 'src/components/ui/UserIcon';
import { changePostDateFormat } from 'src/lib/utils/dateUtils';
import { PostDetail, UserSummary } from 'src/models';
import styled, { css } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReplyContainer } from 'src/pages/containers';
import 'react-quill/dist/quill.snow.css';
import { BsArrowLeft } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import PostLikeBox from 'src/components/board/PostLikeBox';
import palette from 'src/styles/palette';

interface PostViewerProps extends RouteComponentProps {
    currentPost: PostDetail;
    currentUser: UserSummary | null;
    onClickDelete: (postId: number) => void;
    onClickLike: (postId: number, like: boolean) => void;
}

const Article = styled.article`
    width: 90%;
    margin-bottom: 3rem;
`;

const PostHeader = styled.header`
    padding: 2rem;
    display: flex;
    flex-direction: column;

    ${({ theme }) => css`
        border-bottom: 0.1rem solid ${theme.shadow.level2};
    `}
`;

const HeaderInfoBox = styled.div`
    display: flex;
`;

const HeaderLeftSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostTitle = styled.h2``;

const HeaderRightSection = styled.div`
    margin-left: auto;
    flex: none;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > div + div {
        margin-top: 1rem;
    }
`;

const CountInfo = styled.ul`
    width: 100%;
    margin-top: auto;
    flex: none;

    display: flex;
    justify-content: flex-end;

    ${({ theme }) => css`
        color: ${theme.color.subText};
    `}

    svg {
        margin-right: 0.5rem;
    }

    li {
        display: flex;
        align-items: center;
    }

    li + li {
        margin-left: 1rem;
    }
`;

const DateTime = styled.div`
    margin-top: 1.2rem;
    margin-left: 0.5rem;

    ${({ theme }) => css`
        color: ${theme.color.subText};
        font-size: ${theme.size.sm}rem;
    `}
`;

const PostBody = styled.section`
    width: 100%;
`;

const PostContents = styled.div`
    min-height: 20rem;
    padding: 4rem 2rem;
`;

const PostFooter = styled.footer`
    display: flex;
    flex-direction: column;
`;

const HeaderSubInfoBox = styled.div`
    margin-top: 0.5rem;

    display: flex;
    align-items: center;

    ${({ theme }) => css`
        box-shadow: 0 0 0.4rem ${theme.shadow.level2};
        color: ${theme.color.menuText};
        padding-left: ${theme.unit}rem;
        p {
            border-left: 0.1rem solid ${theme.shadow.level2};
            margin: ${theme.unit * 2}rem 0;
            padding-left: ${theme.unit * 2}rem;
        }
    `}
`;

const PostNav = styled.div`
    height: 7rem;
    display: flex;
    align-items: center;

    ${({ theme }) => css`
        padding: ${theme.unit * 3}rem 0;

        a,
        svg {
            color: ${theme.color.subText};
        }

        svg {
            margin-right: ${theme.unit * 2}rem;
        }
    `}

    a {
        display: flex;
        align-items: center;
    }

    a:hover,
    button:hover {
        filter: brightness(140%);
    }

    div {
        margin-left: auto;
        flex: none;
        display: flex;
        align-items: center;
    }
`;

const WriterButtons = styled.div`
    * + * {
        margin-left: 2rem;
    }

    a {
        color: ${palette.blue[0]};
    }

    button {
        color: ${palette.red[0]};
    }
`;

const ReplyWrapper = styled.div``;

const ReplyHeader = styled.h5`
    ${({ theme }) => css`
        border-bottom: 0.1rem solid ${theme.shadow.level2};
        padding: ${theme.unit * 2}rem 0;
    `}
`;

const PostViewer = ({
    currentPost,
    currentUser,
    location,
    onClickDelete,
    onClickLike,
}: PostViewerProps) => {
    const postUrl = `${window.location.origin}/board/${currentPost.id}`;

    const handleClickLike = useCallback(() => {
        if (currentUser) {
            if (currentUser.id !== currentPost.createdBy) {
                onClickLike(currentPost.id, currentPost.like);
            } else {
                alert('자기 게시물은 추천할 수 없습니다');
            }
        } else {
            alert('로그인 해주세요');
        }
    }, [currentUser, currentPost]);

    return (
        <Article>
            <PostHeader>
                <HeaderInfoBox>
                    <HeaderLeftSection>
                        <PostTitle>{currentPost.title}</PostTitle>
                        <DateTime>
                            {changePostDateFormat(currentPost.createdAt, true)}
                        </DateTime>
                    </HeaderLeftSection>
                    <HeaderRightSection>
                        <UserIcon
                            avatar={currentPost.avatar}
                            nickname={currentPost.writer}
                            size={3.6}
                            fontSize={1.7}
                        />
                        <CountInfo>
                            <li>
                                <AiOutlineEye />
                                {currentPost.viewCnt}
                            </li>
                            <li>
                                <AiOutlineHeart />
                                {currentPost.likeCnt}
                            </li>
                        </CountInfo>
                    </HeaderRightSection>
                </HeaderInfoBox>
            </PostHeader>
            <PostBody>
                <PostContents
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />
            </PostBody>
            <PostFooter>
                <PostLikeBox
                    style={{ margin: '2rem auto' }}
                    like={currentPost.like}
                    onClick={handleClickLike}
                />
                <HeaderSubInfoBox>
                    <TransparentButton>
                        <CopyToClipboard
                            text={postUrl}
                            onCopy={() => alert('주소가 복사되었습니다.')}
                        >
                            <MdContentCopy />
                        </CopyToClipboard>
                    </TransparentButton>
                    <p>{postUrl}</p>
                </HeaderSubInfoBox>
                <PostNav>
                    <Link
                        to={{
                            pathname: `/board/${currentPost.board.path}`,
                            search: location.search,
                        }}
                    >
                        <BsArrowLeft />
                        List
                    </Link>
                    {currentUser && currentUser.id === currentPost.createdBy && (
                        <WriterButtons>
                            <Link
                                to={{
                                    pathname: '/board/editor',
                                    search: `?postId=${currentPost.id}`,
                                    state: {
                                        from: location,
                                    },
                                }}
                            >
                                Edit
                            </Link>
                            <TransparentButton
                                onClick={() => onClickDelete(currentPost.id)}
                            >
                                Delete
                            </TransparentButton>
                        </WriterButtons>
                    )}
                </PostNav>
                {currentPost.showReply && (
                    <ReplyWrapper>
                        <ReplyHeader>댓글 목록</ReplyHeader>
                        <ReplyContainer postId={currentPost.id} />
                    </ReplyWrapper>
                )}
            </PostFooter>
        </Article>
    );
};

export default withRouter(PostViewer);
