const JSONPath = require('../index')
const jp = require('jsonpath')
const mockJSON = require('./mockJSON.json')

describe("json-path", () => {

  const $ = JSONPath(mockJSON)

  it('Root and deferencing', () => {
    expect($).toEqual(mockJSON)
    //expect($.store).toEqual(mockJSON.store)
    //expect($.store.book).toEqual(mockJSON.store.book)
  })

  return

  it('All children', () => {
    const actual = jp.query(mockJSON, '$.store.*')
    const expected = $.store['*']
    expect(expected).toEqual(actual)
  })

  it ('All books in the store', () => {
    const actual = jp.query(mockJSON, '$.store.book[*]')
    const expected = $.store.book["*"]
    expect(expected).toEqual(actual)

  })

  it ('The authors of all books in the store', () => {
    const actual = jp.query(mockJSON, '$.store.book[*].author')
    const expected = $.store.book["*"].author
    expect(expected).toEqual(actual)
  })
  return

  it ('All authors', () => {
    const actual = jp.query(mockJSON, '$..author')
    const expected = $[".."].author
    expect(expected).toEqual(actual)
  })

  it ('All things in store, which are some books and a red bicycle', () => {
    const actual = jp.query(mockJSON, '$.store.*')
    const expected = $.store["*"]
    expect(expected).toEqual(actual)
  })

  it ('The price of everything in the store', () => {
    const actual = jp.query(mockJSON, '$.store..price')
    const expected = $.store[".."].price
    expect(expected.sort()).toEqual(actual.sort())
  })

  it ('The third book', () => {
    const actual = jp.query(mockJSON, '$..book[2]')
    const expected = $[".."].book[2]
    expect(expected).toEqual(actual)
  })

  it ('The last book via script subscript', () => {
    const actual = jp.query(mockJSON, '$..book[(@.length-1)]')
    const expected = $[".."].book["[(@.length-1)]"]
    expect(expected).toEqual(actual)
  })

  it ('The last book via slice', () => {
    const actual = jp.query(mockJSON, '$..book[-1:]')
    const expected = $[".."].book["-1:"]
    expect(expected).toEqual(actual)
  })

  it ('The first two books via subscript union', () => {
    const actual = jp.query(mockJSON, '$..book[0,1]')
    const expected = $[".."].book["0,1"]
    expect(expected).toEqual(actual)
  })

  it ('The first two books via subscript array slice', () => {
    const actual = jp.query(mockJSON, '$..book[:2]')
    const expected = $[".."].book[":2"]
    expect(expected).toEqual(actual)
  })

  it ('Filter all books with isbn number', () => {
    const actual = jp.query(mockJSON, '$..book[?(@.isbn)]')
    const expected = $[".."].book["?(@.isbn)"]
    expect(expected).toEqual(actual)
  })

  it ('_Filter all books cheaper than 10_', () => {
    const actual = jp.query(mockJSON, '$..book[?(@.price<10)]')
    const expected = $[".."].book["?(@.price<10)"]
    expect(expected).toEqual(actual)
  })

  it ('Filter all books that cost 8.95', () => {
    const actual = jp.query(mockJSON, '$..book[?(@.price==8.95)]')
    const expected = $[".."].book["?(@.price==8.95)"]
    expect(expected).toEqual(actual)
  })

  it ('Filter all fiction books cheaper than 30', () => {
    const actual = jp.query(mockJSON, '$..book[?(@.price<30 && @.category=="fiction")]')
    const expected = $[".."].book["?(@.price<30 && @.category==\"fiction\")"]
    expect(expected).toEqual(actual)
  })

  it ('All members of JSON structure', () => {
    const actual = jp.query(mockJSON, '$..*')
    const expected = $["..*"]
    expect(expected).toEqual(actual)
  })
})


