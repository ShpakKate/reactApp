import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from 'shared/ui/Modal';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: ' Модуль ИИ-ассистент предназначен для поддержки:\n' +
        '- заказчиков в торгах в части подбора критериев оценки предложений со\n' +
        '  стороны поставщиков и распределения веса между ними (доп. к модулю Торги)\n' +
        '- заказчиков в торгах в части подбора поставщиков (доп. к модулю Торги)',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: ' Модуль ИИ-ассистент предназначен для поддержки:\n' +
        '- заказчиков в торгах в части подбора критериев оценки предложений со\n' +
        '  стороны поставщиков и распределения веса между ними (доп. к модулю Торги)\n' +
        '- заказчиков в торгах в части подбора поставщиков (доп. к модулю Торги)',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
