var Table = require('./Table');

function TableFactory(projectId, datasetId, tableId, schema) {
  var t = Table.bind(t, {
    projectId: projectId,
    datasetId: datasetId,
    tableId: tableId,
    schema: schema || null
  });

  return t;
}

module.exports = TableFactory;
