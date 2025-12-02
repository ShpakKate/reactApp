import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line @kate_shpak_07/path-checker/layer-imports
import { ArticleType } from '@/entities/Article';
import { Tabs } from './Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    tabs: [
        {
            value: ArticleType.ECONOMICS,
            content: 'tab 1',
        },
        {
            value: ArticleType.IT,
            content: 'tab 2',
        },
        {
            value: ArticleType.SCIENCE,
            content: 'tab 3',
        },
    ],
    value: 'tab 2',
    onTabClick: action('onTabClick'),
};
