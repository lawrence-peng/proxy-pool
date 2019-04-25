import IHttpProxyPool from './IHttpProxyPool';
import { HttpStatusCode } from './HttpStatusCode';
import DateTimeUtil from '../util/DateTimeUtil';
import ProxyInfo from './ProxyInfo';
import IProxyValidator from './IProxyValidator';
import DefaultProxyValidator from './DefaultProxyValidator';
import Base from './Base';
import ProxySupplierScheduler from './ProxySupplierScheduler';

import IProxySupplier from './IProxySupplier';
import ProxyError from './ProxyError';
import HttpProxyPoolOption from './HttpProxyPoolOption';
import DefaultPoolStoreData from './DefaultPoolStoreData';
import HashSetDuplicateRemover from './HashSetDuplicateRemover';
import IPoolStoreData from './IPoolStoreData';
import IDuplicateRemover from './IDuplicateRemover';

export default class HttpProxyPool extends Base implements IHttpProxyPool {
  private readonly proxySupplierScheduler: ProxySupplierScheduler;
  private readonly proxyValidator: IProxyValidator = new DefaultProxyValidator();
  private readonly poolStoreData: IPoolStoreData = new DefaultPoolStoreData();
  private readonly duplicateRemover: IDuplicateRemover = new HashSetDuplicateRemover();
  constructor(
    readonly proxySupplier: IProxySupplier,
    readonly opts: HttpProxyPoolOption | undefined | null,
  ) {
    super();
    if (opts && opts.poolStoreData != null) {
      this.poolStoreData = opts.poolStoreData;
    }
    if (opts && opts.duplicateRemover != null) {
      this.duplicateRemover = opts.duplicateRemover;
    }
    if (opts && opts.proxyValidator != null) {
      this.proxyValidator = opts.proxyValidator;
    }

    this.proxySupplierScheduler = new ProxySupplierScheduler(
      proxySupplier,
      this.poolStoreData,
      this.duplicateRemover,
      this.proxyValidator,
    );

    if (opts && opts.poolThreshold != null) {
      this.proxySupplierScheduler.poolThreshold = opts.poolThreshold;
    }
    if (opts && opts.fetchInterval != null) {
      this.proxySupplierScheduler.fetchInterval = opts.fetchInterval;
    }

    this.proxySupplierScheduler.start();
  }

  getPoolStoreData(): IPoolStoreData {
    return this.poolStoreData;
  }

  async getProxy(): Promise<ProxyInfo> {
    for (let i = 0; i < 3600; i += 1) {
      const proxy = this.getFirstAvaliableProxy();
      if (proxy != null) {
        return proxy;
      }
      await this.sleep(1000);
    }

    throw new ProxyError('There is no available proxy.');
  }
  private getFirstAvaliableProxy(): ProxyInfo | null | undefined {
    const currentUnixTimeNumber = DateTimeUtil.getCurrentUtc();
    let proxy = this.poolStoreData.dequeue();
    while (proxy) {
      if (proxy.expireTime && proxy.expireTime - currentUnixTimeNumber < 0) {
        proxy = this.poolStoreData.dequeue();
      } else if (currentUnixTimeNumber - proxy.createTime >= 1000 * 180) {
        // 抛弃超过三分钟的代理IP
        proxy = this.poolStoreData.dequeue();
      } else {
        break;
      }
    }
    this.debug('current pool size', this.poolStoreData.poolSize);
    return proxy;
  }

  returnProxy(proxy: ProxyInfo, statusCode: HttpStatusCode): void {
    if (proxy == null) return;
    switch (statusCode) {
      case HttpStatusCode.OK:
        proxy.failedNum = 0;
        break;
      default:
        proxy.fail();
        break;
    }
    if (proxy.failedNum > 3) {
      return;
    }
    if (!this.proxyValidator.isAvailable(proxy)) {
      return;
    }
    this.poolStoreData.enqueue(proxy);
  }

  dispose() {
    if (this.proxySupplierScheduler) {
      this.proxySupplierScheduler.dispose();
    }
  }
}
