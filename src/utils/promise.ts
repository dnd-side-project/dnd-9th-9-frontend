/** ms 초의 delay를 주는 함수 */
export const sleep = async (ms: number): Promise<void> => {
  await new Promise<void>(resolve => setTimeout(resolve, ms));
};
