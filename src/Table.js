var Promise = require('bluebird');
var google = require('googleapis');
var tables = Promise.promisifyAll(google.bigquery('v2').tables);
var tabledata = Promise.promisifyAll(google.bigquery('v2').tabledata);
var jobs = Promise.promisifyAll(google.bigquery('v2').jobs);
var uuid = require('node-uuid');
var _ = require('lodash');

/**
 * Creates a new BigQuery Table of the designated properties.
 * @param {Object} props
 * @param {String} props.projectId
 * @param {String} props.datasetId
 * @param {String} props.tableId
 * @param {Object} [props.schema]
 */
function Table(props) {
  this.projectId = props.projectId;
  this.datasetId = props.datasetId;
  this.tableId = props.tableId;
  this.schema = props.schema || null;
}

/**
 * Registers (creates) the table in database.
 * @param {Function} [callback]
 * @return {Promise}
 */
Table.prototype.register = function (callback) {
  var _this = this;

  return tables.insertAsync({
    projectId: this.projectId,
    datasetId: this.datasetId,
    resource: {
      kind: 'bigquery#table',
      tableReference: {
        datasetId: this.datasetId,
        projectId: this.projectId,
        tableId: this.tableId
      },
      description: this.description,
      schema: this.schema
    }
  })
    .spread(function (data) {
      return data.id;
    })
    .catch(function (err) {
      // check if table already exists
      if (err.code === 409) return _this.projectId + ':' + _this.datasetId + '.' + _this.tableId;
      throw err;
    })
    .nodeify(callback);
};

/**
 * Appends the specified records to table.
 * @param {Array<Object>} records
 * @param {Function} [callback]
 * @return {Promise}
 */
Table.prototype.push = function (records, callback) {
  // make sure records is array
  if (!_.isArray(records)) records = [records];

  // prepare records for insert
  records = records.map(function (e) {
    return {
      insertId: uuid.v4(),
      json: e
    };
  });

  return tabledata.insertAllAsync({
    projectId: this.projectId,
    datasetId: this.datasetId,
    tableId: this.tableId,
    resource: {
      rows: records
    }
  })
    .spread(function (data) {
      // check if errors exist
      if (data.insertErrors) {
        throw _.assign(new Error(), data.insertErrors[0].errors[0]);
      }

      return data;
    })
    .catch(function (err) {
      if (err.code === 401) {

      }
    })
    .nodeify(callback);
};

/**
 * Runs the designated SQL query and returns the results.
 * @param {String} sql
 * @param {Function} [callback]
 * @return {Promise}
 */
Table.prototype.query = function (sql, callback) {
  return jobs.queryAsync({
    projectId: this.projectId,
    resource: {
      query: sql,
      useQueryCache: true,
      defaultDataset: {
        datasetId: this.datasetId,
        projectId: this.projectId
      }
    }
  })
    .nodeify(callback);
};

module.exports = Table;
