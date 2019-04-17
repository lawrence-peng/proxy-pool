/**
 * 通过哈希去重
 */
export default interface IDuplicateRemover {

  /**
   * 判断 proxy 是否重复
   * @param key
   */
  isDuplicate(key: string): boolean;

  /**
   * 重置去重器
   */
  resetDuplicateCheck(): void;

  /**
   * proxy 总数
   */
  totalProxyCount: number;
}
