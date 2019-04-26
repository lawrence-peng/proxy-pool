import ProxyInfo from './ProxyInfo';

export default interface IProxyValidator {
  verifyTimeout: number;
  targetUrls: any[];
  isAvailable(proxy: ProxyInfo): Promise<boolean>;
}
