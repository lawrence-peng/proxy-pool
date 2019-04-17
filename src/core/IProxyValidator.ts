import ProxyInfo from './ProxyInfo';

export default interface IProxyValidator {
  isAvailable(proxy: ProxyInfo): Promise<boolean>;
}
