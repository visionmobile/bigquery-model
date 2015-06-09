# BigQuery Table

## Table of Contents

* [TableFactory](#tablefactory)

### TableFactory

Generates a new BigQuery Table class.

##### Parameters

* `projectId` _(String)_ bigquery project id (required)
* `datasetId` _(String)_ bigquery dataset id (required)
* `tableId` _(String)_ bigquery table id (required)
* `schema` _(Object)_ optional table schema

##### Example

```javascript
var TableFactory = require('bigquery-model').TableFactory;

var Table = TableFactory('my-project-42', 'my-dataset', 'my-table', {
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

vat table = new Table();
```
