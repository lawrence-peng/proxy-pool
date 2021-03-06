import IProxyValidator from './IProxyValidator';
import IPoolStoreData from './IPoolStoreData';
import IDuplicateRemover from './IDuplicateRemover';

export default class HttpProxyPoolOption {
  constructor(
    readonly poolThreshold: number,
    readonly fetchInterval: number,
    readonly proxyValidatorTimeout: number,
    readonly proxyValidatorTargetUrls: any[],
    readonly poolStoreData: IPoolStoreData,
    readonly duplicateRemover: IDuplicateRemover,
    readonly proxyValidator: IProxyValidator) {

  }
}
