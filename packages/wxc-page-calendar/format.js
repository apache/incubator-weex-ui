/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/07/29.
 */

// 国际节日
export const GLOBAL_HOLIDAY = {
  '01-01': '元旦',
  '02-14': '情人',
  '05-01': '劳动',
  '06-01': '儿童',
  '10-01': '国庆',
  '12-25': '圣诞'
};

// 传统节日
const TRADITIONAL_HOLIDAY = {
  '除夕': ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
  '春节': ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
  '元宵': ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
  '清明': ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
  '端午': ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
  '中秋': ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
  '重阳': ['2015-10-21', '2016-10-09', '2017-10-28', '2018-10-17', '2019-10-07', '2020-10-25']
};

// 放假日
const REST_DAYS = ['2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];

// 工作日
const WORK_DAYS = ['2017-09-30'];

export function _getTraditionalHoliday () {
  const HOLIDAY_TEMP = {};

  const keys = Object.keys(TRADITIONAL_HOLIDAY);
  keys.forEach((k) => {
    const arr = TRADITIONAL_HOLIDAY[k];
    arr.forEach((i) => {
      HOLIDAY_TEMP[i] = k;
    })
  });
  return HOLIDAY_TEMP;
}

export function _isDate (obj) {
  const type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
  return type === '[object date]';
}

/**
 * 检测Hash
 *
 * @method _checkHash
 * @private
 */
export function _checkHash (url, hash) {
  return url && url.match(/#/) && url.replace(/^.*#/, '') === hash;
}

/**
 * 获取当前日期的毫秒数
 * @method getTime
 * @param {String} date
 * @return {Number}
 */
export function getTime (date) {
  if (_isDate(date)) {
    return new Date(date).getTime();
  } else {
    try {
      return new Date(date.replace(/-/g, '/')).getTime();
    } catch (e) {
      return 0;
    }
  }
}

export function _isInRange (range, date) {
  const start = getTime(range[0]);
  const end = getTime(range[1]);
  const d = getTime(date);
  return (start <= d && end >= d);
}

export function _isInSelectRange (range, date) {
  const start = getTime(range[0]);
  const end = getTime(range[1]);
  const d = getTime(date);
  return (start < d && end > d);
}

export function _fixNum (num) {
  return (num < 10 ? '0' : '') + num;
}

/**
 * 是否是周末
 * @method isWeekend
 * @param {String} date
 * @return {Boolean}
 */
export function _isWeekend (date) {
  const day = new Date(date.replace(/-/g, '/')).getDay();
  return day === 0 || day === 6;
}

/**
 * 是否是今天
 * @method isToday
 * @param {String} date
 * @return {Boolean}
 */
export function _isToday (today, date) {
  return getTime(today) === getTime(date);
}

/**
 * 检查是否是闰年
 * @method _checkLeapYear
 * @param {Number} y 年份
 * @param {Date} t today
 * @protected
 */
export function _getMonthDays (y, t) {
  const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const year = y || t.getFullYear();
  let isLeapYear = false;

  if (year % 100) {
    isLeapYear = !(year % 4);
  } else {
    isLeapYear = !(year % 400);
  }

  if (isLeapYear) {
    MONTH_DAYS[1] = 29;
  } else {
    MONTH_DAYS[1] = 28;
  }
  return MONTH_DAYS;
}

/**
 * 当月1号前面有多少空格
 * @method _getPadding
 * @protected
 */
export function _getPadding (year, month) {
  const date = new Date(year + '/' + month + '/1');
  return date.getDay();
}

export function _unique (array) {
  return Array.prototype.filter.call(array, function (item, index) {
    return array.indexOf(item) === index;
  });
}

export function getToDay () {
  return new Date().getFullYear() + '-' + _fixNum(new Date().getMonth() + 1) + '-' + _fixNum(new Date().getDate());
}

export function getWeekRows (y, m, today, dateRange, departDate, arriveDate, selectedNote, descList) {
  const monthDays = _getMonthDays(y, today);
  const padding = _getPadding(y, m, 7);
  const num = monthDays[m - 1] + padding;
  const rows = Math.ceil(num / 7);
  const remain = num % 7;
  const rowsData = [];

  for (let i = 1; i <= rows; i++) {
    const cells = [];

    for (let j = 1; j <= 7; j++) {
      let cell = {};
      // 前后空格
      if (i === 1 && j <= padding || remain && i === rows && j > remain) {
        cell.isEmpty = true;
      } else {
        const d = (i - 1) * 7 + j - padding;
        const date = y + '-' + _fixNum(m) + '-' + _fixNum(d);
        let cls = [];
        let ref = '';
        const cellClass = [];
        const isInRange = _isInRange(dateRange, date);
        let disabled = false;
        const global = _fixNum(m) + '-' + _fixNum(d);
        let note = '';
        let ext = '';

        if (descList && descList.length > 0) {
          const nowDesc = descList.filter(item => item.date == date);
          if (nowDesc && nowDesc.length > 0) {
            ext = nowDesc[0].value;
            if (nowDesc[0].emphasize) {
              cls.push('calendar-holiday');
            }
          }
        }

        // 国际节日
        if (GLOBAL_HOLIDAY[global]) {
          note = GLOBAL_HOLIDAY[global];
          cls.push('calendar-holiday');
        }

        const tHoliday = _getTraditionalHoliday()[date];

        // 传统节日
        if (tHoliday) {
          note = tHoliday;
          cls.push('calendar-holiday');
        }
        // 放假日
        if (REST_DAYS.indexOf(date) > -1) {
          cls.push('calendar-holiday');
        }

        // 工作日
        if (WORK_DAYS.indexOf(date) > -1) {
          cls.push('calendar-work');
        }

        // 周末
        if (_isWeekend(date)) {
          cls.push('calendar-holiday');
        }

        // 今天
        if (_isToday(today, date)) {
          cls.push('calendar-today');
          note = '今天';
        }

        // 不在日期范围内
        if (!isInRange) {
          disabled = true;
        }

        if (disabled) {
          cls = [];
          cls.push('calendar-disabled');
          cellClass.push('cell-disabled');
        }

        if (!ext && disabled && isInRange) {
          ext = '不可选';
        }

        if (departDate === date || arriveDate === date) {
          note = departDate === date ? selectedNote[0] : selectedNote[1];
          ref = departDate === date ? 'departDate' : 'arriveDate';
          if (departDate === arriveDate && selectedNote.length >= 3) {
            note = selectedNote[2];
          }
          cls.push('item-text-selected');
          cellClass.push('item-row-selected');
        }

        if (departDate && arriveDate && _isInSelectRange([departDate, arriveDate], date)) {
          cellClass.push('calendar-day-include');
        }

        cell = {
          isEmpty: false,
          ref,
          cls: _unique(cls).join(' '),
          cellClass: _unique(cellClass).join(' '),
          note: note,
          date: date,
          ext: ext,
          disabled: disabled,
          text: d
        };
      }
      cells.push(cell);
    }

    rowsData.push(cells);
  }

  return rowsData;
}

export function generateDateCell ({ range, today, departDate, arriveDate, selectedNote, descList }) {
  const start = new Date(range[0].replace(/-/g, '/'));
  const end = new Date(range[1].replace(/-/g, '/'));
  const startYear = start.getFullYear();
  const startMonth = start.getMonth() + 1;
  const endYear = end.getFullYear();
  const endMonth = end.getMonth() + 1;

  const l = (endYear - startYear) * 12 + endMonth - startMonth + 1;
  let y = startYear;
  let n = startMonth;
  const months = [];

  for (let i = 0; i < l; i++) {
    if (n > 12) {
      n = 1;
      y++;
    }
    months.push(
      { title: `${y}-${_fixNum(n)}` },
      ...getWeekRows(y, n, today, range, departDate, arriveDate, selectedNote, descList)
    );
    n++;
  }
  return months
}
