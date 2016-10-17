'use strict';

/**
 * Module dependencies
 */
var showingRequestsPolicy = require('../policies/showing-requests.server.policy'),
  showingRequests = require('../controllers/showing-requests.server.controller');

module.exports = function(app) {
  // Showing requests Routes
  app.route('/api/showing-requests').all(showingRequestsPolicy.isAllowed)
    .get(showingRequests.list)
    .post(showingRequests.create);

  app.route('/api/showing-requests/:showingRequestId').all(showingRequestsPolicy.isAllowed)
    .get(showingRequests.read)
    .put(showingRequests.update)
    .delete(showingRequests.delete);

  // Finish by binding the Showing request middleware
  app.param('showingRequestId', showingRequests.showingRequestByID);
};
