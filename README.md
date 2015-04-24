# BigQuery Model

Node.js abstraction layer to BigQuery tables.

#### Features

* Promise and callback interface;
* Simple API.

## Quick start

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

return table.query('SELECT first_name, last_name FROM [my-table];')
```

For further information on how to use this library please refer to the [API docs](https://github.com/visionmobile/bigquery-model/blob/master/docs/table.md).

## Installation

```
$ npm install bigquery-model
```

#### Requirements

* Node.js 0.8+

## Contribute

Source code contributions are most welcome. The following rules apply:

1. JavaScript source code needs to follow the [Airbnb Style Guide](https://github.com/airbnb/javascript);
2. Functions need to be well documented in [API docs](https://github.com/visionmobile/bigquery-model/blob/master/docs/bigquery.md);
3. Unit tests are necessary.

## Support

If you are having issues with this library, please let us know.

* Issue Tracker: [github.com/visionmobile/bigquery-model/issues](https://github.com/visionmobile/heroku-dyno/issues)

## License

MIT
