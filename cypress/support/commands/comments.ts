import { User } from '../../../src/entities/User';

export const addComment = (text: string) => {
    cy.getByTestId('ArticlesCommentForm.Input').type(text ?? 'some text');
    cy.getByTestId('ArticlesCommentForm.Button').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<User>;
        }
    }
}
