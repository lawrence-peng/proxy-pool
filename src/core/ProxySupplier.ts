import IProxySupplier from './IProxySupplier';
import ProxyInfo from './ProxyInfo';
import Base from './Base';

export default abstract class ProxySupplier extends Base implements IProxySupplier {

  async getProxies(): Promise<Map<string, ProxyInfo>> {
    let result: ProxyInfo[] = [];
    let retry = 0;
    try {
      result = await this.getRemoteProxy();
    } catch (e) {
      if (e.message === '111' && retry < 5) {
        this.debug('retry %s time for request remote proxy', retry);
        this.sleep(1500);
        result = await this.getRemoteProxy();
        retry += 1;
      } else {
        throw e;
      }
    }
    const map = new Map<string, ProxyInfo>();
    result = [].concat.apply([], result as any); // result maybe is two-dimensional array
    for (const proxy of result) {
      if (!proxy)continue;
      // const { ip, port, username, password, expire_time } = item;
      // const proxy = new ProxyInfo(3000, ip, port, DateTimeUtil.getUtc(expire_time),
      // 'http', username!, password!);
      map.set(proxy.address, proxy);
    }
    return map;
  }

  protected abstract getRemoteProxy(): Promise<ProxyInfo[]> ;
}
