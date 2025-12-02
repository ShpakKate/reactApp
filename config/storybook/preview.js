import { addDecorator } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { Theme } from '../../src';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
};

addDecorator(StyleDecorator);
// ломает сторибук. без него темы применяются
// addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
addDecorator(withMock);
