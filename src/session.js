var Promise = require('bluebird');
var google = require('googleapis');

/**
 * Renews authentication session to BigQuery.
 * @param {Function} callback
 * @return {Promise}
 */
exports.renew = function (callback) {
  var resolver = function (resolve, reject) {
    google.auth.refreshAccessToken(function (err) {
      if (err) return reject(err);
      resolve();
    });
  };

  return new Promise(resolver).nodeify(callback);
};
