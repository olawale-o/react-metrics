/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

describe('Detail Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('should navigate to detail page of the selected market', () => {
    cy
      .wait(5000)
      .get('ul.main-content__card-list')
      .find('li.grid-card')
      .eq(0)
      .click();

    cy.contains('nasdaq', { matchCase: false });
  });

  it('should list atleast one registered comapany under the selected market', () => {
    cy
      .get('ul.company__card-list')
      .find('li.company__card')
      .should('have.length.greaterThan', 0);
  });

  it('should list atleast 5 registered companies when scrolled to the bottom', () => {
    cy.window().scrollTo('bottom');

    cy
      .wait(5000)
      .get('ul.company__card-list')
      .find('li.company__card')
      .wait(5000)
      .should('have.length.greaterThan', 6);
  });

  it('should return to main page when back button is clicked', () => {
    cy
      .get('.nav__left')
      .find('[data-testid="back"]')
      .click();

    cy.contains('Shares volume', { matchCase: false });
  });
});
