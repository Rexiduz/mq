Detect screen size and write media query
<br/>

#### Example

```
import { mq } from 'rexiduz-mq'

console.log(mq('md')) >> '@media (min-width: 1024px)'
console.log(mq('md', false)) >> '(min-width: 1024px)'
```

#### ReactJs

```
import { useBreakpoint } from 'rexiduz-mq'

...

const { screens } = useBreakpoint()

return (
      <>
            { screens.mobile && <h1>Hi Mobile</h1> }
            { screens.tablet && <h1>Hi Tablet</h1> }
            { screens.desktop && <h1>Hi Desktop</h1> }
            { screens.xs && <h1>Hi Screen size 'xs'</h1> }
            { screens.sm && <h1>Hi Screen size 'sm'</h1> }
            { screens.md && <h1>Hi Screen size 'md'</h1> }
            { screens.lg && <h1>Hi Screen size 'lg'</h1> }
            { screens.xl && <h1>Hi Screen size 'xl'</h1> }
            { screens.xxl && <h1>Hi Screen size 'xxl'</h1> }
            { screens.xxxl && <h1>Hi Screen extra sizes</h1> }
      </>
)
```

#### Override `breakpoints`

```
import { breakpoints, mq } from 'rexiduz-mq'


console.log(breakpoints.lg) >> 1280

// override
breakpoints.lg = 1300

console.log(breakpoints.lg) >> 1300
console.log(mq('lg')) >> '@media (min-width: 1300px)'
console.log(mq('lg', false)) >> '(min-width: 1300px)'

```

#### Integrate with `styled-components`

```
const Container = styled.div`
      background: red;

      ${mq('lg')} {
            background: yellow;
      }
`
```
