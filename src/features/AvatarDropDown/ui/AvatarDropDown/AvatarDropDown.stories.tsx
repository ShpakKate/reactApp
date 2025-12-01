import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AvatarDropDown } from './AvatarDropDown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';

export default {
    title: 'features/AvatarDropDown',
    component: AvatarDropDown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarDropDown>;

const Template: ComponentStory<typeof AvatarDropDown> = (args) => <AvatarDropDown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                roles: [UserRole.ADMIN],
            },
        },
    }),
];
