# Dataset API Reference

## Table of Contents

* [Intro](#intro)
* [Methods](#methods)
  * [createTable(tableId)](#createTable)
  * [refreshAccessToken([callback])](#refreshAccessToken)
  * [query(sql, [options], [callback])](#query)

## Intro

Best way to create a Dataset is using the [BigQuery#createDataset()](https://github.com/visionmobile/bigquery-model/blob/master/docs/bigquery.md#createDataset) method.

```javascript
var BigQuery = require('bigquery-model');

var bq = new BigQuery({
  email: 'xx@domain.com',
  projectId: 'xxx',
  key: 'pem-key'
});

var dataset = bq.createDataset('xxx');
```

## Methods

### <a name="createTable" href="#createTable">#</a>createTable(tableId, schema) -> Table

Creates and returns a new [Table](https://github.com/visionmobile/bigquery-model/blob/master/docs/table.md) with the designated properties.

##### Parameters

* `tableId` _(String)_ bigquery table id (required)
* `schema` _(Object)_ optional table schema

##### Returns

A [Table](https://github.com/visionmobile/bigquery-model/blob/master/docs/table.md) instance.

##### Example

```javascript
var table = dataset.createTable('xxx', {
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
* `options` _(Object)_ query options (optional)
  * `timeoutMs` _(number)_ timeout in millis; defaults to 10000
  * `useQueryCache` _(boolean)_ whether to look for the result in the query cache; defaults to true
* `callback` _(Function)_ callback function with (err, records) arguments (optional)

##### Returns

A bluebird promise resolving to the query results.

##### Example

```javascript
dataset.query('SELECT COUNT(*) AS count FROM [my-table]')
  .then(function (records) {
    // do something with records
  })
  .catch(function (err) {
    console.error(err);
  });
```
