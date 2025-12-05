import { removeArticle } from '../../support/commands/article';

let currentArticleId: string;

describe('user visit page with article', () => {
    beforeEach(() => {
        cy.login().then(() => {});
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.log(JSON.stringify(article.id));
            cy.visit(`articles/${article.id}`);
        });
    });

    afterEach(() => removeArticle(currentArticleId));

    it('and sees the content of article', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('and sees the list of recommendations', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('and leaves a comment', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('ArticlesCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    it('and added a recommendation', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
