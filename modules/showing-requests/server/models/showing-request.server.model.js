'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Showing Request Schema
 */
var ShowingRequestSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Showing Request name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('ShowingRequest', ShowingRequestSchema);
