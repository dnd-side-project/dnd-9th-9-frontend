/** ms 초의 delay를 주는 함수 */
export const sleep = (ms: number): any =>
  new Promise(resolve => setTimeout(resolve, ms));
