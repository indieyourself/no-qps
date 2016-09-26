# no-qps
A QPS counter for benchmark.

##Install
```bash
$ npm install qps
```

##Usage
```js
const QPS = require('no-qps');

// new counter
var qps = new QPS(20000);

//start
qps.start();

//count
qps.count();

```
