import ProxyInfo from './ProxyInfo';

export default interface IPoolStoreData {
  dequeue(): ProxyInfo | undefined;
  enqueue(proxy: ProxyInfo);
  poolSize: number;
}
