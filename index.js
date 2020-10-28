const get = require('lodash/get')
const recursive = require('./functions').recursive

// Base on portrait
const deviceSizes = {
  mobile: {
    max: {
      w: 414, //iPhone 6/7/8 Plus
      h: 812 //iPhoneX
    },
    min: {
      w: 360, //Moto G4
      h: 568 //iPhone 5
    }
  },
  tablet: {
    max: {
      w: 1024, //iPad Pro
      h: 1366 //iPad Pro
    }
  }
}

const sizes = recursive(deviceSizes, (value) => `${value + 20}px`)

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1366,
  xxl: 1600
}

const MediaQuery = (function () {
  return {
    _EXPRESSIONS: {
      _TOUCH_DEVICES: `
      screen and (pointer: coarse), 
      screen and (orientation: landscape) and (min-width: ${sizes.mobile.min.h}) and (max-width: ${sizes.tablet.max.w}),
      screen and (orientation: portrait) and (min-height: ${sizes.mobile.min.w}) and (max-height: ${sizes.tablet.max.h})`,
      _MOBILE_LANDSCAPE: `
      screen and (pointer: coarse) and (orientation: landscape) and (max-width: ${sizes.mobile.max.h}),
      screen and (orientation: landscape) and (max-width: ${sizes.mobile.max.h})`,
      _MOBILE_PORTRAIT: `
      screen and (pointer: coarse) and (orientation: portrait) and (max-width: ${sizes.mobile.max.w}), 
      screen and (orientation: portrait) and (max-width: ${sizes.mobile.max.w})`,
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
})()

module.exports = MediaQuery
module.exports.DEVICE_SIZES_BASE = deviceSizes
module.exports.BREAKPOINTS = breakpoints
module.exports.DEVICE_SIZES = sizes
