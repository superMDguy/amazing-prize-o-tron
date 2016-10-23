'use strict';

class ShowingRequestCreatePage {

  constructor () {
    browser.get('http://localhost:3001/showing-requests/create');
  }

  addPet (type, name, age, color, weight, isMale) {
    this.addPetButton.click();
    const EC = protractor.ExpectedConditions;
    const addPetModal = element(by.css('.add-pet-modal'));
    addPetModal.element(by.model('vm.pet.type')).sendKeys(type);
    addPetModal.element(by.model('vm.pet.name')).sendKeys(name);
    addPetModal.element(by.model('vm.pet.age')).sendKeys(age);
    addPetModal.element(by.model('vm.pet.color')).sendKeys(color);
    addPetModal.element(by.model('vm.pet.weight')).sendKeys(weight);
    isMale ? addPetModal.element(by.id('male')).click() : addPetModal.element(by.id('female')).click();
    addPetModal.element(by.buttonText('OK')).click();
  }

  refresh () {
    browser.refresh()
  }

  get rentalElement () {
    return element(by.model('vm.showingRequest.rental'));
  }

  get title () {
    return element(by.tagName('h1')).getText();
  }

  get rental () {
    return this.rentalElement.getText();
  }

  set email (emailAddress) {
    element(by.model('vm.showingRequest.email')).sendKeys(emailAddress);
  }

  get moveInElement () {
    return element.all(by.model('vm.showingRequest.moveIn')).first()
  }

  set moveIn (date) {
    this.moveInElement.sendKeys(date);
  }

  get moveIn () {
    return this.moveInElement.getAttribute('value');
  }

  set hasPets (hasPets) {
    hasPets ? element(by.id('havePets')).click() : element(by.id('noPets')).click();
  }

  get addPetButton () {
    return element(by.buttonText('Add Pet'));
  }

  get petCount () {
    return element.all(by.css('.pet')).count();
  }

  submit () {
    element(by.buttonText('Create')).click();
  }
}

module.exports = ShowingRequestCreatePage;
