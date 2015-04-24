var path = require('path');
var google = require('googleapis');
var _ = require('lodash');
var type = require('type-of');
var Table = require('./Table');

/**
 * Assigns the designated auth options to the client.
 * @param {Object} options
 * @param {String} options.email
 * @param {String} [options.key]
 * @param {String} [options.keyFile]
 * @void
 */
exports.auth = function (options) {
  if (!_.isPlainObject(options)) {
    throw new Error('Invalid options argument; expected object, received ' + type(options));
  }

  if (!_.isString(options.email)) {
    throw new Error('Invalid email option; expected string, received ' + type(options.email));
  }

  if (options.key == null && options.keyFile == null) {
    throw new Error('You must specify a key or path to the key file');
  }

  google.auth = new google.auth.JWT(
    options.email,
    options.keyFile ? path.resolve(options.keyFile) : null,
    options.key || null,
    ['https://www.googleapis.com/auth/bigquery'],
    null
  );
};

/**
 * Exports the Table interface.
 */
exports.Table = Table;
