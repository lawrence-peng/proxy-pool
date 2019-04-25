# proxy-pool
[![npm version](https://img.shields.io/npm/v/web-proxy-pool.svg?style=flat-square)](https://www.npmjs.org/package/web-proxy-pool)

proxy-pool is http ip proxy pool,can get ip proxy info ,and return to pool

# installation

```js
$ npm install web-proxy-pool
```

# example

```js
const HttpProxyPool = require("web-proxy-pool");
const KaidiProxySupplier = require("./supplier/KaidiProxySupplier");
const pool = new HttpProxyPool(new KaidiProxySupplier());
(async () => {
  const result = await this.pool.getProxy();
  console.log(result);
})();
```
