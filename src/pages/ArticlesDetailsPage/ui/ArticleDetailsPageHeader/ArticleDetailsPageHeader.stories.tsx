import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ARTICLE } from '@/shared/const/article';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => (
    <ArticleDetailsPageHeader {...args} />
);

export const NotEdit = Template.bind({});
NotEdit.args = {
    id: '1',
};
NotEdit.decorators = [
    StoreDecorator({
        articleDetails: {
            data: ARTICLE,
        },
    }),
];

export const Edit = Template.bind({});
Edit.args = {
    id: '1',
};
Edit.decorators = [
    StoreDecorator({
        articleDetails: {
            data: ARTICLE,
        },
        user: {
            authData: {
                id: '1',
                username: 'Max',
            },
        },
    }),
];
