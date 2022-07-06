/// <reference types="Cypress" />

describe('App component', () => {
  before(() => {
    cy.visit('/');
  });

  it('list available marktets', () => {
    cy
      .get('ul.main-content__card-list')
      .find('li.grid-card').should('have.length', 5);
  });

  it('should toggle sort by button', () => {
    cy
      .get('button.filter__button')
      .contains('sort by', { matchCase: false })
      .click()
      .wait(5000)
      .click();
  });

  it('should sort available markets in ascending A - Z', () => {
    cy
      .get('button.filter__button')
      .contains('sort by', { matchCase: false })
      .click()
      .wait(5000);

    cy
      .get('li.list__item')
      .contains('A - Z', { matchCase: false })
      .click();

    cy
      .get('li.grid-card')
      .eq(0)
      .contains('amex', { matchCase: false });
  });

  it('should sort available markets in descending Z - A', () => {
    cy
      .get('button.filter__button')
      .contains('sort by', { matchCase: false })
      .click()
      .wait(5000);

    cy
      .get('li.list__item')
      .contains('Z - A', { matchCase: false })
      .click();

    cy
      .get('li.grid-card')
      .eq(0)
      .contains('tsx', { matchCase: false });
  });

  it('should sort available markets by volumes ascending Lowest to Highest', () => {
    cy
      .get('button.filter__button')
      .contains('sort by', { matchCase: false })
      .click()
      .wait(5000);

    cy
      .get('li.list__item')
      .contains('volume - lowest', { matchCase: false })
      .click();

    cy
      .get('li.grid-card')
      .eq(0)
      .contains('amex', { matchCase: false });
  });

  it('should sort available markets by volumes ascending Highest to Lowest', () => {
    cy
      .get('button.filter__button')
      .contains('sort by', { matchCase: false })
      .click()
      .wait(5000);

    cy
      .get('li.list__item')
      .contains('volume - highest', { matchCase: false })
      .click();

    cy
      .get('li.grid-card')
      .eq(0)
      .contains('nyse', { matchCase: false });
  });

  it('should filter available markets on text input if market is available', () => {
    cy
      .get('.input')
      .clear()
      .type('amex');

    cy.contains('amex', { matchCase: false });
  });

  it('should not return markets on text input if market is available', () => {
    cy
      .get('.input')
      .clear()
      .type('cardinal')
      .should('not.contain', 'cardinal');
  });
});
