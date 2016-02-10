const Promise = require('bluebird');
const _ = require('lodash');
const Table = require('./Table');

class Dataset {

  constructor({datasetId, projectId, client}) {
    this.datasetId = datasetId;
    this.projectId = projectId;
    this.client = client;
  }

  createTable(tableId, schema) {
    return new Table({
      tableId,
      schema,
      datasetId: this.datasetId,
      projectId: this.projectId,
      client: this.client
    });
  }

  refreshAccessToken(callback) {
    return new Promise((resolve, reject) => {
      this.client.auth.refreshAccessToken((err) => {
        if (err) return reject(err);
        resolve();
      });
    })
      .nodeify(callback);
  }

  /**
   * Runs the designated SQL query and returns the results.
   * @param {String} sql
   * @param {Function} [callback]
   * @return {Promise}
   */
  query(sql, callback) {
    return this.client.jobs.queryAsync({
      projectId: this.projectId,
      resource: {
        query: sql,
        useQueryCache: true,
        defaultDataset: {
          projectId: this.projectId,
          datasetId: this.datasetId
        }
      }
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

module.exports = Dataset;
