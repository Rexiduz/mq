const useMediaQuery = require('react-responsive').useMediaQuery
const last = (list = []) => list[list.length - 1]

const breakpoints = {
  xs: 512,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  xxl: 1680,
  xxxl: 1920
}

const getWidth = (breakpoint = 'md') => {
  return breakpoints[breakpoint]
}

const mq = (size, symbol = true) => {
  const words = []
  const breakpoint = getWidth(size)
  const screenSize = breakpoint ? `${breakpoint}px` : size

  if (symbol) {
    words.push('@media')
  }

  words.push(`(min-width: ${screenSize})`)

  return words.join(' ')
}

const vh = (size) => {
  return `calc(var(--vh, 1vh) * ${size})`
}

const useBreakpoint = () => {
  const xs = useMediaQuery({ query: mq('xs', false) })
  const sm = useMediaQuery({ query: mq('sm', false) })
  const md = useMediaQuery({ query: mq('md', false) })
  const lg = useMediaQuery({ query: mq('lg', false) })
  const xl = useMediaQuery({ query: mq('xl', false) })
  const xxl = useMediaQuery({ query: mq('xxl', false) })
  const xxxl = useMediaQuery({ query: mq('xxxl', false) })

  const matchesStrings = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxl', 'xxxl']
  const matches = [xs, sm, md, lg, xl, xxl, xxl, xxxl]
  const matchedIndex = matches.lastIndexOf(true) + 1

  const finalMatchedIndex =
    matchedIndex === matchesStrings.length
      ? matchesStrings.length - 1
      : matchedIndex

  const breakpoint = matchesStrings[finalMatchedIndex]
  const screenSizes = matchesStrings.filter(
    (_, index) => index <= finalMatchedIndex
  )

  const screens = screenSizes.reduce((a, c) => ({ ...a, [c]: true }), {})

  screens.mobile = ['xs'].includes(last(screenSizes))
  screens.tablet = ['sm', 'md'].includes(last(screenSizes))
  screens.desktop = !!screens.lg

  const isLowerThan = (bp) => {
    const indexOfBp = matchesStrings.indexOf(bp)
    const overflowBp = screenSizes.filter((_, index) => indexOfBp < index)
    return !overflowBp.length
  }

  return {
    screens,
    current: { size: { [breakpoint]: true }, breakpoint },
    isLowerThan
  }
}

module.exports.getWidth = getWidth
module.exports.mq = mq
module.exports.vh = vh
module.exports.useBreakpoint = useBreakpoint
module.exports.breakpoints = breakpoints
