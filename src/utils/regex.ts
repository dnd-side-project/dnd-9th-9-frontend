/** input에 대해 YYYY-MM-DD HH:MM:SS 포맷인지 체크하는 함수  */
const checkValidDateTimeFormat = (input: string): boolean => {
  const dateTimeFormatRegExp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return dateTimeFormatRegExp.test(input);
};

export {checkValidDateTimeFormat};
