## 1.2.1 - 2016-02-25

* Remove console.log statement, originally inserted for debugging.

## 1.2.0 - 2016-02-25

* Rename timeout to timeoutMs to match BigQuery convention + add new option "useQueryCache".
* Bugfix: Post timeout in the resource body, otherwise BigQuery ignores the setting.
* Document "timeoutMs" and "useQueryCache" query options.
* Update npm dependencies: lodash@4.5.1.

## 1.1.0 - 2016-02-19

* Add options parameter to BigQuery#query() and Dataset#query() - user should be able to specify query timeout.
* Update npm dependencies: lodash@4.5.0, bluebird@3.3.1.

## 1.0.5 - 2016-02-10

* Bugfix: BigQuery#query() and Dataset#query() should return empty array when data or schema is undefined.
* Refactor using ES2015 modules, instead of CommonJS.
* Update npm dependencies: googleapis@2.1.7, bluebird@3.2.2, lodash@4.3.0, mocha@2.4.5, chai@3.5.0.
* Update gulp + babel dependencies.
* Use babel-plugin-add-module-exports to fix the exports.default issue.

## 1.0.4 - 2015-12-02

* Bugfix: make sure data.rows is always an array.

## 1.0.3 - 2015-11-24

* Bugfix: invalid error message when projectId is not String - see https://github.com/visionmobile/bigquery-model/issues/1

## 1.0.2 - 2015-11-18

* Pass {multiArgs: true} on #promisifyAll().

## 1.0.1 - 2015-11-18

* Bugfix: invalid reference; export Table using CommonJS.

## 1.0.0 - 2015-11-18

* Change BigQuery API which now requires `projectId` in `options` argument.
* Allow #query(), #createDataset() and #createTable() directly from BigQuery.
* Update npm dependencies: googleapis@2.1.6, bluebird@3.0.5, node-uuid@1.4.7, customerror@1.0.1.
* Update babel + gulp infrastructure.

## 0.3.0 - 2015-09-16

* Expose Dataset#createTable().
* Update npm dependencies: babel@5.8.23, mocha@2.3.2, gulp-babel@5.2.1, chai@3.2.0, googleapis@2.1.3, lodash@3.10.1, bluebird@2.10.0.
* Replace .jshintrc with .eslintrc.

## 0.3.0-alpha.2 - 2015-07-17

* Fix the query method to return data in JSON.

## 0.3.0-alpha.1 - 2015-07-17

* Change the API exposing Project, Dataset and Table.
* Rewrite using es2015.
* Update npm dependencies (bluebird@2.9.34, googleapis@2.1.1).

## 0.2.3 - 2015-07-10

* Update npm dependencies (bluebird@2.9.33, dotenv@1.2.0, googleapis@2.0.6, lodash@3.10.0).

## 0.2.2 - 2015-07-10

* Bugfix: Don't supress errors on #push.

## 0.2.1 - 2015-06-10

* Bugfix: Referencing invalid module name "./table" instead of "./Table".

## 0.2.0 - 2015-06-09

* Expose TableFactory class to generate Table classes.
* Update googleapis to v.2.0.5 (https://github.com/google/google-auth-library-nodejs/issues/37).

## 0.1.3 - 2015-06-09

* Extend #push to accept multiple objects or array.

## 0.1.2 - 2015-05-18

* Freeze google-auth-library to v.0.9.3.

## 0.1.1 - 2015-05-18

* Freeze googleapis npm module version to v.2.0.2 until further notice.

## 0.1.0 - 2015-05-18

* Update npm dependencies.
* Adopt semantic versioning.

## 0.1.0-alpha.4 - 2015-04-25

* Session references the auth object under google._options.

## 0.1.0-alpha.3 - 2015-04-24

* Bugfix: Reference the right Table module.

## 0.1.0-alpha.2 - 2015-04-24

* Bugfix: Install the right type-of module.

## 0.1.0-alpha.1 - 2015-04-24

* Exposing a simple Table class with #register(), #push(records) and #query(sql) methods.
