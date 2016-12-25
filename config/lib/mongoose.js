'use strict';

/**
 * Module dependencies.
 */
const chalk = require('chalk');
const config = require('../config');
const mongoose = require('mongoose');
const path = require('path');

// Load the mongoose models
module.exports.loadModels = function (callback) {
  // Globbing model files
  config.files.server.models.forEach(function (modelPath) {
    require(path.resolve(modelPath)); // eslint-disable-line global-require
  });

  if (callback) callback();
};

// Initialize Mongoose
module.exports.connect = function (cb) {

  mongoose.Promise = config.db.promise;

  var db = mongoose.connect(config.db.uri, config.db.options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.db.debug);

      // Call callback FN
      if (cb) cb(db);
    }
  });
};

module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info(chalk.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};
