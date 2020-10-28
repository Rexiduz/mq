const mq = require('.')
const CONSTANTS = require('.').CONSTANTS

console.log('mq', mq)
console.log(
  'test rule :',
  mq.createRule(mq.getter('_EXPRESSIONS._MOBILE_LANDSCAPE'))
)
console.log({ CONSTANTS })
