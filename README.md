# proxy-pool
proxy-pool is http ip proxy pool,can get ip proxy info ,and return to pool

# installation
```js
$ npm install proxy-pool
```
# example
```js

const HttpProxyPool = require("proxy-pool");
const KaidiProxySupplier = require("./supplier/KaidiProxySupplier");
const pool = new HttpProxyPool(new KaidiProxySupplier());
(async ()=>{
const result = await this.pool.getProxy();
console.log(result);
})();
 
```
