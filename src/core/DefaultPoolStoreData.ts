import IPoolStoreData from './IPoolStoreData';
import ProxyInfo from './ProxyInfo';

export default class DefaultPoolStoreData implements IPoolStoreData {
  private queueProxy: ProxyInfo[] = [];
  dequeue(): ProxyInfo | undefined {
    return this.queueProxy.pop();
  }
  enqueue(proxy: ProxyInfo) {
    this.queueProxy.unshift(proxy);
  }
  get poolSize(): number {
    return this.queueProxy.length;
  }
}
