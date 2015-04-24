var path = require('path');
var google = require('googleapis');
var Table = require('../Table');

/**
 * Assigns the designated auth options to the client.
 * @param {Object} options
 * @param {String} options.email
 * @param {String} [options.key]
 * @param {String} [options.keyFile]
 * @void
 */
exports.auth = function (options) {
  var authClient = new google.auth.JWT(
    options.email,
    options.keyFile ? path.resolve(options.keyFile) : null,
    options.key || null,
    ['https://www.googleapis.com/auth/bigquery'],
    null
  );

  google.options({auth: authClient});
};

/**
 * Exports the Table interface.
 */
exports.Table = Table;
