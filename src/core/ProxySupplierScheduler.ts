import CommonUtil from '../util/CommonUtil';
import IProxyValidator from './IProxyValidator';
import IProxySupplier from './IProxySupplier';
import IDuplicateRemover from './IDuplicateRemover';
import IPoolStoreData from './IPoolStoreData';
import ProxyError from './ProxyError';
import Base from './Base';

export default class ProxySupplierScheduler extends Base {
  private _poolThreshold: number = 10;
  private _fetchInterval = 10000;

  /**
   *
   * @param proxySupplier  代理IP提供者
   * @param poolStoreData 代理池数据存储
   * @param duplicateRemover proxy 去重器
   */
  constructor(
    readonly proxySupplier: IProxySupplier,
    readonly poolStoreData: IPoolStoreData,
    readonly duplicateRemover: IDuplicateRemover,
    readonly proxyValidator: IProxyValidator,
  ) {
    super();
    if (proxySupplier == null) {
      throw new ProxyError('proxySupplier is null');
    }
    if (poolStoreData == null) {
      throw new ProxyError('poolStoreData is null');
    }
    if (duplicateRemover == null) {
      throw new ProxyError('duplicateRemover is null');
    }
    if (proxyValidator == null) {
      throw new ProxyError('proxyValidator is null');
    }
  }

  public get poolThreshold(): number {
    return this._poolThreshold;
  }
  public set poolThreshold(num: number) {
    this._poolThreshold = num;
  }
  public get fetchInterval(): number {
    return this._fetchInterval;
  }
  public set fetchInterval(num: number) {
    this._fetchInterval = num;
  }

  /**
   * start
   */
  public async start(): Promise<void> {
    // tslint:disable-next-line:no-constant-condition
    while (true) {
      if (this.poolStoreData.poolSize < this.poolThreshold) {
        const proxies = await this.proxySupplier.getProxies();
        let validNum = 0;
        for (const [ key, proxy ] of proxies) {
          if (this.duplicateRemover.isDuplicate(key)) continue;
          const valid = await this.proxyValidator.isAvailable(proxy);
          if (valid) {
            validNum += 1;
            proxy.failedNum = 0;
            this.poolStoreData.enqueue(proxy);
            this.emit('pool_enqueue', proxy);
          }
        }
        // this.debug('remote proxy:%s,valid proxy:%s', proxies.size, validNum);
      }
      // this.debug('poolSize', this.poolStoreData.poolSize);
      await CommonUtil.sleep(this.fetchInterval);
    }
  }
}
