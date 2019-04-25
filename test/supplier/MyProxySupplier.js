const ProxySupplier = require("../../dist/core/ProxySupplier").default;
const ProxyInfo = require("../../dist/core/ProxyInfo").default;

const axios = require("axios");

class MyProxySupplier extends ProxySupplier {
  kuaiProxyPromise(num = 8) {
    const url = `http://jianbing.kuaidaili.com/api/getdps/?orderid=930121364785691&num=${num}&ut=1&format=json&sep=1`;
    return new Promise(function(resolve, reject) {
      axios
        .get(url)
        .then(function(response) {
          if (response.status != 200)
            return reject(
              new Error(`${response.status} ${response.statusText}`)
            );
          const body = response.data;
          if (body.code === 0 && body.data.proxy_list.length > 0) {
            var proxyList = body.data.proxy_list.map(item => {
              return new ProxyInfo(
                item.split(":")[0],
                item.split(":")[1],
                "http",
                "1595450331",
                "iaaojegt"
              );
            });
            return resolve(proxyList);
          }
          return reject(new Error(JSON.stringify(body)));
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  getRemoteProxy() {
    // var arr = [];
    // var p1 = this.kuaiProxyPromise();
    // var p2 = this.zhimaProxyPromise();
    // arr.push(p1);
    // arr.push(p2);
    // return Promise.all(arr);
    return this.kuaiProxyPromise();
  }
}
module.exports = MyProxySupplier;
