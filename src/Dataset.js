import Promise from 'bluebird';
import Table from '../Table';

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
          datasetId: this.datasetId,
          projectId: this.projectId
        }
      }
    })

      .nodeify(callback);
  }

}

export default Dataset;
