## Random Price Feed

**This script generates a new price within a certain random range.  When the deviation surpases 1%, a notification will log out**

- Set a base price in `Current Price` defaulted to 2000
- Change `maxChangePercent` for larger/smaller changes in price (set to .25%)
- Based on `Math.random()` larger deviations will occur changing the flow of the price
If the price change deviates 1% or more, it will store that price value in a local variable and check against new prices that come after it.

```shell
$ node script.js
```
