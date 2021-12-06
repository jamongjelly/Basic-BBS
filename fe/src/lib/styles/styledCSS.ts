import { css } from 'styled-components';

const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const overlay = css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const styledCSS = {
    flexCenter,
    overlay,
};

export default styledCSS;
