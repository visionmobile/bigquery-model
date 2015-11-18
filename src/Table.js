const uuid = require('node-uuid');
const _ = require('lodash');

class Table {

  constructor({datasetId, projectId, tableId, schema, client}) {
    this.datasetId = datasetId;
    this.projectId = projectId;
    this.tableId = tableId;
    this.client = client;
    this.schema = schema || null;
  }

  /**
   * Registers (creates) the table in database.
   * @param {Function} [callback]
   * @return {Promise}
   */
  register(callback) {
    return this.client.tables.insertAsync({
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

      .spread((data) => data.id)

      .catch((err) => {
        // check if table already exists
        if (err.code === 409) {
          return this.projectId + ':' + this.datasetId + '.' + this.tableId;
        }

        throw err;
      })

      .nodeify(callback);
  }

  /**
   * Appends the specified records to table.
   * @param {Object, Array<Object>} records
   * @param {Function} [callback]
   * @return {Promise}
   */
  push(records, callback) {
    // make sure records is array
    if (!_.isArray(records)) records = _.toArray(arguments);

    // prepare records for insert
    records = records.map((e) => {
      return {
        insertId: uuid.v4(),
        json: e
      };
    });

    return this.client.tabledata.insertAllAsync({
      projectId: this.projectId,
      datasetId: this.datasetId,
      tableId: this.tableId,
      resource: {
        rows: records
      }
    })

      .spread((data) => {
        // check if errors exist
        if (data.insertErrors) {
          throw _.assign(new Error(), data.insertErrors[0].errors[0]);
        }

        return data;
      })

      .nodeify(callback);
  }

}

module.exports = Table;
