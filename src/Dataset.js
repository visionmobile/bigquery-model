import Promise from 'bluebird';
import _ from 'lodash';
import Table from './Table';

class Dataset {

  constructor({datasetId, projectId, client}) {
    this.datasetId = datasetId;
    this.projectId = projectId;
    this.client = client;
  }

  getTable(tableId) {
    return new Table(tableId);
  }

  refreshAccessToken(callback) {
    let resolver = (resolve, reject) => {
      this.client.auth.refreshAccessToken((err) => {
        if (err) return reject(err);
        resolve();
      });
    };

    return new Promise(resolver).nodeify(callback);
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
        let fields = data.schema.fields.map((field) => {
          return field.name;
        });

        return data.rows.map((row) => {
          let data = row.f.map((col) => {
            return col.v;
          });

          return _.zipObject(fields, data);
        });
      })

      .nodeify(callback);
  }

}

export default Dataset;
