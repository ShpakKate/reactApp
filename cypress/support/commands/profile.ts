import { selectByTestId } from '../../helpers/selectByTestId';

export const updateProfile = (firstName: string, lastName: string) => {
    cy.get(selectByTestId('EditableProfileCardHeader.EditButton')).click();

    cy.get(selectByTestId('ProfileCard.FirstName')).clear().type(firstName);
    cy.get(selectByTestId('ProfileCard.LastName')).clear().type(lastName);
    cy.get(selectByTestId('EditableProfileCardHeader.SaveButton')).click();
};

export const resetProfile = (profileId: string) => cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: '123123' },
    body: {
        id: '4',
        first: 'test',
        lastname: 'user',
        age: 465,
        currency: 'EUR',
        country: 'Ukraine',
        city: 'Moscow',
        username: 'testuser',
        avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
    },
});

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstName: string, lastName: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
