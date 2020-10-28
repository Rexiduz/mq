const recursive = require('./functions').recursive

// Base on portrait
const DEVICE_SIZES_BASE = {
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

const DEVICE_SIZES = recursive(DEVICE_SIZES_BASE, (value) => `${value + 20}px`)

const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1366,
  xxl: 1600
}

exports.DEVICE_SIZES_BASE = DEVICE_SIZES_BASE
exports.DEVICE_SIZES = DEVICE_SIZES
exports.BREAKPOINTS = BREAKPOINTS
