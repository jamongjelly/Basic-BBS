import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GradientButton, {
    GradientButtonProps,
} from 'src/components/ui/buttons/GradientButton';
import styled from 'styled-components';

export default {
    title: 'Components/GradientButton',
    component: GradientButton,
} as Meta;

const Template: Story<GradientButtonProps> = (args) => (
    <div>
        <GradientButton {...args} />
    </div>
);

const Wrapper = styled.div`
    button + button {
        margin-left: 2rem;
    }
`;

export const List = ({ fontSize, ...args }: GradientButtonProps) => (
    <Wrapper>
        <GradientButton fontSize="h1" {...args} />
        <GradientButton fontSize="h2" {...args} />
        <GradientButton fontSize="h3" {...args} />
        <GradientButton fontSize="xl" {...args} />
        <GradientButton fontSize="lg" {...args} />
        <GradientButton fontSize="md" {...args} />
        <GradientButton fontSize="sm" {...args} />
        <GradientButton fontSize="xs" {...args} />
    </Wrapper>
);
List.args = {
    children: 'Button',
};

export const Test = Template.bind({});

Test.args = {
    children: 'Button',
};
