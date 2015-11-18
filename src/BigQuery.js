const path = require('path');

const Promise = require('bluebird');
const google = require('googleapis');
const Client = require('googleapis/apis/bigquery/v2');
const _ = require('lodash');
const type = require('type-of');
const CustomError = require('customerror');

const Dataset = require('./Dataset');

class BigQuery {

  /**
   * Creates a new BigQuery client.
   * @param {Object} options
   * @param {String} options.email
   * @param {String} options.projectId
   * @param {String} [options.key]
   * @param {String} [options.keyFile]
   * @void
   */
  constructor(options) {
    if (!_.isPlainObject(options)) {
      throw new CustomError(`Invalid options argument; expected object, received ${type(options)}`, 'InvalidArgument');
    }

    if (!_.isString(options.email)) {
      throw new CustomError(`Invalid email property; expected string, received ${type(options.email)}`, 'InvalidArgument');
    }

    if (!_.isString(options.projectId)) {
      throw new CustomError(`Invalid email property; expected string, received ${type(options.projectId)}`, 'InvalidArgument');
    }

    if (!options.key && !options.keyFile) {
      throw new CustomError('You must specify a key or a key file');
    }

    this.projectId = options.projectId;

    this.client = new Client({
      auth: new google.auth.JWT(
        options.email,
        options.keyFile ? path.resolve(options.keyFile) : null,
        options.key || null,
        ['https://www.googleapis.com/auth/bigquery'],
        null
      )
    });

    // hack the stupid google client (damn it)
    this.client.google = {_options: {}};

    Promise.promisifyAll(this.client.jobs);
    Promise.promisifyAll(this.client.tables);
    Promise.promisifyAll(this.client.tabledata);
  }

  createDataset(datasetId) {
    return new Dataset({
      datasetId,
      projectId: this.projectId,
      client: this.client
    });
  }

}

module.exports = BigQuery;
