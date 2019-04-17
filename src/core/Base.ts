import * as Debug from 'debug';
import { EventEmitter } from 'events';
const debug = Debug('proxy-pool');

export default abstract class Base extends EventEmitter {
  public sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * name
   */
  get debug() {
    return debug;
  }
}
