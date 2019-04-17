import { URL } from 'url';
import DateTimeUtil from '../util/DateTimeUtil';

export default class ProxyInfo {
  failedNum: number;
  uri: URL;
  address: string;
  createTime: number;
  constructor(
        readonly host: string,
        readonly port: number,
        readonly protocol: string = 'http',
        readonly username: string = '',
        readonly password: string = '',
        readonly expireTime: number | null,
    ) {
    this.uri = new URL(`${protocol.toLowerCase()}://${host}:${port}`);
    this.address = `${host}:${port}`;
    this.createTime = DateTimeUtil.getCurrentUtc();
  }

  public fail(): void {
    this.failedNum = this.failedNum + 1;
  }
}
