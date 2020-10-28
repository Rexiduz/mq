const get = require('lodash.get')
const { DEVICE_SIZES_BASE, DEVICE_SIZES, BREAKPOINTS } = require('./constants')

const MediaQuery = function () {
  return {
    _EXPRESSIONS: {
      _TOUCH_DEVICES: `
      screen and (pointer: coarse), 
      screen and (orientation: landscape) and (min-width: ${DEVICE_SIZES.mobile.min.h}) and (max-width: ${DEVICE_SIZES.tablet.max.w}),
      screen and (orientation: portrait) and (min-height: ${DEVICE_SIZES.mobile.min.w}) and (max-height: ${DEVICE_SIZES.tablet.max.h})`,
      _MOBILE_LANDSCAPE: `
      screen and (pointer: coarse) and (orientation: landscape) and (max-width: ${DEVICE_SIZES.mobile.max.h}),
      screen and (orientation: landscape) and (max-width: ${DEVICE_SIZES.mobile.max.h})`,
      _MOBILE_PORTRAIT: `
      screen and (pointer: coarse) and (orientation: portrait) and (max-width: ${DEVICE_SIZES.mobile.max.w}), 
      screen and (orientation: portrait) and (max-width: ${DEVICE_SIZES.mobile.max.w})`,
      mobileOnly() {
        const getter = this.getter.bind(this)

        const ml = getter('_EXPRESSIONS._MOBILE_LANDSCAPE')
        const mp = getter('_EXPRESSIONS._MOBILE_PORTRAIT')

        return `handheld, ${ml}, ${mp}`
      }
    },
    range(sizing, { min, max }) {
      return `(min-${sizing}: ${min}) and (max-${sizing}: ${max})`
    },
    query(qr, size) {
      return `(${qr}: ${size})`
    },
    getter(key, ...values) {
      const _key = get(this, key.split('.'), '')

      if (typeof _key === 'function') {
        const fn = _key.bind(this)
        return fn(...values)
      }

      return _key
    },
    createRule(rule) {
      return `@media ${rule}`
    }
  }
}

module.exports = MediaQuery()
