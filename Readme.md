# JSONPath

JSONPath expressions as first class JS object properties

Proxies [jsonpath](https://github.com/json-path/JsonPath) queries as JS object property chain

## Usage

```js
const $ = require('jsonpath-proxy')(json)
const result = $.path["[query]"]
```

## Query Example

```javascript
const jsonpath = require('jsonpath-proxy')

var cities = [
  { name: "London", "population": 8615246 },
  { name: "Berlin", "population": 3517424 },
  { name: "Madrid", "population": 3165235 },
  { name: "Rome",   "population": 2870528 }
];

var $ = jsonpath.$(cities);
var names = $['..'].name;

// [ "London", "Berlin", "Madrid", "Rome" ]
```
The same example with `jsonpath`

```javascript
var cities = [
  { name: "London", "population": 8615246 },
  { name: "Berlin", "population": 3517424 },
  { name: "Madrid", "population": 3165235 },
  { name: "Rome",   "population": 2870528 }
];

const jsonpath = require('jsonpath-proxy') // same as require('jsonpath')
var names = jsonpath.query(cities, '$..name');

// [ "London", "Berlin", "Madrid", "Rome" ]
```

## Install

Install from npm:
```bash
$ npm install jsonpath-proxy
```

## JSONPath Syntax

Here are syntax and examples adapted from [Stefan Goessner's original post](http://goessner.net/articles/JsonPath/) introducing JSONPath in 2007.

JSONPath         | Description
-----------------|------------
`$`               | The root object/element
`@`                | The current object/element
`.`                | Child member operator
`..`	         | Recursive descendant operator; JSONPath borrows this syntax from E4X
`*`	         | Wildcard matching all objects/elements regardless their names
`[]`	         | Subscript operator
`[,]`	         | Union operator for alternate names or array indices as a set
`[start:end:step]` | Array slice operator borrowed from ES4 / Python
`?()`              | Applies a filter (script) expression via static evaluation
`()`	         | Script expression via static evaluation 

Given this sample data set, see example expressions below:

```javascript
{
  "store": {
    "book": [ 
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      }, {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }, {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }, {
         "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
```

Example `jsonpath-proxy.$` expressions:

JSONPath                      | Description
------------------------------|------------
`$.store.book["*"].author`       | The authors of all books in the store
`$[".."].author`                     | All authors
`$.store.["*"]`                    | All things in store, which are some books and a red bicycle
`$.store[".."].price`                | The price of everything in the store
`$[".."]book[2]`                    | The third book
`$[".."]book("[(@.length-1)]"]`         | The last book via script subscript
`$[".."]book["[-1:]"]`                  | The last book via slice
`$[".."]book["[0,1]"]`                  | The first two books via subscript union
`$[".."]book["[:2]"]`                  | The first two books via subscript array slice
`$[".."]book["[?(@.isbn)]"]`            | Filter all books with isbn number
`$[".."]book["[?(@.price<10)]"]`        | Filter all books cheaper than 10
`$[".."]book["[?(@.price==8.95)]"]`        | Filter all books that cost 8.95
`$[".."]book["[?(@.price<30 && @.category=="fiction")]"]`        | Filter all fiction books cheaper than 30
`$[".."]["*"]`                         | All members of JSON structure

Example `jsonpath.query` expressions:

JSONPath                      | Description
------------------------------|------------
`$.store.book[*].author`       | The authors of all books in the store
`$..author`                     | All authors
`$.store.*`                    | All things in store, which are some books and a red bicycle
`$.store..price`                | The price of everything in the store
`$..book[2]`                    | The third book
`$..book[(@.length-1)]`         | The last book via script subscript
`$..book[-1:]`                  | The last book via slice
`$..book[0,1]`                  | The first two books via subscript union
`$..book[:2]`                  | The first two books via subscript array slice
`$..book[?(@.isbn)]`            | Filter all books with isbn number
`$..book[?(@.price<10)]`        | Filter all books cheaper than 10
`$..book[?(@.price==8.95)]`        | Filter all books that cost 8.95
`$..book[?(@.price<30 && @.category=="fiction")]`        | Filter all fiction books cheaper than 30
`$..*`                         | All members of JSON structure

## All other `jsonpath` api methods

@see https://github.com/json-path/JsonPath

## License

MIT