import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { profile } from 'shared/const/profileData';
import { userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { api$ } from 'shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('switch read only mode', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });
    test('при отменене значиения становятся начальными', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.clear(screen.getByTestId('ProfileCard.LastName'));

        await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.LastName'), 'user');

        expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('admin');
    });
    test('должна пояаится ошибка валидации', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });
    test('если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        const mockPutReq = jest.spyOn(api$, 'put');
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'user');
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
