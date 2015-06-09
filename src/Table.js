var Promise = require('bluebird');
var google = require('googleapis');
var tables = Promise.promisifyAll(google.bigquery('v2').tables);
var tabledata = Promise.promisifyAll(google.bigquery('v2').tabledata);
var jobs = Promise.promisifyAll(google.bigquery('v2').jobs);
var uuid = require('node-uuid');
var _ = require('lodash');
var type = require('type-of');

var session = require('./session');

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
 * Sets the projectId property of this table.
 * @param {String} projectId
 * @return {@this}
 */
Table.prototype.setProjectId = function (projectId) {
  if (!_.isString(projectId)) {
    throw new Error('Invalid projectId argument; expected string, received ' + type(projectId));
  }

  this.projectId = projectId;
  return this;
};

/**
 * Sets the datasetId property of this table.
 * @param {String} projectId
 * @return {@this}
 */
Table.prototype.setDatasetId = function (datasetId) {
  if (!_.isString(datasetId)) {
    throw new Error('Invalid datasetId argument; expected string, received ' + type(datasetId));
  }

  this.datasetId = datasetId;
  return this;
};

/**
 * Sets the tableId property of this table.
 * @param {String} projectId
 * @return {@this}
 */
Table.prototype.setTableId = function (tableId) {
  if (!_.isString(tableId)) {
    throw new Error('Invalid tableId argument; expected string, received ' + type(tableId));
  }

  this.tableId = tableId;
  return this;
};

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
      if (err.code === 409) {
        return _this.projectId + ':' + _this.datasetId + '.' + _this.tableId;
      }

      throw err;
    })

    .nodeify(callback);
};

/**
 * Appends the specified records to table.
 * @param {Object, Array<Object>} records
 * @param {Function} [callback]
 * @return {Promise}
 */
Table.prototype.push = function (records, callback, _attempt) {
  var _this = this;

  _attempt = _attempt || 0;

  // make sure records is array
  if (!_.isArray(records)) records = _.toArray(arguments);

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
      // check if session has expired
      if (err.code === 401 && _attempt === 0) {
        return session.renew()
          .then(function () {
            return _this.push(records, callback, _attempt + 1);
          });
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
Table.prototype.query = function (sql, callback, _attempt) {
  var _this = this;

  _attempt = _attempt || 0;

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

    .catch(function (err) {
      // check if session has expired
      if (err.code === 401 && _attempt === 0) {
        return session.renew()
          .then(function () {
            return _this.query(sql, callback, _attempt + 1);
          });
      }
    })

    .nodeify(callback);
};

module.exports = Table;
