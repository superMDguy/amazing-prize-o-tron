'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ShowingRequest = mongoose.model('ShowingRequest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Showing Request
 */
exports.create = function(req, res) {
  var showingRequest = new ShowingRequest(req.body);
  showingRequest.user = req.user;

  showingRequest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(showingRequest);
    }
  });
};

/**
 * Show the current Showing Request
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var showingRequest = req.showingRequest ? req.showingRequest.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  showingRequest.isCurrentUserOwner = req.user && showingRequest.user && showingRequest.user._id.toString() === req.user._id.toString();

  res.jsonp(showingRequest);
};

/**
 * Update a Showing Request
 */
exports.update = function(req, res) {
  var showingRequest = req.showingRequest;

  showingRequest = _.extend(showingRequest, req.body);

  showingRequest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(showingRequest);
    }
  });
};

/**
 * Delete an Showing Request
 */
exports.delete = function(req, res) {
  var showingRequest = req.showingRequest;

  showingRequest.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(showingRequest);
    }
  });
};

/**
 * List of Showing Requests
 */
exports.list = function(req, res) {
  ShowingRequest.find().sort('-created').populate('user', 'displayName').exec(function(err, showingRequests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(showingRequests);
    }
  });
};

/**
 * Showing Request middleware
 */
exports.showingRequestByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Showing Request is invalid'
    });
  }

  ShowingRequest.findById(id).populate('user', 'displayName').exec(function (err, showingRequest) {
    if (err) {
      return next(err);
    } else if (!showingRequest) {
      return res.status(404).send({
        message: 'No Showing Request with that identifier has been found'
      });
    }
    req.showingRequest = showingRequest;
    next();
  });
};
