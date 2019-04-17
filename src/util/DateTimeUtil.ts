import * as moment from 'moment';

export default class DateTimeUtil {

  /**
   *  static format
   */
  public static format(dt: Date, formatStr= 'YYYY-MM-DD HH:mm:ss') {
    return moment(dt).format(formatStr);
  }

  /**
   *  getUtc
   */
  public static getUtc(date: Date): number {
    return moment(date).unix() * 1000;
  }

  /**
   *
   */
  public static getCurrentUtc(): number {
    return this.getUtc(new Date());
  }
}
