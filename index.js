const jp = require('jsonpath')

/**
 * @todo we need to build the whole path instead of recursing
 * The smaller queries from dereference point have quirks
 */
function JSONPath(obj) {
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
              path = jp.stringify(prop)
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

// extend jsonpath
const proto = typeof Object.getPrototypeOf === 'function' ? Object.getPrototypeOf(jp) : jp.__proto__
const methods = Object.keys(proto).reduce((next, key) =>{
  return { ...next, [key]: typeof proto[key] === 'function' ? proto[key].bind(jp) : proto[key] }
}, {})
Object.assign(JSONPath, methods)

module.exports = JSONPath