'use strict';

const CreatePage = require('./create.page');

fdescribe('Create Showing Request E2E Tests:', function () {
  describe('Page', () => {
    var createPage;
    beforeEach(() => {
      createPage = new CreatePage();
    });
    it('Should have a "New Showing Request" heading', () => {
      expect(createPage.title).toEqual('New Showing Request');
    });
    describe('when submitted as incomplete', () => {
      beforeEach(() => {
        createPage.refresh();
        element.all(by.css('.error-text')).each(element => {
          expect(element.isDisplayed()).toEqual(false);
        });
        createPage.submit();
      });
      it('Should report missing rental', () => {
        expect(element(by.cssContainingText('.error-text', 'Rental is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing first name', () => {
        expect(element(by.cssContainingText('.error-text', 'First name is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing last name', () => {
        expect(element(by.cssContainingText('.error-text', 'Last name is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing last name', () => {
        expect(element(by.cssContainingText('.error-text', 'Last name is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing email address', () => {
        expect(element(by.cssContainingText('.error-text', 'Email address is required')).isDisplayed()).toEqual(true);
      });
      it('Should report invalid email address  - "123"', () => {
        createPage.email = '123';
        createPage.submit();
        expect(element(by.cssContainingText('.error-text', 'Email address is invalid')).isDisplayed()).toEqual(true);
      });
      /**
       * Note: 123@123 is a valid email adress according to HTML5.
       * However, 123@123@123 is an invalid email address.
       */
      it('Should report invalid email address - "123@123@123"', function () {
        createPage.email = '123@123@123';
        createPage.submit();
        expect(element(by.cssContainingText('.error-text', 'Email address is invalid')).isDisplayed()).toEqual(true);
      });
      it('Should report missing mobile number', () => {
        expect(element(by.cssContainingText('.error-text', 'Mobile phone is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing mobile number', () => {
        expect(element(by.cssContainingText('.error-text', 'Mobile phone is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing move-in date', () => {
        expect(element(by.cssContainingText('.error-text', 'Move-in date is required')).isDisplayed()).toEqual(true);
      });
      it('Should not accept an invalid date', () => {
        createPage.moveIn = '2017/January/1';
        createPage.submit(); // blur the input by clicking the create button
        expect(createPage.moveIn).toEqual('');
        expect(element(by.cssContainingText('.error-text', 'Move-in date is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing credit score', () => {
        expect(element(by.cssContainingText('.error-text', 'Credit score is required')).isDisplayed()).toEqual(true);
      });
      it('Should report missing smoker response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please tell us if you are a smoker.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing bankruptcy response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please tell us if you have ever filed for bankruptcy.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing arrest response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please tell us if you have ever been arrested or charged with a crime.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing eviction response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please tell us if you have been evicted, been asked to leave, or paid rent late.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing pets response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please tell us if you have any pets.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing tenant count response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please select the number of people that will be living in the home.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing past rental response', () => {
        expect(element(by.cssContainingText('.error-text', 'Please select the number of past rentals.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing past rental response', () => {
        expect(element(by.cssContainingText('.error-text', 'Current address is required.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing current rental amount', () => {
        expect(element(by.cssContainingText('.error-text', 'Current rent amount is required.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing current address move in date', () => {
        expect(element(by.cssContainingText('.error-text', 'Move-in date of current address is required.')).isDisplayed()).toEqual(true);
      });
      it('Should report missing agreement to terms and conditions', () => {
        expect(element(by.cssContainingText('.error-text', 'Please agree to the terms and conditions.')).isDisplayed()).toEqual(true);
      });
    });
    describe('when requestor has no pets', () => {
       it('Should not display "add Pet" button', () =>{
         createPage.pets = 'false';
         expect(createPage.addPetButton.isPresent()).toEqual(false);
       })
    });
    describe('when requestor has pets', () => {
      beforeEach(() => {
        createPage.hasPets = true;
      });
      it('Should display "Add Pet" button', () =>{
        expect(createPage.addPetButton.isPresent()).toEqual(true);
      });
      describe('adding a pet', () =>{
        it('Should display added pet on page', () => {
          expect(createPage.petCount).toEqual(0);
          createPage.addPet('Dog', 'snoopy', '8', 'white and brown', '45', true);
          expect(createPage.petCount).toEqual(1);
        });
        it('Should display multiple pets added on page', () => {
          expect(createPage.petCount).toEqual(0);
          createPage.addPet('Dog', 'snoopy', '8', 'white and brown', '45', true);
          expect(createPage.petCount).toEqual(1);
          createPage.addPet('Cat', 'jose', '13', 'blue', '15', false);
          expect(createPage.petCount).toEqual(2);
        })
      });
    });

    // selecting a different rental changes the minimum income dollar amount and blanks out income question
    // Can select a move-in date from calendar by clicking input box
    // Can select a move-in date from calendar by clicking calendar
    // Can select a current move-in date from calendar by clicking input box
    // Can select a current move-in date from calendar by clicking calendar

  });
});
