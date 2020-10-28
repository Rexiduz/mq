###Example

```
const mq = require('@rexiduz/mq')

const rule = mq.getter("_EXPRESSIONS._MOBILE_LANDSCAPE")
const mediaRule = mq.createRule(rule)


console.log(mediaRule)
```

**output**

```
@media
      screen and (pointer: coarse) and (orientation: landscape) and (max-width: 832px),
      screen and (orientation: landscape) and (max-width: 832px)
```
