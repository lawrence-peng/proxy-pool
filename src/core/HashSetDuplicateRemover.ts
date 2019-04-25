import IDuplicateRemover from './IDuplicateRemover';

export default class HashSetDuplicateRemover implements IDuplicateRemover {
  proxySet: Set<string> = new Set<string>();
  constructor() {
    setInterval(() => {
        console.log('HashSetDuplicateRemover Count', this.proxySet.size);
    }, 1000 * 60 * 15);
  }
  get totalProxyCount() {
    return this.proxySet.size;
  }
  isDuplicate(key: string): boolean {
    const isDuplicate = this.proxySet.has(key);
    if (!isDuplicate) {
      this.proxySet.add(key);
    }
    return isDuplicate;
  }
  resetDuplicateCheck(): void {
    this.proxySet.clear();
  }
}
