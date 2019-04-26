const ProxySupplier = require("../../dist/core/ProxySupplier").default;
const ProxyInfo = require("../../dist/core/ProxyInfo").default;
const axios = require("axios");
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
class MeProxySupplier extends ProxySupplier {
  kuaiProxyPromise(num = 15) {
    const url = `http://www.xxxx.com`;
    return new Promise(function(resolve, reject) {
      axios
        .get(url)
        .then(function(response) {
          const { status, statusText, data: result } = response;
          if (status != 200) reject(new Error(`${status}  ${statusText}`));
          const { code, msg, data } = result;
          if (code !== 0) reject(new Error(`${code}  ${msg}`));
          const list = data.proxy_list;
          if (list && list.length > 0) {
            const proxyList = list.map(item => {
              return new ProxyInfo(
                item.split(":")[0],
                item.split(":")[1],
                "http",
                "username",
                "name"
              );
            });
            return resolve(proxyList);
          }
          return reject(new Error(`There is no available proxy.`));
        })
        .catch(function(err) {
          reject(err);
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
    return this.kuaiProxyPromise(50);
  }
}
module.exports = MeProxySupplier;
