/// <reference types="Cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

describe('App component', () => {
  before(() => {
    cy.visit('/');
  });

  it('list available marktets', () => {
    cy
      .wait(5000)
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

  describe('Sort', () => {
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
        .contains('A - Z', { matchCase: false })
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
        .contains('Z - A', { matchCase: false })
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
        .contains('volume - lowest', { matchCase: false })
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
  });

  describe('Filter', () => {
    it('should filter available markets on text input if market is available', () => {
      cy
        .get('.input')
        .clear()
        .type('amex');

      cy.contains('amex', { matchCase: false });
    });

    it('should filter available markets on text input and using the sort options', () => {
      cy
        .get('button.filter__button')
        .click()
        .wait(5000);

      cy
        .get('li.list__item')
        .contains('Sort by', { matchCase: false })
        .click()
        .wait(5000);

      cy
        .get('input')
        .clear()
        .type('n');

      cy
        .get('button.filter__button')
        .click()
        .wait(5000);

      cy
        .get('li.list__item')
        .contains('Volume - Highest', { matchCase: false })
        .click();

      cy
        .get('li.grid-card')
        .eq(0)
        .contains('nyse', { matchCase: false });
    });

    it('should display no market available on text input if market is not available', () => {
      cy
        .get('.input')
        .clear()
        .type('cardinal');

      cy.contains('No market available', { matchCase: false });
    });
  });
});
