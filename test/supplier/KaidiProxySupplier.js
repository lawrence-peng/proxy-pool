const ProxySupplier = require("../../dist/core/ProxySupplier").default;
const ProxyInfo = require("../../dist/core/ProxyInfo").default;
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
class KaidiProxySupplier extends ProxySupplier {
  getRemoteProxy() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const proxyList = [];
        for (let i = 0; i < 10; i += 1) {
          const host = `${randomNum(10, 60)}.${randomNum(10, 100)}.${randomNum(
            10,
            120
          )}.${randomNum(10, 200)}`;
          const port = randomNum(1000, 9999);
          proxyList.push(
            new ProxyInfo(host, port, "http", "username", "password")
          );
        }
        resolve(proxyList);
      }, 500);
    });
  }
}
module.exports = KaidiProxySupplier;
