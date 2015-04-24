# BigQuery Model

## Table of Contents

* [auth(options)](#auth)
* [Table](#table)

### <a name="auth" href="#auth">#</a>auth(options) -> void

Sets authentication options of the internal BigQuery client.

##### Parameters

* `options` _(Object)_ authentication options (required)
  * `email` _(String)_ your registered email in Google Cloud (required)
  * `keyFile` _(String)_ path to the signature file (optional if key is provided)
  * `key` _(String)_ the contents of the signature file (optional if keyFile is provided)

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
```

### <a name="table" href="#table">#</a>Table -> Table

A handy reference to the [Table](https://github.com/visionmobile/bigquery-model/blob/master/docs/table.md class.
