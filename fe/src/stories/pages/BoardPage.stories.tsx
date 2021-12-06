import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BoardPage, { BoardPageProps } from 'src/pages/presenters/BoardPage';

export default {
    title: 'Pages/BoardPage',
    component: BoardPage,
} as Meta;

const Template: Story<BoardPageProps> = (args) => <BoardPage {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
