const jp = require('jsonpath')

/**
 * @todo we need to build the whole path instead of recursing
 * The smaller queries from dereference point have quirks
 */
module.exports = function JSONPath(obj) {
  try {
    return new Proxy(obj, {
      get(obj, prop) {
        let result, path
        try {
          if (prop in obj) {
            result = obj[prop]
          } else {
            // .. requires STAR,IDENTIFIER,SCRIPT_EXPRESSION,INTEGER,END 
            if (prop === '..') {
              path = '$..*'
            } else if (prop.includes('[')) {
              path = `$.*${prop}` 
            } else if (Array.isArray(obj) && prop !== '*') {
              // arrays need to be backtracked
              path = `$.*.${prop}`
            } else {
              path = `$[${prop}]`
            }
            result = jp.query(obj, path)
          }
          //console.log('get', { obj, prop, path, result })
        } catch(err) {
          result = obj[prop]
          //console.warn('Error', { obj, prop, path, result, err })
          return result
        }
        return JSONPath(result)
      }
    })
  } catch(err) {
    return obj
  }
}