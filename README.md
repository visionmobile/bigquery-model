# BigQuery Model

Managing BigQuery complexity using simple, well-defined models.

#### Features

* Promise and callback interface;
* Simple API.

## Quick start

```javascript
var BigQuery = require('bigquery-model');

var bq = new BigQuery({
  email: 'xx@domain.com',
  projectId: 'xxx',
  key: 'pem-key'
});

return bq.query('SELECT first_name, last_name FROM [dataset.table];')
```

For further information on how to use this library please refer to the [API docs](https://github.com/visionmobile/bigquery-model/blob/master/docs/bigquery.md).

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

* Issue Tracker: [github.com/visionmobile/bigquery-model/issues](https://github.com/visionmobile/bigquery-model/issues)

## License

MIT
