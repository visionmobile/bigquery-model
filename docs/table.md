# BigQuery Table

## Table of Contents

* [Constructor](#constructor)
* [Methods](#methods)
  * [register()](#register)
  * [push(records)](#push)
  * [query(sql)](#query)

## Constructor

Creates a new BigQuery Table.

##### Parameters

* `props` _(Object)_ table properties (required)
  * `projectId` _(String)_ bigquery project id (required)
  * `datasetId` _(String)_ bigquery dataset id (required)
  * `tableId` _(String)_ bigquery table id (required)
  * `schema` _(Object)_ optional table schema

##### Throws

_(Error)_ if props are invalid.

##### Example

```javascript
var bigquery = require('bigquery-model');

// set authentication properties
bigquery.auth({
  email: 'yo@gmail.com',
  key: 'pem-key'
});

var table = new bigquery.Table({
  projectId: 'my-project-42',
  datasetId: 'my-dataset',
  tableId: 'my-table',
  schema: {
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
  }
});
```

## Methods

### <a name="register" href="#register">#</a>register([callback]) -> Promise

Registers (i.e. creates) the table in BigQuery, if not already exists.

##### Parameters

* `callback` _(Function)_ optional callback function with (err) arguments

##### Returns

An promise resolving to the qualified table id.

##### Example

```javascript
table.register()
  .then(function (tableid) {
    // table has been created under tableid
    // and is ready to accept records
  })
  .catch(function (err) {
    console.error(err);
  });
```

### <a name="push" href="#push">#</a>push(records, [callback]) -> Promise

Appends the given records to table.

##### Parameters

* `records` _(Array<Object>)_ an array of objects
* `callback` _(Function)_ optional callback function with (err) arguments

##### Returns

A bluebird promise.

##### Example

```javascript
table.push(records)
  .then(function () {
    // records appended to table
  })
  .catch(function (err) {
    console.error(err);
  });
```

### <a name="query" href="#query">#</a>query(sql, [callback]) -> Promise

Runs the designated SQL query and returns the results.

##### Parameters

* `sql` _(String)_ the SQL query to run
* `callback` _(Function)_ optional callback function with (err, records) arguments

##### Returns

A bluebird promise resolving to the query results.

##### Example

```javascript
table.sql('SELECT COUNT(*) AS count FROM [my-table]')
  .then(function (records) {
    // do something with records
  })
  .catch(function (err) {
    console.error(err);
  });
```
