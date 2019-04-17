import ProxyInfo from './ProxyInfo';

export default interface IProxySupplier {
  getProxies(): Promise<Map<string, ProxyInfo>>;
}
