import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ARTICLE } from 'shared/const/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItem } from './ArticleListItem';

export default {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />;

export const Big = Template.bind({});
Big.args = {
    view: ArticleView.BIG,
    article: ARTICLE,
};

export const Small = Template.bind({});
Small.args = {
    view: ArticleView.SMALL,
    article: ARTICLE,
};
