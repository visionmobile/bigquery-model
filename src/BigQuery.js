import path from 'path';
import Promise from 'bluebird';
import google from 'googleapis';
import Client from 'googleapis/apis/bigquery/v2';
import _ from 'lodash';
import type from 'type-of';
import Project from '../Project';

class BigQuery {

  /**
   * Creates a new BigQuery client.
   * @param {Object} options
   * @param {String} options.email
   * @param {String} [options.key]
   * @param {String} [options.keyFile]
   * @void
   */
  constructor(options) {
    if (!_.isPlainObject(options)) {
      throw new Error('Invalid options argument; expected object, received ' + type(options));
    }

    if (!_.isString(options.email)) {
      throw new Error('Invalid email option; expected string, received ' + type(options.email));
    }

    if (options.key == null && options.keyFile == null) {
      throw new Error('You must specify a key or path to the key file');
    }

    this.client = new Client({
      auth: new google.auth.JWT(
        options.email,
        options.keyFile ? path.resolve(options.keyFile) : null,
        options.key || null,
        ['https://www.googleapis.com/auth/bigquery'],
        null
      )
    });

    Promise.promisifyAll(this.client.jobs);
    Promise.promisifyAll(this.client.tables);
    Promise.promisifyAll(this.client.tabledata);
  }

  getProject(projectId) {
    return new Project({
      projectId,
      client: this.client
    });
  }

}

// /**
//  * Assigns the designated auth options to the client.
//  * @param {Object} options
//  * @param {String} options.email
//  * @param {String} [options.key]
//  * @param {String} [options.keyFile]
//  * @void
//  */
// exports.auth = function (options) {
//   if (!_.isPlainObject(options)) {
//     throw new Error('Invalid options argument; expected object, received ' + type(options));
//   }

//   if (!_.isString(options.email)) {
//     throw new Error('Invalid email option; expected string, received ' + type(options.email));
//   }

//   if (options.key == null && options.keyFile == null) {
//     throw new Error('You must specify a key or path to the key file');
//   }

//   google.options({auth: new google.auth.JWT(
//     options.email,
//     options.keyFile ? path.resolve(options.keyFile) : null,
//     options.key || null,
//     ['https://www.googleapis.com/auth/bigquery'],
//     null
//   )});
// };

export default BigQuery;
