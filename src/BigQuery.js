import path from 'path';
import Promise from 'bluebird';
import google from 'googleapis';
import Client from 'googleapis/apis/bigquery/v2';
import _ from 'lodash';
import type from 'type-of';
import CustomError from 'customerror';
import Dataset from './Dataset';
import Table from './Table';

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
      throw new CustomError(`Invalid projectId property; expected string, received ${type(options.projectId)}`, 'InvalidArgument');
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

    Promise.promisifyAll(this.client.jobs, {multiArgs: true});
    Promise.promisifyAll(this.client.tables, {multiArgs: true});
    Promise.promisifyAll(this.client.tabledata, {multiArgs: true});
  }

  createDataset(datasetId) {
    return new Dataset({
      datasetId,
      projectId: this.projectId,
      client: this.client
    });
  }

  createTable(datasetId, tableId, schema) {
    return new Table({
      tableId,
      schema,
      datasetId,
      projectId: this.projectId,
      client: this.client
    });
  }

  query(sql, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    options = _.defaults(options, {
      timeout: 10000
    });

    return this.client.jobs.queryAsync({
      projectId: this.projectId,
      resource: {
        query: sql,
        useQueryCache: true
      },
      timeoutMs: options.timeout
    })

      .spread((data) => {
        const fields = _.chain(data)
          .get('schema.fields', [])
          .map((field) => field.name)
          .value();

        return _.chain(data)
          .get('rows', [])
          .map((row) => {
            const values = row.f.map((col) => col.v);
            return _.zipObject(fields, values);
          })
          .value();
      })

      .nodeify(callback);
  }

}

export default BigQuery;
