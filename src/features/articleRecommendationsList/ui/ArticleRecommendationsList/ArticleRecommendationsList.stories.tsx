import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ARTICLE } from '@/shared/const/article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const mockArticles = [
    {
        ...ARTICLE,
        id: '1',
        title: 'React Best Practices 2024',
        user: { id: '1', username: 'react_expert' },
    },
    {
        ...ARTICLE,
        id: '2',
        title: 'TypeScript Advanced Patterns',
        user: { id: '2', username: 'ts_master' },
    },
    {
        ...ARTICLE,
        id: '3',
        title: 'Frontend Performance Guide',
        user: { id: '3', username: 'perf_guru' },
    },
];

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_limit=3`,
                method: 'GET',
                status: 200,
                response: mockArticles,
            },
        ],
    },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
