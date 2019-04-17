
export default class CommonUtil {

  public static sleep(ms: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

}
