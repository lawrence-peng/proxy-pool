import ProxyInfo from './ProxyInfo';
import { HttpStatusCode } from './HttpStatusCode';

export default interface IHttpProxyPool {
  getProxy(): Promise<ProxyInfo>;
  returnProxy(proxy: ProxyInfo, statusCode: HttpStatusCode): void;
}
