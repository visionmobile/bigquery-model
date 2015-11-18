# BigQuery API reference

## Table of Contents

* [Intro](#intro)
* [Constructor](#constructor)
* [Methods](#methods)
  * [createDataset(datasetId)](#createDataset)

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
