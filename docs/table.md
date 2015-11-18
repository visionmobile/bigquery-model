# Table API Reference

## Table of Contents

* [Intro](#intro)
* [Methods](#methods)
  * [register()](#register)
  * [push(records)](#push)

## Intro

Best way to create a Table is using the [Dataset#createTable()](https://github.com/visionmobile/bigquery-model/blob/master/docs/dataset.md#createTable) method.

```javascript
var BigQuery = require('bigquery-model');

var bq = new BigQuery({
  email: 'xx@domain.com',
  projectId: 'xxx',
  key: 'pem-key'
});

var dataset = bq.createDataset('xxx');

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

* `records` _(Object*, Array)_ an object (accepts multiple arguments) or an array of objects
* `callback` _(Function)_ optional callback function with (err) arguments

##### Returns

A bluebird promise.

##### Example

```javascript
table.push(records)
  .then(function () {
    console.log('Records successfully appended to table');
  })
  .catch(function (err) {
    console.error(err);
  });
```
