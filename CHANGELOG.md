## 1.0.0 - 2015-11-18

* Change BigQuery API which now requires `projectId` in `options` argument
* Allow #query(), #createDataset() and #createTable() directly from BigQuery
* Update npm dependencies: googleapis@2.1.6, bluebird@3.0.5, node-uuid@1.4.7, customerror@1.0.1
* Update babel + gulp infrastructure

## 0.3.0 - 2015-09-16

* Expose Dataset#createTable()
* Update npm dependencies: babel@5.8.23, mocha@2.3.2, gulp-babel@5.2.1, chai@3.2.0, googleapis@2.1.3, lodash@3.10.1, bluebird@2.10.0
* Replace .jshintrc with .eslintrc

## 0.3.0-alpha.2 - 2015-07-17

* Fix the query method to return data in JSON

## 0.3.0-alpha.1 - 2015-07-17

* Change the API exposing Project, Dataset and Table
* Rewrite using es2015
* Update npm dependencies (bluebird@2.9.34, googleapis@2.1.1)

## 0.2.3 - 2015-07-10

* Update npm dependencies (bluebird@2.9.33, dotenv@1.2.0, googleapis@2.0.6, lodash@3.10.0)

## 0.2.2 - 2015-07-10

* Bugfix: Don't supress errors on #push

## 0.2.1 - 2015-06-10

* Bugfix: Referencing invalid module name "./table" instead of "./Table"

## 0.2.0 - 2015-06-09

* Expose TableFactory class to generate Table classes.
* Update googleapis to v.2.0.5 (https://github.com/google/google-auth-library-nodejs/issues/37)

## 0.1.3 - 2015-06-09

* Extend #push to accept multiple objects or array

## 0.1.2 - 2015-05-18

* Freeze google-auth-library to v.0.9.3

## 0.1.1 - 2015-05-18

* Freeze googleapis npm module version to v.2.0.2 until further notice

## 0.1.0 - 2015-05-18

* Update npm dependencies
* Adopt semantic versioning

## 0.1.0-alpha.4 - 2015-04-25

* Session references the auth object under google._options

## 0.1.0-alpha.3 - 2015-04-24

* Bugfix: Reference the right Table module

## 0.1.0-alpha.2 - 2015-04-24

* Bugfix: Install the right type-of module

## 0.1.0-alpha.1 - 2015-04-24

* Exposing a simple Table class with #register(), #push(records) and #query(sql) methods
