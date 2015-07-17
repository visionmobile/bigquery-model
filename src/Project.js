import Dataset from './Dataset';

class Project {

  constructor({projectId, client}) {
    this.projectId = projectId;
    this.client = client;
  }

  getDataset(datasetId) {
    return new Dataset({
      datasetId,
      projectId: this.projectId,
      client: this.client
    });
  }

}

export default Project;
