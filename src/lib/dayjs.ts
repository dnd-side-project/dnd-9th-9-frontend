import _dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/ko';

_dayjs.extend(isoWeek);
_dayjs.locale('ko');

export {_dayjs as dayjs};
