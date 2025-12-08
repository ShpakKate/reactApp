import { selectByTestId } from '../../helpers/selectByTestId';

let profileId: string;

describe('User visits their profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`/profile/${data.id}`);
        });
    });

    afterEach(() => cy.resetProfile(profileId));

    it('and profile loaded successfully', () => {
        cy.getByTestId('ProfileCard.FirstName').should('have.value', 'test');
    });

    it('and edits it', () => {
        const newName = 'newName';
        const newLastName = 'newLastName';

        cy.updateProfile(newName, newLastName);
        cy.get(selectByTestId('ProfileCard.FirstName')).should(
            'have.value',
            newName,
        );
        cy.get(selectByTestId('ProfileCard.LastName')).should(
            'have.value',
            newLastName,
        );
    });
});
