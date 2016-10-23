'use strict';

/**
 * Module dependencies.
 */
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const ShowingRequest = mongoose.model('ShowingRequest');

/**
 * Globals
 */
var user;
var showingRequest;
var credentials;

/**
 * Unit tests
 */
describe('Showing Request Model Unit Tests:', function () {
  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    user.save(function (err, savedUser) {
      showingRequest = new ShowingRequest({
        name: 'Showing Request Name',
        user: savedUser
      });

      done(err);
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function () {
      this.timeout(0);
      return showingRequest.save(function (err) {
        should.not.exist(err);
      });
    });

    it('should be able to show an error when try to save without name', function () {
      showingRequest.name = '';

      return showingRequest.save(function (err) {
        should.exist(err);
      });
    });
  });

  afterEach(function (done) {
    ShowingRequest.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
