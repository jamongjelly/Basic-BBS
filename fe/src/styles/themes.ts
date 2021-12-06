import palette from 'src/styles/palette';

export const unit = 0.4;

const global = {
    font: '"Roboto", sans-serif',
    size: {
        h1: 4.8,
        h2: 3.6,
        h3: 2.8,
        xl: 2.4,
        lg: 1.8,
        md: 1.6,
        sm: 1.4,
        xs: 1.2,
        nav: 4.0,
        sidebarWidth: 27,
    },
    lineHeight: {
        xl: 1.6,
        lg: 1.6,
        md: 1.5,
        sm: 1.4,
        xs: 1.4,
    },
    fontWeight: {
        bold: 700,
        normal: 400,
        light: 100,
    },
    unit,
    color: {
        red: 'red',
    },
};

export const lightTheme = {
    ...global,
    color: {
        ...global.color,
        background: '#FFF',
        text: '#000',
        subText: '#777',
        menuText: '#81816A',
        menu: '#F6F6F4',
        subMenu: '#CCC',
        highlight: palette.mint[0],
        disabled: '#AAA',
        toggle: '#004D54',
        logo: '#333',
    },
    shadow: {
        level1: 'rgba(0, 0, 0, 0.1)',
        level2: 'rgba(0, 0, 0, 0.3)',
        level3: 'rgba(0, 0, 0, 0.5)',
    },
};

export const darkTheme = {
    ...global,
    color: {
        ...global.color,
        background: '#333',
        text: '#FFF',
        subText: '#CCC',
        menuText: '#DDD',
        menu: '#004D54',
        subMenu: '#ccc',
        highlight: '#38ceb5',
        disabled: '#AAA',
        toggle: '#F6F6F4',
        logo: '#F2F2E8',
    },
    shadow: {
        level1: 'rgba(155, 155, 155, 0.3)',
        level2: 'rgba(155, 155, 155, 0.5)',
        level3: 'rgba(155, 155, 155, 0.7)',
    },
};

export type Theme = typeof lightTheme;

export type SizeType = keyof typeof lightTheme.size;

export type FontWeightType = keyof typeof lightTheme.fontWeight;
