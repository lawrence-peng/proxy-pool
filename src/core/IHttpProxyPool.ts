import ProxyInfo from './ProxyInfo';
import { HttpStatusCode } from './HttpStatusCode';
import IPoolStoreData from './IPoolStoreData';

export default interface IHttpProxyPool {
  getPoolStoreData(): IPoolStoreData;
  getProxy(): Promise<ProxyInfo>;
  returnProxy(proxy: ProxyInfo, statusCode: HttpStatusCode): void;
  dispose(): void;
}
