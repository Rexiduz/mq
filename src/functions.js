const reduce = require('lodash.reduce')

const typeOf = function (obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase()
}

const recursive = function (obj, callback = (value) => value) {
  return reduce(
    obj,
    (result, value, key) => {
      if (typeOf(value) === 'array') {
        return {
          ...result,
          [key]: [...Object.values(recursive(value, callback))]
        }
      }

      if (typeOf(value) === 'object') {
        return {
          ...result,
          [key]: recursive(value, callback)
        }
      }

      return {
        ...result,
        [key]: callback(value, key, obj)
      }
    },
    {}
  )
}

exports.recursive = recursive
exports.typeOf = typeOf
