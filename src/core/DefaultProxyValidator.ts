import axios from 'axios';
import HttpsProxyAgent = require('https-proxy-agent');
import IProxyValidator from './IProxyValidator';
import ProxyInfo from './ProxyInfo';
import Base from './Base';

export default class DefaultProxyValidator extends Base
  implements IProxyValidator {

  verifyTimeout: number = 5000; // 5 second
  targetUrls: any[] = [ 'https://ssl.captcha.qq.com/TCaptcha.js' ];

  constructor() {
    super();
  }
  async isAvailable(proxy: ProxyInfo): Promise<boolean> {
    let agent = null;
    if (proxy.username && proxy.password) {
      agent = new HttpsProxyAgent(
        `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`,
      );
    } else {
      agent = new HttpsProxyAgent(`http://${proxy.host}:${proxy.port}`);
    }
    let ret;
    try {
      for (const targetUrl of this.targetUrls) {
        const options = {
          url: targetUrl,
          timeout: this.verifyTimeout, // 3 second
          httpsAgent: agent,
        };
        ret = await this.testProxyPromise(options);
        if (!ret) break;
      }
    } catch (err) {
      console.error('testProxy', err.message);
      ret = false;
    }
    return ret;
  }

  private testProxyPromise(options): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios(options)
        .then(resp => {
          this.debug('testProxyPromise:%s %s', resp.status, resp.statusText);
          resolve(resp.status === 200);
        })
        .catch(error => reject(error));
    });
  }
}
