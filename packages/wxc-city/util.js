import Utils from '../utils';

export function getCities (list, showDesc = false) {
  if (list && list.length > 0) {
    const result = list.map((v) => {
      const o = Object.assign({}, v);

      if (o.suggestName) {
        o.name = o.suggestName;
      }

      if (o.stationName && !o.name) {
        o.name = o.stationName;
      }

      if (o.cityName && !o.name) {
        o.name = o.cityName;
      }

      if (o.code && showDesc) {
        o.desc = o.code;
      }
      return o;
    });
    return result;
  } else {
    return [];
  }
}

export function query (source, text) {
  let res = [];
  res = source.filter(item => {
    const arr = [];
    let isHave = false;
    Object.keys(item).forEach(prop => {
      const itemStr = item[prop];
      Utils.isString(itemStr) && itemStr.split(',').forEach(val => {
        arr.push(val);
      });
    });
    arr.some(val => {
      isHave = new RegExp('^' + text).test(val);
      return isHave;
    });
    return isHave;
  });
  return res;
}
