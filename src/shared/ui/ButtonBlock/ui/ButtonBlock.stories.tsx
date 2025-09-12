import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ButtonBlock, ThemeButton } from './ButtonBlock';

export default {
    title: 'shared/ButtonBlock',
    component: ButtonBlock,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ButtonBlock>;

const Template: ComponentStory<typeof ButtonBlock> = (args) => <ButtonBlock {...args} />;

export const PrimaryButtonBlock = Template.bind({});
PrimaryButtonBlock.args = {
    children: 'Text',
};

export const ClearButtonBlock = Template.bind({});
ClearButtonBlock.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
};

export const OutlineButtonBlock = Template.bind({});
OutlineButtonBlock.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineDarkButtonBlock = Template.bind({});
OutlineDarkButtonBlock.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDarkButtonBlock.decorators = [ThemeDecorator(Theme.DARK)];
