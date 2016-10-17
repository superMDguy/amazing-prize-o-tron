'use strict';

describe('Showing requests E2E Tests:', function () {
  describe('Test Showing requests page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/showing-requests');
      expect(element.all(by.repeater('showing-request in showing-requests')).count()).toEqual(0);
    });
  });
});
