describe('User visit page with the list of articles', () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit('articles');
        });
    });
    it('and articles loaded successfully', () => {
        cy.getByTestId('ArticlesList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
});
