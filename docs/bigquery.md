# BigQuery API reference

## Table of Contents

* [Intro](#intro)
* [Constructor](#constructor)
* [Methods](#methods)
  * [createDataset(datasetId)](#createDataset)
  * [createTable(datasetId, tableId, schema)](#createTable)
  * [query(sql, [callback])](#query)

## Intro

Install bigquery-model using npm.

```
$ npm install bigquery-model
```

Reference BigQuery in your code.

```javascript
var BigQuery = require('bigquery-model');
```

## Constructor

Creates a new BigQuery Client.

##### Parameters

* `options` _(Object)_ authentication options (required)
  * `email` _(String)_ your registered email in Google Cloud (required)
  * `projectId` _(String)_ the id of the the project to work on (required)
  * `keyFile` _(String)_ path to the signature file (optional if key is provided)
  * `key` _(String)_ the contents of the signature file (optional if keyFile is provided)

##### Throws

_(Error)_ if props are invalid.

##### Example

```javascript
var BigQuery = require('bigquery-model');

var bq = new BigQuery({
  email: 'xx@domain.com',
  projectId: 'xxx',
  key: 'pem-key'
});
```

## Methods

### <a name="createDataset" href="createDataset">#</a>createDataset(datasetId) -> Dataset

Creates and returns a new [Dataset](https://github.com/visionmobile/bigquery-model/blob/master/docs/dataset.md) with the given id.

##### Parameters

* `datasetId` _(String)_ the id of a dataset on BigQuery (required)

##### Returns

A [Dataset](https://github.com/visionmobile/bigquery-model/blob/master/docs/dataset.md) instance.

##### Example

```javascript
var dataset = bq.createDataset('xxx');
```

### <a name="createTable" href="#createTable">#</a>createTable(datasetId, tableId, schema) -> Table

Creates and returns a new [Table](https://github.com/visionmobile/bigquery-model/blob/master/docs/table.md) with the designated properties.

##### Parameters

* `datasetId` _(String)_ bigquery dataset id (required)
* `tableId` _(String)_ bigquery table id (required)
* `schema` _(Object)_ optional table schema

##### Returns

A [Table](https://github.com/visionmobile/bigquery-model/blob/master/docs/table.md) instance.

##### Example

```javascript
var table = dataset.createTable('dataset-xxx', 'table-xxx', {
  fields: [
    {name: 'first_name', type: 'string', mode: 'required'},
    {name: 'last_name', type: 'string', mode: 'required'},
    {name: 'address', type: 'record', fields: [
      {name: 'street', type: 'string'},
      {name: 'number', type: 'integer'},
      {name: 'area', type: 'string'},
    ]},
    {name: 'hobbies', type: 'string', mode: 'repeated'}
  ]
});
```

### <a name="query" href="#query">#</a>query(sql, [callback]) -> Promise

Runs the designated SQL query and returns the results.

##### Parameters

* `sql` _(String)_ the SQL query to run (required)
* `callback` _(Function)_ callback function with (err, records) arguments (optional)

##### Returns

A bluebird promise resolving to the query results.

##### Example

```javascript
dataset.sql('SELECT COUNT(*) AS count FROM [my-table]')
  .then(function (records) {
    // do something with records
  })
  .catch(function (err) {
    console.error(err);
  });
```
