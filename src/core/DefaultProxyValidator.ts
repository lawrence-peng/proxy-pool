import IProxyValidator from './IProxyValidator';
import proxyVerifier = require('proxy-verifier');
import ProxyInfo from './ProxyInfo';
import Base from './Base';

export default class DefaultProxyValidator extends Base
  implements IProxyValidator {
  private readonly targetUrl: string;
  constructor(targetUrl: string = 'https://www.taobao.com') {
    super();
    this.targetUrl = targetUrl;
  }

  // private buildAuthHeader(user: string, pass: string): string {
  //   return `Basic ${new Buffer(`${user}:${pass}`).toString('base64')}`;
  // }

  async isAvailable(proxy: ProxyInfo): Promise<boolean> {
    const testProxy = {
      ipAddress: proxy.host,
      port: proxy.port,
      protocols: [ 'http' ],
    };
    const options = {
      testUrl: this.targetUrl,
      requestOptions: {
        strictSSL: false,
        proxyOptions: {
          rejectUnauthorized: false,
        },
        timeout: 100,
        auth: {},
      },
    };

    if (proxy.username && proxy.password) {
      options.requestOptions.auth = { user: proxy.username, pass: proxy.password };
    }
    this.debug('testProtocol testProxy', testProxy);
    this.debug('testProtocol requestOptions', options);
    try {
      return await this.testProtocolPromise(testProxy, options);
    } catch (err) {
      console.error('testProtocol', err);
      return false;
    }
  }

  private testProtocolPromise(proxy, options): Promise<boolean> {
    return new Promise((resolve, reject) => {
      proxyVerifier.testProtocol(proxy, options, (error, result) => {
        this.debug('testProtocol:', result);
        if (error) return reject(error);
        resolve(result.ok);
      });
    });
  }
}
